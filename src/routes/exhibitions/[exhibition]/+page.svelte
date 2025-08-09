<script lang="ts">
	import { invalidate } from '$app/navigation'
	import * as config from '$lib/config'
	let { data } = $props()

    const loadArtist = () => {
        invalidate('new:artist')
    }
</script>

<svelte:head>
    <meta name="description" content="Sound Praxis: Artists"/>
</svelte:head>

<ul>
	{#each data.artists as artist}
		<li class="mb-2"><a class="text-2xl" href={`artists/${artist.slug}`} onclick={loadArtist}>{artist.name}</a></li>
	{/each}
</ul>
