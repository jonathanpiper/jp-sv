import type { Picture } from '$lib/types';

/**
 * Self-hosted video posters, keyed by embed code (a Bunny guid or YouTube id). They're downloaded
 * by scripts/sync-bunny-thumbs.mjs, so a video embed can show its poster without loading anything
 * from Bunny or YouTube until the visitor presses play.
 */
const thumbnails = import.meta.glob<Picture>('$lib/assets/images/video-thumbs/*.jpg', {
	query: { enhanced: true, w: '1000;800;400' },
	import: 'default',
	eager: true
});

/** Returns the poster for an embed code, or undefined if it hasn't been downloaded yet */
export const videoThumbnail = (code: string): Picture | undefined =>
	Object.entries(thumbnails).find(([path]) => path.endsWith(`/${code}.jpg`))?.[1];

/**
 * Accessible description of a video, e.g. "'Crapiccio' by Brian Griffeath-Loeb, performed by
 * Jonathan Piper". Used for the play button's label and the player iframe's title.
 */
export const describeVideo = (title?: string, artist?: string, performer?: string) =>
	[
		title ? `'${title}'` : '',
		artist ? `${title ? 'by ' : ''}${artist}` : '',
		performer ? `, performed by ${performer}` : ''
	]
		.join(' ')
		.replace(/\s+,/g, ',')
		.trim();
