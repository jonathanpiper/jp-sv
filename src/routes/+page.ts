import type { Home } from '$lib/types';

export async function load({ fetch }) {
	try {
		// const upcomingRes = await fetch('/api/events/upcoming')
		// const upcomingEvents: Event[] = await upcomingRes.json()
		const home = await import('$lib/pages/index.md');
		return {...home};
	} catch (e) {
		console.log(e);
	}
}
