<script lang="ts">
	let { embed_code, title, artist, link, caption, artist_link, isPost, category, slug, size } =
		$props();
	if (!size) {
		size = 'large';
	}
</script>

<div id="bandcampEmbed">
	<div class="h-auto w-full place-self-center">
		<!-- {title} -->
		<iframe
			id="fullwidth"
			style="border: 0; width: 100%; height: 120px;"
			src={'https://bandcamp.com/EmbeddedPlayer/' +
				embed_code +
				'/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/'}
			seamless
			title={"Bandcamp music player for '" + title + "' by " + artist}
		></iframe>
		<iframe
			id="smallwidth"
			style="border: 0; width: 100%; height: 442px;"
			src={'https://bandcamp.com/EmbeddedPlayer/' +
				embed_code +
				'/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/'}
			seamless
			title={"Bandcamp music player for '" + title + "' by " + artist}
		></iframe>
	</div>
</div>

<style>
	@media only screen and (max-width: 768px) {
		#fullwidth {
			display: none;
		}
	}
	@media only screen and (min-width: 768px) {
		#smallwidth {
			display: none;
		}
	}
</style>
