import type { Post, Highlight } from '$lib/types';

export async function load() {
	try {
		const home = (await import('../lib/pages/index.md')) as Post;
		const highlights: Highlight[] = await Promise.all(
			home.metadata.highlights.map(async (h) => {
				console.log('h', h);
				if (h.post) {
					console.log(h.post);
					const p = (await import(`../lib/posts/${h.post}.md`)) as Post;
					return {
						isPost: true,
						...p.metadata
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
