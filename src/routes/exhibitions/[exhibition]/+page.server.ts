import type { Artist } from '$lib/types';

export async function load({fetch}) {
    const res= await fetch('/api/artists')
    const artists: Artist[] = await res.json()
    return {
        artists
    }
}