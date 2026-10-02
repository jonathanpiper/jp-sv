// Shared Bunny Stream helpers for the migrate, upload, and thumbnail sync scripts.
//
// Reads BUNNY_API_KEY from .env.local automatically. It must be the video library's own API key
// (Bunny dashboard → Stream → the library → API), not the account-wide key. The library ID comes
// from bunnyLibraryId in src/lib/config.ts (shared with the site's embed URLs); set
// BUNNY_LIBRARY_ID to override it.

import { readFileSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { rootDir, siteConfig } from './site.mjs';

// Minimal .env.local loader - only sets vars not already present in the environment, so an
// explicitly-set env var still wins.
try {
	const envContent = readFileSync(path.join(rootDir, '.env.local'), 'utf8');
	for (const line of envContent.split('\n')) {
		const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
		if (match && !(match[1] in process.env)) {
			process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, '');
		}
	}
} catch {
	// no .env.local - fine, rely on whatever's already in the environment
}

export const apiKey = process.env.BUNNY_API_KEY;
export const libraryId = process.env.BUNNY_LIBRARY_ID || siteConfig.bunnyLibraryId;

/** Bunny's video status code for "finished encoding, playable, thumbnail available" */
export const STATUS_FINISHED = 4;

/** Exits with a helpful message if no API key is available */
export const requireApiKey = (hint = '') => {
	if (!apiKey) {
		console.error(`Requires BUNNY_API_KEY - add it to .env.local${hint}.`);
		process.exit(1);
	}
};

/** Calls the Bunny Stream API and returns the parsed JSON response, throwing on any error */
export async function bunny(method, urlPath, body) {
	const res = await fetch(`https://video.bunnycdn.com${urlPath}`, {
		method,
		headers: {
			AccessKey: apiKey,
			...(body ? { 'Content-Type': 'application/json' } : {})
		},
		body: body ? JSON.stringify(body) : undefined
	});
	if (!res.ok) {
		throw new Error(`${method} ${urlPath} failed: ${res.status} ${await res.text()}`);
	}
	return res.json();
}

/** Returns every video in the library, following pagination */
export async function listVideos() {
	const videos = [];
	for (let page = 1; ; page++) {
		const result = await bunny('GET', `/library/${libraryId}/videos?page=${page}&itemsPerPage=100`);
		videos.push(...result.items);
		if (videos.length >= result.totalItems || result.items.length === 0) return videos;
	}
}

/** Returns a video's `description` meta tag (set by the upload script), or '' if none */
export const descriptionOf = (video) =>
	video.metaTags?.find((t) => t.property === 'description')?.value ?? '';

/**
 * Downloads a video's thumbnail to `dest`, so the site can self-host it. Bunny's CDN pull zone
 * only serves thumbnails to requests carrying its own player's Referer (no referer → 403), so
 * this sends that header. If Bunny ever tightens the check, the fallback is downloading the file
 * via the Storage API with the storage zone's key, which bypasses the CDN entirely.
 */
export async function downloadThumbnail(guid, dest) {
	const meta = await bunny('GET', `/library/${libraryId}/videos/${guid}`);
	const res = await fetch(meta.thumbnailUrl, {
		headers: { Referer: 'https://player.mediadelivery.net/' }
	});
	if (!res.ok)
		throw new Error(`thumbnail download failed (${res.status}) for ${meta.thumbnailUrl}`);
	const bytes = Buffer.from(await res.arrayBuffer());
	await writeFile(dest, bytes);
	return bytes.length;
}

/**
 * Asks Bunny to pull a video from a public URL (e.g. a Streamable MP4) into the library, so the
 * file never has to pass through this machine. Returns the new video's guid; Bunny downloads and
 * encodes it in the background.
 */
export async function fetchFromUrl(url, title) {
	const result = await bunny('POST', `/library/${libraryId}/videos/fetch`, { url, title });
	if (!result.id)
		throw new Error(`fetch of ${url} returned no video id: ${JSON.stringify(result)}`);
	return result.id;
}

/** Sets a video's `description` meta tag */
export const setDescription = (guid, description) =>
	bunny('POST', `/library/${libraryId}/videos/${guid}`, {
		metaTags: [{ property: 'description', value: description }]
	});

/**
 * Returns the video with exactly this title, or null. Bunny's `search` param is a substring
 * match, so each result's title is checked for an exact match before treating it as a duplicate.
 */
export async function findVideoByTitle(title) {
	const result = await bunny(
		'GET',
		`/library/${libraryId}/videos?search=${encodeURIComponent(title)}&itemsPerPage=100`
	);
	return result.items?.find((v) => v.title === title) ?? null;
}
