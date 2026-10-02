import { dev } from '$app/environment'

export const title = 'Jonathan Piper'
export const url = dev ? 'http://localhost:5173' : 'https://www.jonathanpiper.com'
export const galleryColumns = 3
export const galleryGap = 16

/**
 * Bunny Stream video library that hosts performance videos (used in embed URLs and the
 * scripts/ Bunny tools). TODO: set once the jonathanpiper.com library exists on Bunny.
 */
export const bunnyLibraryId = '768726'
