<script lang="ts">
  import AudioPlayer from '$/components/AudioPlayer.svelte';
  import Top40Charts from '$/components/Top40Charts.svelte';

  export let data;
</script>

<title>Prambors</title>

<main class="flex w-full flex-col items-center bg-background p-8 md:pt-32">
  <section class="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
    <div
      class="group relative z-0 aspect-square w-full rounded-[36px] border-2 border-slate-700 bg-gray-400 p-8"
    >
      <AudioPlayer />
    </div>
    <div
      class="relative z-0 aspect-square w-full rounded-[36px] border-2 border-slate-700 bg-yellowking p-8"
    >
      <Top40Charts data={data.data.items.data} />
    </div>
  </section>
</main>
