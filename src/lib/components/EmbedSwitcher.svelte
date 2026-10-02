<script lang="ts">
	// Renders a post's embed with the right player for its `source`. Unknown sources show a
	// fallback message.
	type Props = {
		source?: string;
		embed_code?: string;
		title?: string;
		artist?: string;
		/** Who played it, when `artist` is the composer */
		performer?: string;
	};
	let { source, embed_code, title, artist, performer }: Props = $props();

	import BandcampEmbed from '$lib/components/BandcampEmbed.svelte';
	import BunnyEmbed from '$lib/components/BunnyEmbed.svelte';
	// TODO: remove (and delete StreamableEmbed.svelte) once `pnpm migrate-streamable` has moved
	// every post to Bunny
	import StreamableEmbed from '$lib/components/StreamableEmbed.svelte';
	import YouTubeEmbed from '$lib/components/YouTubeEmbed.svelte';

	const registry = {
		bandcamp: BandcampEmbed,
		bunny: BunnyEmbed,
		streamable: StreamableEmbed,
		youtube: YouTubeEmbed
	};
	const Component = $derived(registry[source as keyof typeof registry]);
</script>

{#if Component}
	<Component {embed_code} {title} {artist} {performer} />
{:else}
	<div class="embed-fallback">Media unavailable</div>
{/if}
