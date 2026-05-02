<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Error | Jonathan Piper</title>
</svelte:head>

<div>
	<h2>{page.status}: {page.error?.message ?? 'Something went wrong'}</h2>
	<p><a href="/">Return home</a></p>
</div>
