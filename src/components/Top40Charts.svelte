<script lang="ts">
  import type { Top40Response } from '$/routes/+page';

  export let data: Top40Response['data']['items']['data'];
</script>

<section class="flex h-full w-full flex-col items-center justify-center">
  {#if data == null}
    <div class="flex h-full w-full items-center justify-center">Loading...</div>
  {:else}
    <header
      class="mb-4 grid w-full grid-cols-[1fr_1fr_50%_1fr_1fr] items-center justify-center px-2"
    >
      <div class="flex items-center justify-center text-sm font-bold">#</div>
      <div class="col-span-2 flex items-center text-sm font-bold uppercase">Song</div>
      <div class="flex items-center justify-center text-sm font-bold uppercase">📊</div>
      <div class="flex items-center justify-center text-sm font-bold uppercase">#wk</div>
    </header>
    {#each data.slice(0, 5) as song, index (song.imageAlbum)}
      {@const diff = song.lastWeek - (index + 1)}
      <a
        href={song.youtubeLink}
        target="_blank"
        rel="noopener noreferrer"
        class="group relative grid h-full w-full grid-cols-[1fr_1fr_50%_1fr_1fr] items-center justify-center px-2"
      >
        <div class="flex items-center justify-center text-2xl font-bold">{index + 1}</div>
        <div class="flex items-center justify-center">
          <img
            alt={song.title}
            src={`https://cdn06.pramborsfm.com/storage/app/media${song.imageAlbum}`}
            class="rounded-lg border border-gray-500"
          />
          <div
            class="align-absolute pointer-events-none absolute z-10 flex h-full w-full items-center justify-center rounded-xl bg-red-700/80 opacity-0 transition duration-500 group-hover:opacity-100"
          >
            <span class="z-10 text-lg font-bold text-white">YouTube ↗</span>
          </div>
        </div>
        <div class="flex flex-col justify-center px-3">
          <div class="line-clamp-1 text-lg font-bold">{song.title}</div>
          <div class="text-xs">{song.artist}</div>
        </div>
        <div class="flex items-center justify-center">
          {#if diff === 0}
            <span class="font-semibold text-gray-600">↔</span>
          {:else if diff > 0}
            <span class="font-semibold text-green-700">↑ {diff}</span>
          {:else}
            <span class="font-semibold text-red-700">↓ {diff}</span>
          {/if}
        </div>
        <div class="flex items-center justify-center font-semibold">{song.duration}</div>
      </a>
    {/each}
  {/if}
</section>
