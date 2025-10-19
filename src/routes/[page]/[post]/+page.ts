import type { Excerpt } from '$lib/types';

export async function load({ params }) {
	try {
		const post = await import(`$lib/posts/${params.post}.md`);

		// let posts: Excerpt[] = [];
		// const paths = import.meta.glob('$lib/posts/*.md', { eager: true });

		// for (const path in paths) {
		// 	const file = paths[path];
		console.log(post)

		return {
			default: post.default,
			metadata: {...post.metadata, slug: params.post}
		};
	} catch (e) {
		console.error('Error loading page:', e);
	}
}
