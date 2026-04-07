<script>
	let { header, altText = '', credit } = $props();
</script>

<div class="mb-4 h-200px">
	<enhanced:img
		fetchpriority="high"
		class="place-self-center w-auto object-contain sm:max-h-[300px] md:max-h-[400px] lg:max-h-[600px] xl:max-h-[600px] 2xl:max-h-[600px]"
        sizes="(max-width:1024px) 864px, (max-width:960px) 672px"
        src={header}
		alt={altText}
	/>
	{#if credit}
		<p class="justify-self-center"><small>{credit}</small></p>
	{/if}
</div>

