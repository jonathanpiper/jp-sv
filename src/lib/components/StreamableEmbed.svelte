<script lang="ts">
	let { embed_code, title, artist, performer } = $props();
</script>

<div id="streamableEmbed">
	<div class="h_iframe size-full place-self-center">
		<!-- {title} -->
		<iframe
			allow="fullscreen"
			allowfullscreen
			height=2
			src={`https://streamable.com/e/${embed_code}?loop=0`}
			width=2
			style="border:none;"
			title={"Streamable video player for '" +
				title +
				"' by " +
				artist +
				(performer ? `, performed by ${performer}` : '')}
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
