// Reads embeds out of the site's posts (src/lib/posts/*.md) for the Bunny scripts.
//
// An embed is either a post's own frontmatter (`source:` + `embed_code:`, shown at the top of the
// post page and in listings) or an inline <EmbedWithCaption source="…" embed_code='…' …/> tag in
// the post body (as in the 2011 UCSD recital post).

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { libDir } from './site.mjs';

/** src/lib/posts */
export const postsDir = path.join(libDir, 'posts');

/** Strips matching surrounding quotes from a YAML/HTML attribute value, un-doubling '' escapes */
const unquote = (value = '') => {
	const v = value.trim();
	if (v.startsWith("'") && v.endsWith("'")) return v.slice(1, -1).replaceAll("''", "'");
	if (v.startsWith('"') && v.endsWith('"')) return v.slice(1, -1);
	return v;
};

/**
 * Parses the flat `key: value` lines of a post's frontmatter (nested keys are ignored). Some posts
 * have CRLF line endings, so those are normalized first.
 */
export const parseFrontmatter = (content) => {
	const block = content.replaceAll('\r\n', '\n').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
	const data = {};
	for (const line of block.split('\n')) {
		const match = line.match(/^([A-Za-z_]+):\s*(.*)$/);
		if (match) data[match[1]] = unquote(match[2]);
	}
	return data;
};

/** Reads one HTML-ish attribute (single- or double-quoted) from an inline component tag */
const attr = (tag, name) => unquote(tag.match(new RegExp(`\\b${name}=("[^"]*"|'[^']*')`))?.[1]);

/**
 * Returns every embed in every post:
 *   { file, content, kind: 'frontmatter' | 'inline', tag?, source, code, title, artist, performer,
 *     date, caption }
 * `tag` is the full inline tag text (so callers can rewrite it in place); inline embeds inherit
 * the post's date.
 */
export async function loadEmbeds() {
	const files = (await readdir(postsDir)).filter((f) => f.endsWith('.md')).sort();
	const embeds = [];
	for (const file of files) {
		const content = await readFile(path.join(postsDir, file), 'utf8');
		const fm = parseFrontmatter(content);
		if (fm.source && fm.embed_code) {
			embeds.push({
				file,
				content,
				kind: 'frontmatter',
				source: fm.source,
				code: fm.embed_code,
				title: fm.title,
				artist: fm.artist,
				performer: fm.performer,
				date: fm.date,
				caption: fm.caption
			});
		}
		for (const [tag] of content.matchAll(/<EmbedWithCaption\b[^>]*\/>/g)) {
			const source = attr(tag, 'source');
			const code = attr(tag, 'embed_code');
			if (!source || !code) continue;
			embeds.push({
				file,
				content,
				kind: 'inline',
				tag,
				source,
				code,
				title: attr(tag, 'title'),
				artist: attr(tag, 'artist'),
				performer: attr(tag, 'performer'),
				date: fm.date,
				caption: attr(tag, 'caption')
			});
		}
	}
	return embeds;
}

/**
 * Points one embed (from loadEmbeds) in a post's content at a Bunny video: `source` becomes bunny,
 * `embed_code` the guid, and an old streamable.com `link:` line is dropped. Everything else,
 * including the file's LF or CRLF line endings, is left as-is.
 */
export const pointEmbedAt = (content, embed, guid) => {
	if (embed.kind === 'inline') {
		const tag = embed.tag
			.replace(/\bsource=(["'])[^"']*\1/, 'source="bunny"')
			.replace(/\bembed_code=(["'])[^"']*\1/, `embed_code='${guid}'`);
		return content.replace(embed.tag, tag);
	}
	return content
		.replace(/^source:[^\r\n]*/m, 'source: bunny')
		.replace(/^embed_code:[^\r\n]*/m, `embed_code: ${guid}`)
		.replace(/^link:[^\r\n]*streamable\.com[^\r\n]*\r?\n/m, '');
};

/** Strips HTML/markdown link syntax from a caption, for plain-text video descriptions */
export const plainText = (text = '') =>
	text
		.replace(/<[^>]+>/g, '')
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.trim();

/**
 * The title a post's video gets on Bunny: "{artist} - {title}", or "{artist}, {date}" for
 * untitled performances. The upload and migrate scripts both use it, and look videos up by it to
 * avoid duplicates, so it must stay stable.
 */
export const bunnyTitleFor = ({ artist, title, date }) =>
	title ? `${artist} - ${title}` : `${artist}, ${date}`;

/**
 * The `description` meta tag a post's video gets on Bunny. When a `performer` is given, `artist`
 * is the composer (as in the recital post), so the credit reads "… by {composer}, performed by …".
 */
export const bunnyDescriptionFor = ({ artist, performer, title, date, caption }) => {
	let credit;
	if (performer) {
		credit = `${title ? `${title} by ${artist}` : artist}, performed ${date} by ${performer} (tuba).`;
	} else if (artist?.includes('Jonathan Piper')) {
		// Already credited as (one of) the artists
		credit = `Performed ${date} by ${artist}.`;
	} else {
		credit = `Performed ${date} by ${artist}, featuring Jonathan Piper (tuba).`;
	}
	// Fold a "Performed at <venue>." caption into the credit rather than repeating "Performed"
	const text = plainText(caption);
	const venue = text.match(/^Performed (at [^.]+)\.?$/)?.[1];
	if (venue) return credit.replace(/\.$/, ` ${venue}.`);
	return [credit, text].filter(Boolean).join(' ');
};
