export const toSlug = (string: string) => string.toLowerCase().replaceAll(' ', '-');

/**
 * Formats a frontmatter date ('2026-09-23') as "23 September, 2026". A bare date parses as
 * midnight UTC, so it's read back in UTC too; local time would show the previous day anywhere
 * west of Greenwich (e.g. San Diego).
 */
export const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	const month = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
	return `${date.getUTCDate()} ${month}, ${date.getUTCFullYear()}`;
};

/*
 * Titles are italicized on the site, but text wrapped in {curly braces} stays upright, e.g.
 * `title: 'organs and machines {@ Oracle Egg}'`. Titles may also contain HTML entities (some use
 * `&#58;` so a colon doesn't trip up YAML).
 */

/** A title as HTML for {@html}: {braced} text becomes an upright span (empty YAML titles are null) */
export const titleHtml = (title?: string | null) =>
	(title ?? '').replace(/\{([^}]*)\}/g, '<span class="not-italic">$1</span>');

/** A title as plain text, for <title>, meta tags and JSON-LD: braces removed, entities decoded */
export const titleText = (title?: string | null) =>
	(title ?? '')
		.replace(/\{([^}]*)\}/g, '$1')
		.replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
		.replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
		.replaceAll('&quot;', '"')
		.replaceAll('&apos;', "'")
		.replaceAll('&lt;', '<')
		.replaceAll('&gt;', '>')
		.replaceAll('&amp;', '&');
