<script lang="ts">
	import BandcampEmbed from '$lib/components/BandcampEmbed.svelte';
	import StreamableEmbed from '$lib/components/StreamableEmbed.svelte';
	import EmbedCaption from '$lib/components/EmbedCaption.svelte';
	import EmbedWithCaption from '$lib/components/EmbedWithCaption.svelte';
	import Card from '$lib/components/Card.svelte';
	import { invalidateAll } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';
	import { beforeNavigate, onNavigate } from '$app/navigation';
	import * as config from '$lib/config';
	import { formatDate } from '$lib/index';
	let { data } = $props();
	const metadata = data.metadata;
	let header = $state(null);
	onMount(async () => {
		if (metadata.hasOwnProperty("header") && metadata.header) {
			const module = await import(
				`$lib/assets/images/${metadata.header.url.replace('.jpg', '')}.jpg?enhanced`
			);
			header = module.default;
		} else {
			header = null;
		}
	});
</script>

<svelte:head>
	<meta name="description" content="" />
</svelte:head>

<div>
	{#if header}
		<div class="mb-4">
			<enhanced:img
				class="max-h-[600px] place-self-center object-contain sm:max-w-full md:max-w-full"
				src={header}
				alt={metadata.header.altText}
			/>
			{#if metadata.header.credit}
				<p class="justify-self-center"><small>{metadata.header.credit}</small></p>
			{/if}
		</div>
	{/if}

	<data.default />

	<div class="my-8 flex flex-col gap-8">
		{#each data.posts as post, index}
			<Card>
				{#if post.embed_code}
					<EmbedWithCaption {...post} category={data.category} slug={post.slug} />
				{:else}
					<div class="flex flex-col gap-1">
						<div class="flex flex-row justify-between gap-1 border-b border-gray-300 mb-2">
							<h3><a href={`${data.category}/${post.slug}`} class={post.titleistitle === 1 ? "italic" : ""}>{@html post.title}</a></h3><span class="text-end w-48 text-gray-900"
								>{formatDate(post.date)}</span
							>
						</div>
							{#if post.caption}<p class="!mb-0">{@html post.caption}</p>{/if}
							{#if post.short}<p class="!mb-0">{#if post.category === "writing"}"{/if}{@html post.short}{#if post.category === "writing"}"{/if}</p>{/if}
					</div>
				{/if}
			</Card>
		{/each}
	</div>
</div>
