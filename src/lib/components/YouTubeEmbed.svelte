<script lang="ts">
	let { embed_code, title, artist, link, caption, artist_link, isPost, category, slug } = $props();
</script>

<div id="youtubeEmbed">
	<div class="h_iframe size-full place-self-center">
		<!-- {title} -->
		<iframe
			width=2
			height=2
			src="https://www.youtube.com/embed/{embed_code}"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
		></iframe>
	</div>
</div>

<style>
	.h_iframe {
		position: relative;
		padding-top: 56%;
	}
	.h_iframe iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>