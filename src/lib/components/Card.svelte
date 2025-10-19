<script>
	let { children } = $props();
</script>

<div class="border border-gray-300 bg-gray-100 p-8 shadow-[8px_8px_0_0_rgba(0,0,0,.25)]">
		{@render children()}
</div>
