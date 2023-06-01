<script lang="ts">
	import { PlayerProvider } from 'headless-audioplayer-svelte';
	import { writable } from 'svelte/store';

	import AudioPlayer from '$/components/AudioPlayer.svelte';
	import Top40Charts from '$/components/Top40Charts.svelte';
	import { PRAMBORS_STREAM_MP3_URL } from '$/constants/url.js';

	export let data;

	let src = writable(PRAMBORS_STREAM_MP3_URL);
</script>

<title>Prambors</title>

<main class="flex w-full flex-col items-center bg-background p-8 md:pt-32">
	<section class="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
		<div
			class="group relative z-0 aspect-square w-full rounded-[36px] border-2 border-slate-700 bg-gray-400 p-8"
		>
			<PlayerProvider {src}>
				<AudioPlayer />
			</PlayerProvider>
		</div>
		<div
			class="relative z-0 aspect-square w-full rounded-[36px] border-2 border-slate-700 bg-yellowking p-8"
		>
			<Top40Charts data={data.data.items.data} />
		</div>
	</section>
</main>
