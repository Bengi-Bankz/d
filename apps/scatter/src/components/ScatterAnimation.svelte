<script lang="ts">
  import { Sprite } from 'pixi-svelte';
  import { onMount } from 'svelte';

  export let assetKeys: string[] = [];
  export let frameRate: number = 8; // frames per second
  export let x: number = 0;
  export let y: number = 0;
  export let width: number = 120;
  export let height: number = 120;

  let currentFrame = 0;
  let interval: ReturnType<typeof setInterval>;

  onMount(() => {
    interval = setInterval(() => {
      currentFrame = (currentFrame + 1) % assetKeys.length;
    }, 1000 / frameRate);
    return () => clearInterval(interval);
  });
</script>

{#if assetKeys.length > 0}
  <Sprite
    x={x}
    y={y}
    anchor={0.5}
    key={assetKeys[currentFrame]}
    width={width}
    height={height}
  />
{/if}
