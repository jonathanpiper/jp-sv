<script lang="ts">
	import { onMount } from 'svelte';
	import EmbedWithCaption from '$lib/components/EmbedWithCaption.svelte';
	import Card from '$lib/components/Card.svelte';
	import HeaderImage from '$lib/components/HeaderImage.svelte';
	let { data } = $props();
	const metadata = data.metadata;
	let header = $state('');
	onMount(async () => {
		if (metadata.header) {
			const module = await import(
				`../lib/assets/images/${metadata.header.url.replace('.jpg', '')}.jpg?enhanced&w=1000;800;600;400;200`
			);
			header = module.default;
		}
	});
</script>

<svelte:head>
	<meta name="description" content="Jonathan Piper is a San Diego-based tuba player (tubist) specializing in experimental and improvisational music." />
</svelte:head>

<div class="text-md">
	{#if header}
		<HeaderImage {header} altText={metadata.header.altText} credit={metadata.header.credit} />
	{/if}

	<div class="mb-4">
		<data.default />
	</div>
	{#if metadata.highlights.length > 0}
		<div class="my-8 flex flex-col gap-8">
			{#each metadata.highlights as highlight}
				<Card>
					<EmbedWithCaption {...highlight} />
				</Card>
			{/each}
		</div>
	{/if}
</div>
