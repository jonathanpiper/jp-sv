<script lang="ts">
	let { embed_code, title, artist, link, caption, artist_link, isPost, category, slug, date } =
		$props();
	import { formatDate } from '$lib/index';
	let header = artist_link
		? `<a href="${artist_link}" target="_blank">${artist}</a>`
		: artist !== 'Jonathan Piper'
			? `<a href="/${category}/${slug}">${artist}</a>`
			: '';
	if (header.length > 0 && title) header += ' - ';
	if (title) header += isPost ? `<a href="/${category}/${slug}">${title}</a>` : `${title}`;
</script>

<div class="flex flex-col gap-1">
	<div class="mb-2 flex flex-row justify-between border-b border-gray-300">
		<div>
			<h3>
				<a href="/{category}/{slug}">
					{#if artist && artist !== 'Jonathan Piper'}
						{artist}
					{/if}
					{#if artist && artist !== 'Jonathan Piper' && title}
						{@html ' - '}
					{/if}
					{#if title}
						<em>
							{title}
						</em>
					{/if}
				</a>
			</h3>
		</div>
		{#if date}<span class="text-gray-500">{formatDate(date)}</span>{/if}
	</div>
	{#if caption}<div>{@html caption}</div>{/if}
</div>

<style>
	span {
		font-style: normal;
		text-decoration: none;
		color: black !important;
	}
</style>
