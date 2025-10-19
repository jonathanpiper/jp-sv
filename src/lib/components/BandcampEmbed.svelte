<script lang="ts">
	let { embed_code, title, artist, link, caption, artist_link, isPost, category, slug } = $props();
</script>

<div id="bandcampEmbed">
	<div class="h-auto place-self-center">
		<!-- {title} -->
		<iframe
			style="border: 0; width: 700px; height: 120px;"
			src={'https://bandcamp.com/EmbeddedPlayer/' +
				embed_code +
				'/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/'}
			seamless
			title={"Bandcamp music player for '" + title + "' by " + artist}
		></iframe>
	</div>
</div>

<style>
</style>
