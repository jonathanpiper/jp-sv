import { json } from '@sveltejs/kit'
import { getPosts } from '$lib/index'
import type { ParamMatcher, RequestHandler } from '@sveltejs/kit'

// export const match = ((param: string): param is ('music' | 'exhibitions' | 'writing' ) => {
// 	return param === 'music' || param === 'exhibitions' || param === 'writing'
// }) satisfies ParamMatcher

export const GET: RequestHandler = async ({params, url}) => {
	// console.log('GET /posts')
	// const posts = await getPosts(params.slug  || '')
	// return json(posts)
}
