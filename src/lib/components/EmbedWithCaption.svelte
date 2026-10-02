<script lang="ts">
	import EmbedSwitcher from './EmbedSwitcher.svelte';
	import EmbedCaption from './EmbedCaption.svelte';
	let {
		captionOnTop,
		source,
		embed_code,
		title,
		artist,
		performer,
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
	<EmbedSwitcher {source} {embed_code} {title} {artist} {performer} />
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
