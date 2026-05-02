import { error } from '@sveltejs/kit';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
	return [
		{ page: 'about' },
		{ page: 'music' },
		{ page: 'exhibitions' },
		{ page: 'writing' },
	];
};


export const prerender = true;

// Eagerly bundle all root-level page header images so the data is available
// synchronously in both SSR and browser hydration — no async chunk fetch that
// could cause a hydration mismatch.
const pageHeaderImages = import.meta.glob('$lib/assets/images/*.jpg', {
	eager: true,
	import: 'default',
	query: { enhanced: true, w: '864;600;400;200' }
});

export async function load({ params }) {
	try {
		const page = await import(`$lib/pages/${params.page}.md`);

		let posts = [];
		const paths = import.meta.glob('$lib/posts/*.md', { eager: true });

		for (const path in paths) {
			const file = paths[path];
			const slug = path.split('/').at(-1)?.replace('.md', '');

			if (file && typeof file === 'object' && 'metadata' in file && slug) {
				const { metadata, default: content }: { metadata: any; default: any } = file as {
					metadata: any;
					default: any;
				};
				if (metadata.category !== params.page) continue;
				const post = { ...metadata, isPost: true, slug };
				posts.push(post);
			}
		}
		posts.sort((a, b) => {
			return -((new Date(a.date) as any) - (new Date(b.date) as any));
		});

		// Synchronous lookup — no await needed since the glob is eager.
		let header = null;
		if (page.metadata?.header) {
			const filename = page.metadata.header.url;
			const entry = Object.entries(pageHeaderImages).find(([k]) => k.endsWith(`/${filename}`));
			if (entry) header = entry[1];
		}

		return {
			default: page.default,
			metadata: page.metadata,
			posts,
			category: params.page,
			header
		};
	} catch (e) {
		console.error('Error loading page:', e);
		throw error(404, `Page not found: ${params.page}`);
	}
}
