export const prerender = true;

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
		return {
			default: page.default,
			metadata: page.metadata,
			posts,
			category: params.page
		};
	} catch (e) {
		console.error('Error loading page:', e);
	}
}
