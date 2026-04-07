<script lang="ts">
	import EmbedWithCaption from '$lib/components/EmbedWithCaption.svelte';
	import Card from '$lib/components/Card.svelte';
	import HeaderImage from '$lib/components/HeaderImage.svelte';
	import { formatDate } from '$lib/index';
	let { data } = $props();
	const metadata = data.metadata;
	const categoryDesc = `${data.category === 'about' ? 'About Jonathan Piper' : `${metadata.title} by Jonathan Piper`}, San Diego-based tuba player (tubist) specializing in experimental and improvisational music.`;
</script>

<svelte:head>
	<title>{metadata.title} | Jonathan Piper</title>
	<meta name="description" content={categoryDesc} />
	<link rel="canonical" href="https://www.jonathanpiper.com/{data.category}" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="{metadata.title} | Jonathan Piper" />
	<meta property="og:description" content={categoryDesc} />
	<meta property="og:url" content="https://www.jonathanpiper.com/{data.category}" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="{metadata.title} | Jonathan Piper" />
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
									class={post.titleistitle === 1 ? 'italic' : ''}>{@html post.title}</a
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
