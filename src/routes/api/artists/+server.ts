import { json } from '@sveltejs/kit'
import { getArtists } from '$lib/index'

export const GET = async () => {
	console.log('GET /artists')
	const artists = await getArtists()
	return json(artists)
}
