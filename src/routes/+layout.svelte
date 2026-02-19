<script lang="ts">
	export const prerender = true;
	import './layout.css';
	import type { PageProps } from './types';
	import type { MenuItem } from '$lib/types';
	import { invalidateAll, onNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import '../app.css';
	import { title } from '$lib/config';
	import { page } from '$app/state';

	let { children, data } = $props();

	onMount(() => {
		const anchors = document.getElementsByTagName('a');

		for (let anchor of anchors) {
			anchor.setAttribute('data-sveltekit-reload', '');
		}
	});
</script>

<svelte:head>
	<title>Jonathan Piper</title>

	<script
		defer
		src="https://cloud.umami.is/script.js"
		data-website-id="6c829863-ffa5-429f-bb56-af1d62b3d6af"
	></script>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<div
	class="w-sm justify-self-center pt-2 sm:w-xl sm:pt-8 md:w-2xl md:py-12 lg:w-4xl lg:py-24 xl:w-6xl"
>
	<div id="title">
		<h1><a href="/"><strong>{title}</strong></a><br /></h1>
	</div>

	<div id="nav" class="flex max-w-full flex-wrap gap-x-8 gap-y-0">
		{#each data.pages as menuItem}
			<h2>
				<a
					href={`/${menuItem.slug}`}
					class={page.url.pathname === `/${menuItem.slug}` ? 'accent' : ''}
					data-sveltekit-reload
				>
					{menuItem.title}
				</a>
			</h2>
		{/each}
	</div>

	{@render children()}
</div>

<style lang="postcss">
	:global(body) {
		--bg-color: #eeeef0;
		--font-color: rgb(29, 29, 29);
		--link-color: #b65b01;
		--accent-color: #5025fb;
		background-color: var(--bg-color);
		font-family: 'JetBrains Mono', monospace;
		font-display: swap;
	}

	:global(h1) {
		font-size: 2rem;
		font-weight: 500;
		margin-bottom: 0.5rem;
		color: var(--font-color);
	}

	:global(.accent) {
		color: var(--accent-color);
	}

	:global(strong) {
		color: var(--accent-color);
	}

	:global(a) {
		color: var(--link-color);
	}

	:global(h2) {
		font-size: 1.6rem;
		font-weight: 500;
		margin-bottom: 1rem;
		color: var(--font-color);
	}

	:global(h3) {
		font-size: 1.2rem;
		font-weight: 500;
		margin-bottom: 0.5rem;
		color: var(--font-color);
	}

	:global(p) {
		color: var(--font-color);
		line-height: 1.75;
	}

	:global(li) {
		color: var(--font-color);
		line-height: 1.75;
	}

	:global(p:not(li p)) {
		margin-bottom: 10px;
	}

	:global(a) {
		color: var(--link-color);
	}

	:global(hr) {
		color: var(--font-color);
		opacity: 0.5;
		width: 80%;
		margin: 16px auto 20px auto;
	}

	:global(li):not(:last-child) {
		margin-bottom: 8px;
	}

	@font-face {
		font-family: 'JetBrains Mono';
		font-style: monospace;
		font-weight: 500;
		font-style: normal;
		src:
			local(''),
			url('/fonts/JetBrainsMono-Regular.woff2?#iefix') format('woff2');
	}

	@font-face {
		font-family: 'JetBrains Mono';
		font-style: monospace;
		font-weight: 700;
		font-style: normal;
		src:
			local(''),
			url('/fonts/JetBrainsMono-Bold.woff2?#iefix') format('woff2');
	}

	@font-face {
		font-family: 'JetBrains Mono';
		font-style: monospace;
		font-weight: 500;
		font-style: italic;
		src:
			local(''),
			url('/fonts/JetBrainsMono-Italic.woff2?#iefix') format('woff2');
	}
</style>
