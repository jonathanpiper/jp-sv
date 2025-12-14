<script lang="ts">
	import { page } from '$app/state';
	import EmbedSwitcher from '$lib/components/EmbedSwitcher.svelte';
	import MusicHeading from '$lib/components/MusicHeading.svelte';
	import HeaderImage from '$lib/components/HeaderImage.svelte';
	import { onMount } from 'svelte';
	import { formatDate } from '$lib/index';
	import * as config from '$lib/config';
	import { computeSeoDescription } from '$lib/helpers/seo';
	import Masonry from 'svelte-bricks';
	let { data } = $props();
	const metadata = data.metadata;
	let header = $state(null);
	let gallery = $state(null);
	onMount(async () => {
		if (metadata.header) {
			const module = await import(
				`$lib/assets/images/${metadata.header.url.replace('.jpg', '')}.jpg?enhanced&w=1000;800;600;400;200`
			);
			header = module.default;
		} else {
			header = null;
		}
		if (metadata.gallery) {
			let galleryModule;
			switch (metadata.gallery.location) {
				case 'exhibitions/sound-up/':
					galleryModule = await import.meta.glob(
						`../../../lib/assets/images/exhibitions/sound-up/*.jpg`
					);
					break;
				case 'exhibitions/what-good-is-music/':
					galleryModule = await import.meta.glob(
						`../../../lib/assets/images/exhibitions/what-good-is-music/*.jpg`
					);
					break;
				case 'exhibitions/accordions/':
					galleryModule = await import.meta.glob(
						`../../../lib/assets/images/exhibitions/accordions/*.jpg`
					);
					break;
				case 'exhibitions/momm-renovation/':
					galleryModule = await import.meta.glob(
						`../../../lib/assets/images/exhibitions/momm-renovation/*.jpg`
					);
					break;
								case 'music/neither-spin-nor-sew/':
					galleryModule = await import.meta.glob(
						`../../../lib/assets/images/music/neither-spin-nor-sew/*.jpg`
					);
					break;
				default:
					galleryModule = null;
			}
			gallery = galleryModule
				? await Promise.all(
						Object.entries(galleryModule).map(async ([path, resolver]) => {
							const mod = await resolver();
							return { src: mod.default, alt: '' };
						})
					)
				: null;
		} else {
			gallery = null;
		}
	});
</script>

<svelte:head>
	<meta name="description" content={computeSeoDescription(metadata)} />
</svelte:head>

<div>
	{#if header}
		<HeaderImage {header} altText={metadata.header.altText} credit={metadata.header.credit} />
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

	{#if gallery}
		<Masonry
			items={gallery}
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
