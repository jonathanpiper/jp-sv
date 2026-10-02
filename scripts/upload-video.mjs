#!/usr/bin/env node
// Uploads a performance video to Bunny Stream for a post, and points the post at it.
//
// The Bunny title ("{artist} - {title}", or "{artist}, {date}" when untitled) and description
// meta tag come from the post's frontmatter, the same way migrate-streamable.mjs names videos.
// After uploading, the post's frontmatter gets `source: bunny` and `embed_code: <guid>` (replacing
// any existing source/embed_code, or added if the post had none). It then runs
// sync-bunny-thumbs.mjs, which waits for Bunny to finish encoding and downloads the poster. With
// --no-wait (passed on to sync-bunny) it skips the wait; run `pnpm sync-bunny` once encoding is
// done.
//
// Usage:
//   node scripts/upload-video.mjs <post-slug> <video-file>
//   node scripts/upload-video.mjs 2026-03-28-1515 ~/Movies/1515.mov --dry-run
//   node scripts/upload-video.mjs 2026-03-28-1515 ~/Movies/1515.mov --no-wait
//
// Bunny credentials come from .env.local - see scripts/lib/bunny.mjs.

import { createReadStream } from 'node:fs';
import { readFile, stat, writeFile } from 'node:fs/promises';
import { PassThrough } from 'node:stream';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { apiKey, bunny, findVideoByTitle, libraryId, setDescription } from './lib/bunny.mjs';
import {
	bunnyDescriptionFor,
	bunnyTitleFor,
	parseFrontmatter,
	pointEmbedAt,
	postsDir
} from './lib/posts.mjs';

const [slug, videoFile] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const dryRun = process.argv.includes('--dry-run');
const noWait = process.argv.includes('--no-wait');

if (!slug || !videoFile) {
	console.error(
		'Usage: node scripts/upload-video.mjs <post-slug> <video-file> [--dry-run] [--no-wait]'
	);
	process.exit(1);
}
if (!dryRun && (!apiKey || !libraryId)) {
	console.error(
		'Requires BUNNY_API_KEY (.env.local) and bunnyLibraryId (src/lib/config.ts), or use --dry-run.'
	);
	process.exit(1);
}

const formatMB = (bytes) => (bytes / 1024 / 1024).toFixed(0);

const printProgress = (sent, total, startTime) => {
	const pct = Math.floor((sent / total) * 100);
	const barLength = 30;
	const filled = Math.round((barLength * pct) / 100);
	const bar = '#'.repeat(filled) + '-'.repeat(barLength - filled);
	const elapsedSec = (Date.now() - startTime) / 1000;
	const mbps = elapsedSec > 0 ? (sent / 1024 / 1024 / elapsedSec).toFixed(1) : '0.0';
	process.stdout.write(
		`\r   [${bar}] ${pct}% (${formatMB(sent)}/${formatMB(total)} MB, ${mbps} MB/s)   `
	);
};

async function uploadVideoFile(videoId, filePath) {
	const { size } = await stat(filePath);
	const startTime = Date.now();
	let sent = 0;

	// A PassThrough sits between the file and fetch's body, so fetch stays the stream's only
	// consumer while this watches each chunk go by to report upload progress
	const source = createReadStream(filePath);
	const progress = new PassThrough();
	source.on('data', (chunk) => {
		sent += chunk.length;
		printProgress(sent, size, startTime);
	});
	source.pipe(progress);

	const res = await fetch(`https://video.bunnycdn.com/library/${libraryId}/videos/${videoId}`, {
		method: 'PUT',
		headers: {
			AccessKey: apiKey,
			'Content-Type': 'application/octet-stream',
			'Content-Length': String(size)
		},
		body: progress,
		duplex: 'half'
	});
	process.stdout.write('\n');
	if (!res.ok) {
		throw new Error(`Upload failed: ${res.status} ${await res.text()}`);
	}
}

/**
 * Sets the post's frontmatter embed to the Bunny video: rewrites existing source/embed_code
 * lines, or adds them just before the closing `---` if the post has none
 */
const pointPostAt = (content, guid) => {
	const fm = parseFrontmatter(content);
	if (fm.source || fm.embed_code) return pointEmbedAt(content, { kind: 'frontmatter' }, guid);
	const eol = content.includes('\r\n') ? '\r\n' : '\n';
	return content.replace(
		/^(---\r?\n[\s\S]*?\r?\n)(---)/,
		`$1source: bunny${eol}embed_code: ${guid}${eol}$2`
	);
};

async function main() {
	const postFile = path.join(postsDir, `${slug.replace(/\.md$/, '')}.md`);
	let content;
	try {
		content = await readFile(postFile, 'utf8');
	} catch {
		console.error(`No post at ${postFile}`);
		process.exit(1);
	}
	try {
		await stat(videoFile);
	} catch {
		console.error(`Could not read ${videoFile}`);
		process.exit(1);
	}

	const fm = parseFrontmatter(content);
	if (!fm.artist || !fm.date) {
		console.error(
			`${path.basename(postFile)} needs \`artist\` and \`date\` frontmatter to name the video.`
		);
		process.exit(1);
	}
	const title = bunnyTitleFor(fm);
	const description = bunnyDescriptionFor(fm);
	console.log(`${path.basename(videoFile)} → ${path.basename(postFile)}`);
	console.log(`   title: ${title}`);
	console.log(`   description: ${description}`);
	if (fm.source && fm.source !== 'bunny') {
		console.log(`   replaces: ${fm.source} ${fm.embed_code}`);
	}

	if (apiKey && libraryId) {
		const existing = await findVideoByTitle(title);
		if (existing) {
			console.log(
				`   already on Bunny (guid ${existing.guid}) - not uploading a duplicate. Delete it on Bunny first to re-upload.`
			);
			process.exit(1);
		}
	}
	if (dryRun) return;

	console.log('   creating video on Bunny...');
	const created = await bunny('POST', `/library/${libraryId}/videos`, { title });
	console.log(`   created guid ${created.guid}, uploading:`);
	await uploadVideoFile(created.guid, videoFile);
	await setDescription(created.guid, description);

	await writeFile(postFile, pointPostAt(await readFile(postFile, 'utf8'), created.guid));
	console.log(`   ${path.basename(postFile)} now embeds bunny ${created.guid}`);

	console.log('');

	// sync-bunny waits for Bunny to finish encoding, then downloads the poster. Stopping it
	// (Ctrl-C) is safe: the post already points at the video, so just run `pnpm sync-bunny` later.
	const syncScript = path.join(
		path.dirname(fileURLToPath(import.meta.url)),
		'sync-bunny-thumbs.mjs'
	);
	const sync = spawnSync(process.execPath, [syncScript, ...(noWait ? ['--no-wait'] : [])], {
		stdio: 'inherit'
	});
	process.exitCode = sync.status ?? 1;
}

main();
