<script lang="ts">
	import StreamableEmbed from './StreamableEmbed.svelte';
	import BandcampEmbed from './BandcampEmbed.svelte';
	import YouTubeEmbed from './YouTubeEmbed.svelte';
	import EmbedCaption from './EmbedCaption.svelte';
	let {
		captionOnTop,
		source,
		embed_code,
		title,
		artist,
		link,
		caption,
		artist_link,
		isPost,
		category,
		slug,
		date
	} = $props();
</script>

<div class="flex flex-col gap-4">
	{#if captionOnTop}
		<EmbedCaption
			{embed_code}
			{title}
			{artist}
			{link}
			{caption}
			{artist_link}
			{isPost}
			{category}
			{slug}
			{date}
		/>
	{/if}
	{#if source === 'streamable'}
		<StreamableEmbed {embed_code} {title} {artist} />
	{:else if source === 'bandcamp'}
		<BandcampEmbed {embed_code} {title} {artist} />
	{:else if source === 'youtube'}
		<YouTubeEmbed {embed_code} {title} {artist} {link} />
	{:else}
		<!-- Handle other sources or default case -->
	{/if}
	{#if !captionOnTop}
		<EmbedCaption
			{embed_code}
			{title}
			{artist}
			{link}
			{caption}
			{artist_link}
			{isPost}
			{category}
			{slug}
			{date}
		/>
	{/if}
</div>
