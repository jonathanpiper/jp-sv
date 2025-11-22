<script lang="ts">
	import BandcampEmbed from '$lib/components/BandcampEmbed.svelte';
	import StreamableEmbed from '$lib/components/StreamableEmbed.svelte';
	import EmbedCaption from '$lib/components/EmbedCaption.svelte';
	import EmbedWithCaption from '$lib/components/EmbedWithCaption.svelte';
	import Card from '$lib/components/Card.svelte';
	import HeaderImage from '$lib/components/HeaderImage.svelte';
	import { invalidateAll } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';
	import { beforeNavigate, onNavigate } from '$app/navigation';
	import * as config from '$lib/config';
	import { formatDate } from '$lib/index';
	let { data } = $props();
	const metadata = data.metadata;
	let header = $state(null);
	onMount(async () => {
		if (metadata.hasOwnProperty('header') && metadata.header) {
			const module = await import(
				`../../lib/assets/images/${metadata.header.url.replace('.jpg', '')}.jpg?enhanced&w=1000;800;600;400;200`
			);
			header = module.default;
		} else {
			header = null;
		}
	});
</script>

<svelte:head>
	<meta name="description" content="{data.category === 'about' ? 'About Jonathan Piper' : `Pages about ${data.category} from Jonathan Piper`}, San Diego-based tuba player (tubist) specializing in experimental and improvisational music." />
</svelte:head>

<div>
	{#if header}
		<HeaderImage {header} altText={metadata.header.altText} credit={metadata.header.credit} />
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
