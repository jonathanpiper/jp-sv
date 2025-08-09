import type { Artist, Event, SimpleArtist } from './types'

export const checkArtistForMembers = async (
	artist: string | string[] | SimpleArtist[],
	asSlugs?: boolean
) => {
	let artistArray = Object.values(artist)[0]
	if (!Array.isArray(artistArray)) {
		artistArray = Object.values(artistArray)[0]
	}
	if (Array.isArray(artistArray)) {
		if (asSlugs) {
			artistArray = await Promise.all(
				artistArray.map(async (artistMember) => {
					const artistName = typeof artistMember === 'string' ? artistMember : artistMember.name
					let doesMemberHaveArtistEntry = await getArtist(toSlug(artistName))
					return doesMemberHaveArtistEntry
						? ({ name: artistName, slug: toSlug(artistName) } as SimpleArtist)
						: artistMember
				})
			)
		}
		return artistArray
	} else {
		return artist
	}
}

export const getArtists = async () => {
	let artists: Artist[] = []

	const paths = import.meta.glob('$lib/artists/*.md', { eager: true })

	for (const path in paths) {
		const file = paths[path]
		const slug = path.split('/').at(-1)?.replace('.md', '')

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Artist, 'slug'>
			const artist = { ...metadata, slug } satisfies Artist
			artists.push(artist)
		}
	}

	return artists.sort()
}

export const getEvents = async (options?: { sort?: string; boundary?: string }) => {
	let events: Event[] = []

	const paths = import.meta.glob('$lib/events/*.md', { eager: true })

	for (const path in paths) {
		const file = paths[path]
		const slug = path.split('/').at(-1)?.replace('.md', '')

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Event, 'slug'>
			const event = { ...metadata, slug } satisfies Event
			metadata.artists.forEach(async (artist, index) => {
				metadata.artists[index] = (await checkArtistForMembers(artist as string | string[])) as
					| string
					| string[]
			})
			events.push(event)
		}
	}
	// Sort events by date
	if (options?.sort === 'desc') {
		events.sort((a, b) => (a.date < b.date ? 1 : -1))
	} else {
		events.sort((a, b) => (a.date > b.date ? 1 : -1))
	}
	// Filter events by date
	const today = new Date().setHours(0, 0, 0, 0)
	if (options?.boundary === 'upcoming') {
		events = events.filter((event) => {
			const eventDate = new Date(event.date).setHours(0, 0, 0, 0)
			return eventDate >= today
		})
	}
	if (options?.boundary === 'past') {
		events = events.filter((event) => {
			const eventDate = new Date(event.date).setHours(0, 0, 0, 0)
			return eventDate < today
		})
	}
	return events
}

export const getEventMedia = (eventName: string) => {
	const media = import.meta.glob('$lib/media/*.md', { eager: true })
	const matchingMedia = []
	for (const path in media) {
		const file = media[path]
		if (file && typeof file === 'object' && 'metadata' in file) {
			const metadata = file.metadata as { event?: string }
			if (typeof metadata.event === 'string' && eventName === metadata.event) {
				matchingMedia.push({
					...metadata
				})
			}
		}
	}
	return matchingMedia
}

export const getArtistMedia = (performerName: string) => {
	const media = import.meta.glob('$lib/media/*.md', { eager: true })
	const matchingMedia = []
	for (const path in media) {
		const file = media[path]
		if (file && typeof file === 'object' && 'metadata' in file) {
			const metadata = file.metadata as { performers?: Array<string> }
			if (typeof metadata.performers === 'object' && metadata.performers.indexOf(performerName) !== -1) {
				matchingMedia.push({
					...metadata
				})
			}
		}
	}
	return matchingMedia
}

export const getArtist = async (slug: string) => {
	try {
		const memberFetch = await import(`$lib/artists/${slug}.md`)
		return true
	} catch (e) {
		return false
	}
}

export const toSlug = (string: string) => string.toLowerCase().replaceAll(' ', '-')
