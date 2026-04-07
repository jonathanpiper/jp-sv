<script lang="ts">
	import { page } from '$app/state';
	import EmbedSwitcher from '$lib/components/EmbedSwitcher.svelte';
	import MusicHeading from '$lib/components/MusicHeading.svelte';
	import HeaderImage from '$lib/components/HeaderImage.svelte';
	import { formatDate } from '$lib/index';
	import * as config from '$lib/config';
	import { computeSeoDescription } from '$lib/helpers/seo';
	import Masonry from 'svelte-bricks';
	let { data } = $props();
	const metadata = data.metadata;
	const seoDesc = computeSeoDescription(metadata);
	const canonicalUrl = `${config.url}/${page.params.page}/${page.params.post}`;
	const jsonLd = JSON.stringify(
		metadata.category === 'music'
			? {
					'@context': 'https://schema.org',
					'@type': 'MusicRecording',
					name: metadata.title,
					byArtist: { '@type': 'MusicGroup', name: metadata.artist ?? 'Jonathan Piper' },
					datePublished: metadata.date,
					url: canonicalUrl
				}
			: {
					'@context': 'https://schema.org',
					'@type': 'CreativeWork',
					name: metadata.title,
					author: { '@type': 'Person', name: 'Jonathan Piper' },
					datePublished: metadata.date,
					url: canonicalUrl
				}
	);
</script>

<svelte:head>
	<title>{metadata.title} | Jonathan Piper</title>
	<meta name="description" content={seoDesc} />
	<link rel="canonical" href={canonicalUrl} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content="{metadata.title} | Jonathan Piper" />
	<meta property="og:description" content={seoDesc} />
	<meta property="og:url" content={canonicalUrl} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="{metadata.title} | Jonathan Piper" />
	<meta name="twitter:description" content={seoDesc} />
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<div>
	{#if data.header}
		<HeaderImage header={data.header} altText={metadata.header.altText} credit={metadata.header.credit} />
	{/if}

	{#if metadata.artist}
		<div class="mb-4 justify-between">
			<div class="-mb-2">
				<MusicHeading {metadata} />
			</div>
			{#if metadata.date}<span class="text-gray-500">{formatDate(metadata.date)}</span>{/if}
		</div>
	{/if}

	{#if metadata.embed_code}
		<div class="mb-8">
			<EmbedSwitcher {...metadata} />
		</div>
	{/if}

	<data.default />

	{#if data.gallery}
		<Masonry
			items={data.gallery}
			columns={config.galleryColumns}
			gap={config.galleryGap}
			idKey="src"
			let:item
		>
			{#snippet children({ item })}
				{@const { src, alt } = item}
				<img {src} {alt} class="h-auto w-full" />
			{/snippet}
		</Masonry>
	{/if}
</div>
