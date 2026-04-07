import { url as baseUrl } from '$lib/config';

/** Pages included in the site navigation */
const PAGES = ['about', 'music', 'exhibitions', 'writing'];

export const prerender = true;

export async function GET() {
	// Load all posts eagerly at build time
	const postFiles = import.meta.glob('$lib/posts/*.md', { eager: true });

	const postEntries: { loc: string; lastmod?: string }[] = [];

	for (const path in postFiles) {
		const file = postFiles[path] as { metadata?: { category?: string; date?: string } };
		if (!file?.metadata?.category) continue;

		const slug = path.split('/').at(-1)?.replace('.md', '');
		if (!slug) continue;

		postEntries.push({
			loc: `${baseUrl}/${file.metadata.category}/${slug}`,
			lastmod: file.metadata.date ? new Date(file.metadata.date).toISOString().split('T')[0] : undefined
		});
	}

	// Sort posts by date descending
	postEntries.sort((a, b) => (b.lastmod ?? '').localeCompare(a.lastmod ?? ''));

	const today = new Date().toISOString().split('T')[0];

	const urls = [
		// Homepage — highest priority
		`<url><loc>${baseUrl}/</loc><lastmod>${today}</lastmod><priority>1.0</priority></url>`,
		// Category pages
		...PAGES.map(
			(p) => `<url><loc>${baseUrl}/${p}</loc><lastmod>${today}</lastmod><priority>0.8</priority></url>`
		),
		// Individual posts
		...postEntries.map(
			(e) =>
				`<url><loc>${e.loc}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ''}<priority>0.6</priority></url>`
		)
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  ${u}`).join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
}
