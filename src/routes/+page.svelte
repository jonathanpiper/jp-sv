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
				`../lib/assets/images/${metadata.header.url.replace('.jpg', '')}.jpg?enhanced&w=864;672;504`
			);
			header = module.default;
		}
	});
</script>

<svelte:head>
	<title>Jonathan Piper | Tubist, Experimental Musician, San Diego</title>
	<meta name="description" content="Jonathan Piper is a San Diego-based tuba player (tubist) specializing in experimental and improvisational music." />
	<link rel="canonical" href="https://www.jonathanpiper.com" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Jonathan Piper | Tubist, Experimental Musician, San Diego" />
	<meta property="og:description" content="Jonathan Piper is a San Diego-based tuba player (tubist) specializing in experimental and improvisational music." />
	<meta property="og:url" content="https://www.jonathanpiper.com" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Jonathan Piper | Tubist, Experimental Musician, San Diego" />
	<meta name="twitter:description" content="Jonathan Piper is a San Diego-based tuba player (tubist) specializing in experimental and improvisational music." />
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "Person",
		"name": "Jonathan Piper",
		"jobTitle": "Tubist",
		"description": "San Diego-based tuba player specializing in experimental and improvisational music",
		"url": "https://www.jonathanpiper.com",
		"address": {
			"@type": "PostalAddress",
			"addressLocality": "San Diego",
			"addressRegion": "CA",
			"addressCountry": "US"
		},
		"knowsAbout": ["tuba", "experimental music", "improvisational music", "contemporary classical music"]
	})}</script>`}
</svelte:head>

<div class="text-md">
	<div class="sm:min-h-[200px] md:min-h-[275px] lg:min-h-[370px]">
		{#if header}
			<HeaderImage {header} altText={metadata.header.altText} credit={metadata.header.credit} />
		{/if}
	</div>
	<div class="mb-4">
		<data.default />
	</div>
	{#if metadata.highlights.length > 0}
		<div class="my-8 flex flex-col gap-8">
			{#each metadata.highlights as highlight, index}
				<Card>
					<EmbedWithCaption {...highlight} />
				</Card>
			{/each}
		</div>
	{/if}
</div>

<style>
	/* @media only screen and (max-width: 1026px) {
		.embed {
			display: none;
		}
	} */
</style>
