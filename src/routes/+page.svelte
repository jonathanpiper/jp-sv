<script lang="ts">
	import { onMount } from 'svelte'
	let { data } = $props()
	console.log(data)
	const metadata = data.metadata
	let header = $state('')
</script>

<svelte:head>
	<meta
		name="description"
	/>
</svelte:head>

<div class="text-lg">
	{#if header}
		<div class="mb-4">
			<enhanced:img
				class="w-[100%] place-self-center object-contain sm:max-h-[300px] sm:max-w-full md:max-h-[400px] md:max-w-full"
				src={header}
				alt={metadata.images.header.altText}
			/>
			{#if metadata.images.header.credit}
				<p class="justify-self-center"><small>{metadata.images.header.credit}</small></p>
			{/if}
		</div>
	{/if}
	{#if data?.upcomingEvents && data?.upcomingEvents.length > 0}
		<h1 class="accent">Upcoming Events</h1>
		<ul>
			{#each data.upcomingEvents as event}
				<li class="mb-4">
					<div class="grid grid-flow-col grid-cols-[100px_1fr] gap-4">
						<div id="event-image" class="align-items-center grid">
							{#if event.poster && posters}
								<a href={`events/${event.slug}`} aria-label={`View details for ${event.title}`}
									><enhanced:img
										class="event-image max-h-24"
										src={posters[`/src/images/${event.poster}`]}
										alt={`${event.description} poster`}
									/></a
								>
							{/if}
						</div>
						<div id="event-info">
							<a
								class="text-2xl"
								href={`events/${event.slug}`}
								aria-label={`View details for ${event.title}`}>{event.title} | {event.date}</a
							>
							<p>
								{#each event.artists as artist, i}
									{#if typeof artist === 'string'}
										{artist}
									{:else if Array.isArray(artist)}
										{#each artist as member, i}
											{member}{i !== artist.length - 1 ? ', ' : ''}
										{/each}
									{:else}
										{artist.name}
									{/if}
									{i !== event.artists.length - 1 ? ' | ' : ''}{/each}
							</p>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	{/if}
	<!-- <data.content /> -->
</div>
