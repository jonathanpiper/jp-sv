export const prerender = true;

export async function load({ params }) {
	try {
		const post = await import(`$lib/posts/${params.post}.md`);

		// Load header image at build time so it's available in prerendered HTML
		let header = null;
		if (post.metadata.header) {
			const mod = await import(
				`$lib/assets/images/${post.metadata.header.url.replace('.jpg', '')}.jpg?enhanced&w=1000;800;600;400;200`
			);
			header = mod.default;
		}

		// Load gallery images at build time
		let gallery: { src: string; alt: string }[] | null = null;
		if (post.metadata.gallery) {
			let galleryModule: Record<string, () => Promise<{ default: string }>> | null = null;
			switch (post.metadata.gallery.location) {
				case 'exhibitions/sound-up/':
					galleryModule = import.meta.glob(
						'$lib/assets/images/exhibitions/sound-up/*.jpg'
					) as Record<string, () => Promise<{ default: string }>>;
					break;
				case 'exhibitions/what-good-is-music/':
					galleryModule = import.meta.glob(
						'$lib/assets/images/exhibitions/what-good-is-music/*.jpg'
					) as Record<string, () => Promise<{ default: string }>>;
					break;
				case 'exhibitions/accordions/':
					galleryModule = import.meta.glob(
						'$lib/assets/images/exhibitions/accordions/*.jpg'
					) as Record<string, () => Promise<{ default: string }>>;
					break;
				case 'exhibitions/momm-renovation/':
					galleryModule = import.meta.glob(
						'$lib/assets/images/exhibitions/momm-renovation/*.jpg'
					) as Record<string, () => Promise<{ default: string }>>;
					break;
				case 'music/neither-spin-nor-sew/':
					galleryModule = import.meta.glob(
						'$lib/assets/images/music/neither-spin-nor-sew/*.jpg'
					) as Record<string, () => Promise<{ default: string }>>;
					break;
				case 'music/and-they-all-of-them/':
					galleryModule = import.meta.glob(
						'$lib/assets/images/music/and-they-all-of-them/*.jpg'
					) as Record<string, () => Promise<{ default: string }>>;
					break;
			}
			gallery = galleryModule
				? await Promise.all(
						Object.entries(galleryModule).map(async ([, resolver]) => {
							const mod = await resolver();
							return { src: mod.default, alt: '' };
						})
					)
				: null;
		}

		return {
			default: post.default,
			metadata: { ...post.metadata, slug: params.post },
			header,
			gallery
		};
	} catch (e) {
		console.error('Error loading page:', e);
	}
}
