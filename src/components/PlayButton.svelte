<script lang="ts">
  import PauseIcon from '$/icons/PauseIcon.svelte';
  import PlayIcon from '$/icons/PlayIcon.svelte';

  export let togglePlay: () => void;
  export let isPlaying: boolean;
</script>

<button
  type="button"
  on:click={togglePlay}
  class="align-absolute absolute z-20 flex aspect-square w-[100px] items-center justify-center rounded-full bg-gray-100 bg-opacity-75 transition duration-500 hover:scale-125"
>
  {#if isPlaying}
    <PauseIcon class="aspect-square w-full text-gray-900" />
  {:else}
    <PlayIcon class="aspect-square w-full text-gray-900" />
  {/if}
</button>
