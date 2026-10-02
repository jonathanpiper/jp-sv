<script lang="ts">
	// Bandcamp player in two layouts: the compact player with small artwork on wider screens,
	// and the tall player with full artwork on phones. Bandcamp picks the layout from the URL, so
	// each needs its own iframe; CSS hides the one that doesn't fit. Both are loading="lazy", and a
	// lazy iframe hidden with display:none never enters the viewport, so only the visible one loads.
	let { embed_code, title, artist } = $props();

	const base = $derived(`https://bandcamp.com/EmbeddedPlayer/${embed_code}/size=large/bgcol=ffffff/linkcol=0687f5`);
	const label = $derived(`Bandcamp music player for '${title}' by ${artist}`);
</script>

<div class="h-auto w-full place-self-center">
	<div class="bandcamp-wide">
		<iframe
			loading="lazy"
			src="{base}/artwork=small/transparent=true/"
			seamless
			title={label}
		></iframe>
	</div>
	<iframe
		class="bandcamp-narrow"
		loading="lazy"
		src="{base}/transparent=true/"
		seamless
		title={label}
	></iframe>
</div>

<style>
	iframe {
		border: 0;
		width: 100%;
	}
	.bandcamp-wide {
		position: relative;
	}
	.bandcamp-wide iframe {
		display: block;
		height: 120px;
	}
	/* Album players draw their bottom border in #f1f1f1, which vanishes against the page
	 * background, and the iframe can't be styled from here. This line sits over that border, under
	 * the info panel only: Bandcamp's artwork is a 120px square on the left, and the player is at
	 * most 700px wide. Its colour matches the player's other borders. */
	.bandcamp-wide::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 120px;
		width: calc(min(100%, 700px) - 120px);
		height: 1px;
		background: #d2d2d2;
		pointer-events: none;
	}
	.bandcamp-narrow {
		height: 442px;
	}
	@media only screen and (max-width: 767px) {
		.bandcamp-wide {
			display: none;
		}
	}
	@media only screen and (min-width: 768px) {
		.bandcamp-narrow {
			display: none;
		}
	}
</style>
