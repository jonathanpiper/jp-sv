<script lang="ts">
	import { page } from '$app/state';
	import BandcampEmbed from '$lib/components/BandcampEmbed.svelte';
	import StreamableEmbed from '$lib/components/StreamableEmbed.svelte';
	import YouTubeEmbed from '$lib/components/YouTubeEmbed.svelte';
	import EmbedCaption from '$lib/components/EmbedCaption.svelte';
	import { invalidateAll } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';
	import { beforeNavigate, onNavigate } from '$app/navigation';
	import { formatDate } from '$lib/index';
	import * as config from '$lib/config';
	import Masonry from 'svelte-bricks';
	let { data } = $props();
	const metadata = data.metadata;
	let header = $state(null);
	let gallery = $state(null);
	// svelte-ignore non_reactive_update
	let musicHeading;
	if (metadata.category === 'music') {
		let isArtistPage = page.url.pathname === `/${metadata.category}/${metadata.slug}`;
		console.log(
			'isArtistPage:',
			isArtistPage,
			page.url.pathname,
			`/${metadata.category}/${metadata.slug}/`
		);
		musicHeading = metadata.artist_link
			? `<a href="${metadata.artist_link}" target="_blank">${metadata.artist}</a>`
			: !isArtistPage
				? `<a href="/${metadata.category}/${metadata.slug}">${metadata.artist}</a>`
				: metadata.artist !== 'Jonathan Piper'
					? `${metadata.artist}`
					: '';
		if (musicHeading.length > 0 && metadata.title) musicHeading += ' - ';
		if (metadata.title) musicHeading += metadata.title;
	}
	onMount(async () => {
		if (metadata.header) {
			const module = await import(
				`$lib/assets/images/${metadata.header.url.replace('.jpg', '')}.jpg?enhanced`
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
	<meta name="description" content="" />
</svelte:head>

<div>
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

	{#if metadata.artist}
		<div class="mb-4 justify-between">
			<div class="-mb-2">
				<h2>
					{@html musicHeading}
					<!-- {@html metadata.artist !== 'Jonathan Piper' && metadata.artist_link
						? `<a href="${metadata.artist_link}" target="_blank">${metadata.artist}</a>`
						: metadata.artist !== 'Jonathan Piper'
							? `${metadata.artist}`
							: ''}
					{#if metadata.title}<em>{@html ` - ${metadata.title}`}</em>{/if} -->
				</h2>
			</div>
			{#if metadata.date}<span class="text-gray-500">{formatDate(metadata.date)}</span>{/if}
		</div>
	{/if}

	{#if metadata.embed_code}
		<div class="mb-8">
			{#if metadata.source === 'bandcamp'}
				<BandcampEmbed
					embed_code={metadata.embed_code}
					title={metadata.title}
					artist={metadata.artist}
					link={metadata.link}
				/>
			{:else if metadata.source === 'streamable'}
				<StreamableEmbed
					embed_code={metadata.embed_code}
					title={metadata.title}
					artist={metadata.artist}
				/>
			{:else if metadata.source === 'youtube'}
				<YouTubeEmbed
					embed_code={metadata.embed_code}
					title={metadata.title}
					artist={metadata.artist}
				/>
			{:else}
				<!-- Handle other sources or default case -->
			{/if}
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
