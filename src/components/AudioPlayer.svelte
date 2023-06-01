<script lang="ts">
	import { type PlayerContextProps } from 'headless-audioplayer-svelte';
	import { getContext } from 'svelte';

	import useQueryAlbumArt from '$/hooks/useQueryAlbumArt';
	import useQueryNowPlaying from '$/hooks/useQueryNowPlaying';

	import PlayButton from './PlayButton.svelte';

	const nowPlaying = useQueryNowPlaying();
	$: albumArt = useQueryAlbumArt({
		song: $nowPlaying.data?.cue_title,
		artist: $nowPlaying.data?.track_artist_name
	});

	const { togglePlay } = getContext<PlayerContextProps>('playerContext');

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === ' ') {
			event.preventDefault();
			togglePlay();
		}
	};
</script>

<svelte:window on:keydown={handleKeyDown} />

{#if $nowPlaying.isLoading || $albumArt.isLoading}
	<div class="flex h-full w-full items-center justify-center">Loading...</div>
{:else}
	<div
		class="absolute left-1/2 top-8 flex -translate-x-1/2 flex-row justify-between md:left-8 md:translate-x-0"
	>
		<div
			class="w-max rounded-full border-2 border-gray-700 bg-red-700 px-4 py-1 text-sm font-semibold uppercase text-white"
		>
			<span class="animate-pulse">Live •</span>
		</div>
	</div>

	<div
		class="absolute bottom-8 right-1/2 flex translate-x-1/2 flex-row md:right-8 md:translate-x-0"
	>
		<div
			class="w-max rounded-full border-2 border-gray-700 bg-gray-100 px-4 py-1 text-sm font-semibold uppercase text-gray-800"
		>
			{#if $nowPlaying.isLoading}
				Loading...
			{:else}
				▶ {$nowPlaying.data.track_artist_name} - {$nowPlaying.data.cue_title}
			{/if}
		</div>
	</div>

	<img
		src={$albumArt.data?.url ?? ''}
		alt={$nowPlaying.data?.cue_title}
		class="align-absolute pointer-events-none absolute -z-10 h-full w-full select-none rounded-[34px] text-[0] opacity-50"
	/>
	<section class="flex h-full w-full items-center justify-center px-3">
		<div
			class="relative flex h-full w-full items-center justify-center rounded-full drop-shadow-[3px_3px_0_#cecece] transition duration-500 group-hover:drop-shadow-[0px_6px_40px_#cecece]"
		>
			<img
				src={$albumArt.data?.url ?? ''}
				alt={$nowPlaying.data?.cue_title}
				class="animate-spin-cd pointer-events-none aspect-square w-2/3 select-none rounded-full border border-black text-[0]"
			/>
			<PlayButton />
		</div>
	</section>
{/if}

<style>
	@keyframes spin-cd {
		to {
			transform: rotate(-360deg);
		}
	}
	.animate-spin-cd {
		animation: spin-cd 10s linear infinite;
	}
</style>
