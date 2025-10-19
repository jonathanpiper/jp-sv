import type { Artist, Event, SimpleArtist, Post } from './types';

// export const getPosts = async (category: string) => {
// 	const posts: Post[] = [];

// 	const paths = import.meta.glob('$lib/posts/*.md', { eager: true });

// 	for (const path in paths) {
// 		const file = paths[path];
// 		const slug = path.split('/').at(-1)?.replace('.md', '') || '';
// 		const date = slug.split('-').slice(0, 3).join('-');

// 		if (file && typeof file === 'object' && 'metadata' in file && slug) {
// 			if (category && (file.metadata as Post)?.category === category) {
// 				const metadata = file.metadata as Post;
// 				console.log()
// 				const post = { ...metadata, default: (file as any).default, slug, date: date } as Post;
// 				console.log('post', post);
// 				posts.push(post);
// 			}
// 		}
// 	}

// 	return posts.sort((a, b) => (a.date > b.date ? 1 : -1));;
// };

export const toSlug = (string: string) => string.toLowerCase().replaceAll(' ', '-');

export const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return `${date.getDate() + 1} ${date.toLocaleString('default', {month: 'long'})},  ${date.getFullYear()}`;
}