<script lang="ts">
	// Full-size play button laid over a video poster. Shared by the Bunny and YouTube embeds so
	// both facades look and behave the same.
	let { label, onclick }: { label: string; onclick: () => void } = $props();
</script>

<button
	type="button"
	aria-label="Play video: {label}"
	{onclick}
	class="group absolute inset-0 grid size-full cursor-pointer place-items-center border-0 bg-black/25 p-0 transition-colors hover:bg-black/10 focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-[var(--link-color)]"
>
	<svg width="72" height="72" viewBox="0 0 64 64" aria-hidden="true" class="drop-shadow-md">
		<circle cx="32" cy="32" r="32" fill="rgba(0,0,0,0.6)" />
		<path
			d="M26 20 L46 32 L26 44 Z"
			fill="white"
			class="transition-colors group-hover:fill-[var(--link-color)]"
		/>
	</svg>
</button>
