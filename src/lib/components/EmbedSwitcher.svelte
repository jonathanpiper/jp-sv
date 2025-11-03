<script lang="ts">
	export let source: string;
	export let embed_code: string;
	export let title: string;
	export let artist: string;
	export let link: string;

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
	<svelte:component this={Component} {embed_code} {title} {artist} {link} />
{:else}
	<div class="embed-fallback">Media unavailable</div>
{/if}
