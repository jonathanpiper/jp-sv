#!/usr/bin/env node
// Downloads a poster thumbnail for every Bunny and YouTube video on the site to
// src/lib/assets/images/video-thumbs/<embed code>.jpg, so the video embeds can show a self-hosted,
// enhanced:img poster and load nothing from Bunny or YouTube until the visitor presses play.
//
// Bunny only has a thumbnail once it has finished encoding a video; those still processing are
// reported, so re-run later. Existing thumbnails are left alone (delete one to re-download it),
// and thumbnails no post uses any more are removed. Safe to re-run any time.
//
// Usage:
//   node scripts/sync-bunny-thumbs.mjs             # download missing thumbnails
//   node scripts/sync-bunny-thumbs.mjs --dry-run   # report only
//
// Bunny credentials come from .env.local - see scripts/lib/bunny.mjs.

import { existsSync } from 'node:fs';
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { STATUS_FINISHED, apiKey, bunny, downloadThumbnail, libraryId } from './lib/bunny.mjs';
import { loadEmbeds } from './lib/posts.mjs';
import { libDir } from './lib/site.mjs';

/** Where the embeds' import.meta.glob looks for posters */
const thumbsDir = path.join(libDir, 'assets/images/video-thumbs');

const dryRun = process.argv.includes('--dry-run');

/**
 * Downloads a YouTube video's largest available thumbnail. maxresdefault only exists for HD
 * uploads, so fall back to hqdefault (always present, 480x360).
 */
async function downloadYoutubeThumbnail(id, dest) {
	for (const size of ['maxresdefault', 'hqdefault']) {
		const res = await fetch(`https://i.ytimg.com/vi/${id}/${size}.jpg`);
		if (res.ok) {
			const bytes = Buffer.from(await res.arrayBuffer());
			await writeFile(dest, bytes);
			return bytes.length;
		}
	}
	throw new Error(`no thumbnail found for YouTube video ${id}`);
}

async function main() {
	const embeds = (await loadEmbeds()).filter((e) => e.source === 'bunny' || e.source === 'youtube');
	if (embeds.some((e) => e.source === 'bunny') && (!apiKey || !libraryId)) {
		console.error(
			'Bunny videos found, but BUNNY_API_KEY (.env.local) or bunnyLibraryId (src/lib/config.ts) is missing.'
		);
		process.exit(1);
	}
	if (!dryRun) await mkdir(thumbsDir, { recursive: true });

	const counts = { downloaded: 0, current: 0, pending: 0, failed: 0, removed: 0 };
	for (const { source, code, file } of embeds) {
		const dest = path.join(thumbsDir, `${code}.jpg`);
		if (existsSync(dest)) {
			counts.current++;
			continue;
		}
		try {
			if (source === 'bunny') {
				const video = await bunny('GET', `/library/${libraryId}/videos/${code}`);
				if (video.status !== STATUS_FINISHED) {
					console.log(`… ${code} (${file}): still encoding on Bunny - re-run later`);
					counts.pending++;
					continue;
				}
				if (!dryRun) await downloadThumbnail(code, dest);
			} else if (!dryRun) {
				await downloadYoutubeThumbnail(code, dest);
			}
			console.log(`✓ ${source} ${code} (${file})`);
			counts.downloaded++;
		} catch (err) {
			console.log(`✗ ${source} ${code} (${file}): ${err.message}`);
			counts.failed++;
		}
	}

	// Drop posters for videos no post embeds any more (e.g. a re-uploaded video's old guid)
	const used = new Set(embeds.map((e) => `${e.code}.jpg`));
	const existing = existsSync(thumbsDir) ? await readdir(thumbsDir) : [];
	for (const name of existing.filter((n) => n.endsWith('.jpg') && !used.has(n))) {
		console.log(`- remove unused ${name}`);
		if (!dryRun) await rm(path.join(thumbsDir, name));
		counts.removed++;
	}

	console.log(
		`\n${dryRun ? '[dry run] ' : ''}${counts.downloaded} downloaded, ${counts.current} already present, ` +
			`${counts.pending} still encoding, ${counts.failed} failed, ${counts.removed} removed.`
	);
	if (counts.failed) process.exitCode = 1;
}

main();
