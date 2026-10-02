<script lang="ts">
	import EmbedWithCaption from '$lib/components/EmbedWithCaption.svelte';
	import Card from '$lib/components/Card.svelte';
	import HeaderImage from '$lib/components/HeaderImage.svelte';
	import { formatDate, titleHtml, titleText } from '$lib/index';
	let { data } = $props();
	const metadata = data.metadata;
	const pageTitle = titleText(metadata.title);
	const categoryDescMap: Record<string, string> = {
		about: 'About Jonathan Piper — San Diego-based experimental tuba player, tubist, creative technologist, and former museum curator.',
		music: 'Music by Jonathan Piper — experimental tuba and electronics, free improvisation, drone, and noise. Recordings and live performances.',
		writing: 'Writing by Jonathan Piper — music scholarship including a dissertation on doom metal, conference papers on metal and digital media.',
		exhibitions: 'Museum exhibitions curated by Jonathan Piper at the NAMM Museum of Making Music (MoMM) in Carlsbad, California, 2017–2023.'
	};
	const categoryDesc = categoryDescMap[data.category] ?? `${pageTitle} by Jonathan Piper, San Diego-based experimental tuba player.`;
</script>

<svelte:head>
	<title>{pageTitle} | Jonathan Piper</title>
	<meta name="description" content={categoryDesc} />
	<link rel="canonical" href="https://www.jonathanpiper.com/{data.category}" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="{pageTitle} | Jonathan Piper" />
	<meta property="og:description" content={categoryDesc} />
	<meta property="og:url" content="https://www.jonathanpiper.com/{data.category}" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="{pageTitle} | Jonathan Piper" />
	<meta name="twitter:description" content={categoryDesc} />
</svelte:head>

<div>
	{#if data.header}
		<HeaderImage header={data.header} altText={metadata.header.altText} credit={metadata.header.credit} />
	{/if}

	<data.default />

	<div class="my-8 flex flex-col gap-8">
		{#each data.posts as post, index}
			<Card>
				{#if post.embed_code}
					<EmbedWithCaption {...post} category={data.category} slug={post.slug} />
				{:else}
					<div class="flex flex-col gap-1">
						<div class="mb-2 flex flex-row justify-between gap-1 border-b border-gray-300">
							<h3>
								<a
									href={`${data.category}/${post.slug}`}
									class={post.titleistitle === 1 ? 'italic' : ''}>{@html titleHtml(post.title)}</a
								>
							</h3>
							<span class="w-48 text-end text-gray-900">{formatDate(post.date)}</span>
						</div>
						{#if post.caption}<p class="!mb-0">{@html post.caption}</p>{/if}
						{#if post.short}<p class="!mb-0">
								{#if post.category === 'writing'}"{/if}{@html post.short}{#if post.category === 'writing'}"{/if}
							</p>{/if}
					</div>
				{/if}
			</Card>
		{/each}
	</div>
</div>

<style>
</style>
