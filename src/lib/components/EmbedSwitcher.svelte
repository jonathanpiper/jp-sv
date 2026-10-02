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

	import { titleText } from '$lib/index';
	import BandcampEmbed from '$lib/components/BandcampEmbed.svelte';
	import BunnyEmbed from '$lib/components/BunnyEmbed.svelte';
	import YouTubeEmbed from '$lib/components/YouTubeEmbed.svelte';

	const registry = {
		bandcamp: BandcampEmbed,
		bunny: BunnyEmbed,
		youtube: YouTubeEmbed
	};
	const Component = $derived(registry[source as keyof typeof registry]);
</script>

{#if Component}
	<!-- Plain-text title: the players only use it for accessible labels -->
	<Component {embed_code} title={titleText(title)} {artist} {performer} />
{:else}
	<div class="embed-fallback">Media unavailable</div>
{/if}
