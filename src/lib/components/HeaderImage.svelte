<script>
	let { header, altText = '', credit } = $props();
</script>

<div class="mb-4 h-200px">
	<enhanced:img
		fetchpriority="high"
		class="place-self-center w-auto object-contain sm:max-h-[300px] md:max-h-[400px] lg:max-h-[600px] xl:max-h-[600px] 2xl:max-h-[600px]"
        sizes="(max-width: 640px) 504, (max-width: 768px) 600px, (max-width: 960px) 672px, (max-width: 1536px) 960px"
        src={header}
		alt={altText}
	/>
	{#if credit}
		<p class="justify-self-center"><small>{credit}</small></p>
	{/if}
</div>
