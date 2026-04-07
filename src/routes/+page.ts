import type { Post, Highlight } from '$lib/types';
export const prerender = true;

export async function load() {
	try {
		const home = (await import('../lib/pages/index.md')) as Post;
		const highlights: Highlight[] = await Promise.all(
			home.metadata.highlights.map(async (h) => {
				if (h.post) {
					const p = (await import(`../lib/posts/${h.post}.md`)) as Post;
					delete p.metadata.slug
					return {
						isPost: true,
						...p.metadata,
						slug: h.post
					} as Highlight;
				}
				return h;
			})
		);
		home.metadata.highlights = highlights;

		// Load header image at build time so it's available in prerendered HTML
		let header = null;
		if (home.metadata.header) {
			const mod = await import(
				`../lib/assets/images/${home.metadata.header.url.replace('.jpg', '')}.jpg?enhanced&w=864;672;504`
			);
			header = mod.default;
		}

		return {
			default: home.default,
			metadata: home.metadata,
			header
		};
	} catch (e) {
		console.log(e);
	}
}
