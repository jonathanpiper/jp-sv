<script lang="ts">
	let { source, embed_code, title, artist, link, size } = $props();

	import BandcampEmbed from '$lib/components/BandcampEmbed.svelte';
	import StreamableEmbed from '$lib/components/StreamableEmbed.svelte';
	import YouTubeEmbed from '$lib/components/YouTubeEmbed.svelte';

	const registry = {
		bandcamp: BandcampEmbed,
		streamable: StreamableEmbed,
		youtube: YouTubeEmbed
	};
	const Component = registry[source];
</script>

{#if Component}
	<Component {embed_code} {title} {artist} {link} {size} />
{:else}
	<div class="embed-fallback">Media unavailable</div>
{/if}
