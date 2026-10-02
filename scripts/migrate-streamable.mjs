#!/usr/bin/env node
// One-time migration of every Streamable video on the site to Bunny Stream.
//
// For each Streamable embed in src/lib/posts/*.md (frontmatter `source: streamable`, or an inline
// <EmbedWithCaption source="streamable" …/> tag), it:
//   1. looks up the video's MP4 URL through Streamable's public API;
//   2. has Bunny pull that file straight into the library (nothing is downloaded locally), titled
//      and described from the post - or reuses a Bunny video that already has that exact title,
//      so re-running after a partial failure never creates duplicates;
//   3. rewrites the post to `source: bunny` / the Bunny guid, dropping the old streamable.com
//      `link:` line.
// Thumbnails only exist once Bunny finishes encoding, so run `pnpm sync-bunny` afterwards (and
// again later for any videos still processing).
//
// Usage:
//   node scripts/migrate-streamable.mjs             # migrate everything
//   node scripts/migrate-streamable.mjs --dry-run   # resolve URLs and report, change nothing
//
// Bunny credentials come from .env.local - see scripts/lib/bunny.mjs.

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { apiKey, fetchFromUrl, findVideoByTitle, setDescription } from './lib/bunny.mjs';
import {
	bunnyDescriptionFor,
	bunnyTitleFor,
	loadEmbeds,
	pointEmbedAt,
	postsDir
} from './lib/posts.mjs';

const dryRun = process.argv.includes('--dry-run');

if (!dryRun && !apiKey) {
	console.error('Requires BUNNY_API_KEY - add it to .env.local, or preview with --dry-run.');
	process.exit(1);
}

/** Returns the best downloadable file URL Streamable has for a video */
async function streamableUrl(code) {
	const res = await fetch(`https://api.streamable.com/videos/${code}`);
	if (!res.ok) throw new Error(`Streamable lookup failed (${res.status})`);
	const { files } = await res.json();
	// The original upload is the best quality when Streamable exposes it; otherwise its MP4
	const url = files?.original?.url ?? files?.mp4?.url;
	if (!url) throw new Error('Streamable returned no downloadable file');
	// Streamable returns protocol-relative URLs ("//cdn-cf-east.streamable.com/…")
	return url.startsWith('//') ? `https:${url}` : url;
}

async function main() {
	const embeds = (await loadEmbeds()).filter((e) => e.source === 'streamable');
	console.log(`${embeds.length} Streamable embed(s) found\n`);

	const results = [];
	for (const [i, embed] of embeds.entries()) {
		const title = bunnyTitleFor(embed);
		const description = bunnyDescriptionFor(embed);
		console.log(`[${i + 1}/${embeds.length}] ${embed.file} (${embed.kind}) ${embed.code}`);
		console.log(`   title: ${title}`);
		console.log(`   description: ${description}`);

		try {
			const existing = apiKey ? await findVideoByTitle(title) : null;
			let guid = existing?.guid;
			if (existing) {
				console.log(`   already on Bunny (${guid}) - reusing it`);
			} else {
				const url = await streamableUrl(embed.code);
				console.log(`   source: ${url.split('?')[0]}`);
				if (!dryRun) {
					guid = await fetchFromUrl(url, title);
					await setDescription(guid, description);
					console.log(`   Bunny is fetching it as ${guid}`);
				}
			}

			if (guid && !dryRun) {
				// Re-read rather than using embed.content, since an earlier embed in the same post may
				// already have been rewritten
				const file = path.join(postsDir, embed.file);
				await writeFile(file, pointEmbedAt(await readFile(file, 'utf8'), embed, guid));
			}
			results.push({ code: embed.code, guid: guid ?? '(dry run)', file: embed.file });
		} catch (err) {
			console.log(`   ✗ ${err.message}`);
			results.push({ code: embed.code, guid: '✗ failed', file: embed.file });
		}
		console.log('');
	}

	console.log(`${dryRun ? '[dry run] ' : ''}streamable → bunny`);
	for (const r of results) console.log(`  ${r.code.padEnd(8)} → ${r.guid.padEnd(36)}  ${r.file}`);
	if (!dryRun) console.log('\nNext: pnpm sync-bunny (re-run until every thumbnail is downloaded)');
}

main();
