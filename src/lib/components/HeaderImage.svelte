<script>
	let { header, altText = '', credit } = $props();
</script>

<div class="mb-4">
	<div class="w-full aspect-[864/472] max-h-[600px] overflow-hidden">
		<enhanced:img
			fetchpriority="high"
			class="w-full h-full object-contain"
			sizes="(max-width: 1023px) calc(100vw - 2rem), 864px"
			src={header}
			alt={altText}
		/>
	</div>
	{#if credit}
		<p class="justify-self-center"><small>{credit}</small></p>
	{/if}
</div>

