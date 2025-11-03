import type { LayoutLoad } from './$types';
import type { MenuItem } from '../lib/types';
export const prerender = true;

export const load: LayoutLoad = () => {
    let pages: MenuItem[] = []
    const paths = import.meta.glob('$lib/pages/*.md', { eager: true })

	for (const path in paths) {
		const file = paths[path]
		const slug = path.split('/').at(-1)?.replace('.md', '')

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as MenuItem
			const page = { ...metadata, slug }
			pages.push(page)
		}
	}
    pages = pages.filter((p) => p.slug.indexOf('index') === -1).sort((a, b) => a.order - b.order)
    return {
        pages
    }
}