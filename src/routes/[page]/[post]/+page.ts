import type { Excerpt } from '$lib/types';
export const prerender = true;

export async function load({ params }) {
	try {
		const post = await import(`$lib/posts/${params.post}.md`);

		return {
			default: post.default,
			metadata: {...post.metadata, slug: params.post}
		};
	} catch (e) {
		console.error('Error loading page:', e);
	}
}
