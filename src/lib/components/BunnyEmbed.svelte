<script lang="ts">
	// Bunny Stream video as a click-to-play facade: a self-hosted poster and a play button, with
	// the Bunny player iframe only created once the visitor presses play (it then autoplays). Until
	// then nothing loads from Bunny's servers.
	import { bunnyLibraryId } from '$lib/config';
	import { describeVideo, videoThumbnail } from '$lib/videoThumbs';
	import PlayButton from './PlayButton.svelte';

	let { embed_code, title, artist, performer } = $props();
	let playing = $state(false);

	let thumbnail = $derived(videoThumbnail(embed_code));
	let label = $derived(describeVideo(title, artist, performer) || 'performance');
</script>

<div class="relative aspect-video w-full overflow-hidden bg-neutral-900">
	{#if playing}
		<iframe
			title="Video player: {label}"
			src="https://iframe.mediadelivery.net/embed/{bunnyLibraryId}/{embed_code}?autoplay=true&preload=true&responsive=true"
			allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
			allowfullscreen
			class="absolute inset-0 size-full border-0"
		></iframe>
	{:else}
		{#if thumbnail}
			<enhanced:img
				src={thumbnail}
				alt=""
				loading="lazy"
				sizes="(max-width: 1023px) calc(100vw - 2rem), 864px"
				class="absolute inset-0 size-full object-cover"
			/>
		{/if}
		<PlayButton {label} onclick={() => (playing = true)} />
	{/if}
</div>
