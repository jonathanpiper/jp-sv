import { getArtist } from '$root/src/lib/index.js'
import { error } from '@sveltejs/kit'
import { getArtistMedia } from '$root/src/lib/index.js'

export const load = async ({ params, depends }) => {
	depends('new:artist')
	try {
		const artist = await import(`$lib/artists/${params.artist as string}.md`)

		const getMember = async (slug: string) => {
			try {
				const memberFetch = await import(`$lib/artists/${slug}.md`)
				return true
			} catch (e) {
				return false
			}
		}

		if (artist.metadata.members) {
			const members = artist.metadata.members
			let membersArray = []
			// console.log(members)
			for (const member in members) {
				const memberName = members[member]
				if (typeof memberName === 'string') {
					const slug = memberName.toLowerCase().replaceAll(' ', '-')
					let memberArtist = await getMember(slug)
					membersArray.push(memberArtist ? { name: memberName, slug: slug } : memberName)
				} else {
					membersArray.push(memberName)
				}
			}
			artist.metadata.members = membersArray
		}

        artist.metadata.media = getArtistMedia(artist.metadata.name)

		return {
			default: artist.default,
			meta: artist.metadata
		}
	} catch (e) {
		console.log(e)
		error(404, `Could not find ${params.artist}`)
	}
}
