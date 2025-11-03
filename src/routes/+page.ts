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
		return {
			default: home.default,
			metadata: home.metadata
		};
	} catch (e) {
		console.log(e);
	}
}
