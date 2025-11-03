<script lang="ts">
  export let metadata: any;
  import { page } from '$app/stores'; // or pass isArtistPage in
  const isArtistPage = $page.url.pathname === `/${metadata.category}/${metadata.slug}`;
</script>

<h2>
  {#if metadata.artist_link}
    <a href={metadata.artist_link} target="_blank" rel="noopener">{metadata.artist}</a>
  {:else if !isArtistPage}
    <a href={`/${metadata.category}/${metadata.slug}`}>{metadata.artist}</a>
  {:else if metadata.artist !== 'Jonathan Piper'}
    {metadata.artist}
  {/if}
  {#if metadata.title}
    {#if metadata.artist && metadata.artist !== 'Jonathan Piper'}{" — "}{/if}<em>{metadata.title}</em>
  {/if}
</h2>