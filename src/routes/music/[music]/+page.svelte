<script lang="ts">
	import { onMount } from 'svelte'
	let { data } = $props()
	let artist = data.meta
    console.log(artist)
	let image = $state('')
</script>

<svelte:head>
    <meta name="description" content="Sound Praxis: {artist.name}"/>
</svelte:head>

<div>

</div>

<style>
</style>
