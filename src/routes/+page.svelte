<script lang="ts">
	import { onMount } from 'svelte';
	import BandcampEmbed from '$lib/components/BandcampEmbed.svelte';
	import StreamableEmbed from '$lib/components/StreamableEmbed.svelte';
	import EmbedCaption from '$lib/components/EmbedCaption.svelte';
	import EmbedWithCaption from '$lib/components/EmbedWithCaption.svelte';
	import Card from '$lib/components/Card.svelte';
	let { data } = $props();
	const metadata = data.metadata;
	let header = $state('');
	onMount(async () => {
		if (metadata.header) {
			const module = await import(
				`$lib/assets/images/${metadata.header.url.replace('.jpg', '')}.jpg?enhanced`
			);
			header = module.default;
		}
	});
</script>

<svelte:head>
	<meta name="description" />
</svelte:head>

<div class="text-md">
	{#if header}
		<div class="mb-4">
			<enhanced:img
				class="w-[100%] place-self-center object-contain sm:max-w-full md:max-w-full"
				src={header}
				alt={metadata.header.altText}
			/>
			{#if metadata.header.credit}
				<p class="justify-self-center"><small>{metadata.header.credit}</small></p>
			{/if}
		</div>
	{/if}

	<div class="mb-4">
		<data.default />
	</div>
	{#if metadata.highlights.length > 0}
		<div class="my-8 flex flex-col gap-8">
			{#each metadata.highlights as highlight}
				<Card>
					<EmbedWithCaption {...highlight} category={data.category} slug={highlight.slug} />
				</Card>
			{/each}
		</div>
	{/if}
</div>
