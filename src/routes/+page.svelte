<script lang="ts">
	import EmbedWithCaption from '$lib/components/EmbedWithCaption.svelte';
	import Card from '$lib/components/Card.svelte';
	import HeaderImage from '$lib/components/HeaderImage.svelte';
	let { data } = $props();
	const metadata = data.metadata;
</script>

<svelte:head>
	<title>Jonathan Piper | Experimental Tuba Player & Tubist, San Diego</title>
	<meta name="description" content="Jonathan Piper is a San Diego-based experimental tuba player and tubist specializing in experimental and improvisational music." />
	<link rel="canonical" href="https://www.jonathanpiper.com" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Jonathan Piper | Experimental Tuba Player & Tubist, San Diego" />
	<meta property="og:description" content="Jonathan Piper is a San Diego-based experimental tuba player and tubist specializing in experimental and improvisational music." />
	<meta property="og:url" content="https://www.jonathanpiper.com" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Jonathan Piper | Experimental Tuba Player & Tubist, San Diego" />
	<meta name="twitter:description" content="Jonathan Piper is a San Diego-based experimental tuba player and tubist specializing in experimental and improvisational music." />
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "Person",
		"name": "Jonathan Piper",
		"jobTitle": "Tubist",
		"description": "San Diego-based experimental tuba player and tubist specializing in experimental and improvisational music",
		"url": "https://www.jonathanpiper.com",
		"address": {
			"@type": "PostalAddress",
			"addressLocality": "San Diego",
			"addressRegion": "CA",
			"addressCountry": "US"
		},
		"knowsAbout": [
			"tuba", "experimental tuba", "experimental music", "improvisational music",
			"contemporary classical music", "free improvisation", "extended techniques",
			"circular breathing", "multiphonics", "drone music", "doom metal",
			"noise music", "free jazz", "electronics", "museum curation"
		],
		"sameAs": [
			"https://escholarship.org/uc/item/7bq7387s"
		],
		"alumniOf": [
			{ "@type": "CollegeOrUniversity", "name": "University of California, Los Angeles" },
			{ "@type": "CollegeOrUniversity", "name": "University of California, San Diego" }
		],
		"memberOf": [
			{ "@type": "MusicGroup", "name": "1515", "url": "https://151515.bandcamp.com" },
			{ "@type": "MusicGroup", "name": "Codex Confiteor" },
			{ "@type": "MusicGroup", "name": "go by land" }
		]
	})}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "WebPage",
		"name": "Jonathan Piper | Experimental Tuba Player & Tubist, San Diego",
		"url": "https://www.jonathanpiper.com",
		"speakable": {
			"@type": "SpeakableSpecification",
			"cssSelector": ["h2", ".text-md p"]
		},
		"about": { "@type": "Person", "name": "Jonathan Piper" }
	})}</script>`}
</svelte:head>

<div class="text-md">
	<div class="sm:min-h-[200px] md:min-h-[275px] lg:min-h-[370px]">
		{#if data.header}
			<HeaderImage header={data.header} altText={metadata.header.altText} credit={metadata.header.credit} />
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
