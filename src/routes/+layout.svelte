<script lang="ts">
	import '../app.css'
	import { title } from '$lib/config'
	import { page } from '$app/state'
	let { children } = $props()
</script>

<svelte:head>
	<title>Sound Praxis</title>
    <script defer src="https://cloud.umami.is/script.js" data-website-id="32fe38b6-b601-4484-ae02-4fb4bb9e7893"></script>
</svelte:head>

<div
	class="w-sm justify-self-center pt-2 sm:w-xl sm:pt-8 md:w-2xl md:p-12 lg:w-4xl lg:p-24 xl:w-6xl"
>
	<div id="title">
		<h1><a href="/"><strong>{title}</strong></a><br /></h1>
	</div>
	<div id="nav" class="grid auto-cols-fr grid-flow-col gap-4">
		<h2><a href="/" class={page.url.pathname === '/' ? 'accent' : ''}>About</a></h2>
		<h2>
			<a href="/events" class={page.url.pathname.includes('/events') ? 'accent' : ''}>Events</a>
		</h2>
		<h2>
			<a href="/artists" class={page.url.pathname.includes('/artists') ? 'accent' : ''}>Artists</a>
		</h2>
	</div>
	{@render children()}
</div>

<style lang="postcss">
	:global(body) {
		--bg-color: #251d1e;
		--font-color: white;
		--link-color: #899c22;
		--accent-color: #fbab25;
		background-color: var(--bg-color);
		font-family: 'JetBrains Mono', monospace;
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
