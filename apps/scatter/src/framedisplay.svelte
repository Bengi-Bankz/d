<script lang="ts">
  // Props: frameKeys (array of keys to animate), x, y, width, height, fps
  export let frameKeys: string[] = [];
  export let x: number = 0;
  export let y: number = 0;
  export let width: number = 200;
  export let height: number = 250;
  export let fps: number = 24;
  export let scale: number = 3;

  import { Sprite } from 'pixi-svelte';
  import { onDestroy } from 'svelte';

  let currentFrameIndex = 0;
  let direction = 1; // 1 = forward, -1 = backward
  let interval: any;
  let pauseTimeout: any;

  $: currentKey = frameKeys.length > 0 ? frameKeys[currentFrameIndex] : '';

  function animateBidirectional() {
    stopAnimation();
    interval = setInterval(() => {
      currentFrameIndex += direction;
      if (currentFrameIndex === frameKeys.length - 1) {
        direction = -1;
        pauseAtEnd();
      } else if (currentFrameIndex === 0 && direction === -1) {
        direction = 1;
        pauseAtEnd();
      }
    }, 1000 / fps);
  }

  function pauseAtEnd() {
    stopAnimation();
    pauseTimeout = setTimeout(() => {
      animateBidirectional();
    }, 180000); // 3 minutes
  }

  function stopAnimation() {
    if (interval) clearInterval(interval);
    interval = null;
    if (pauseTimeout) clearTimeout(pauseTimeout);
    pauseTimeout = null;
  }

  // Start animation if frameKeys provided
  $: {
    stopAnimation();
    if (frameKeys.length > 1) {
      currentFrameIndex = 0;
      direction = 1;
      animateBidirectional();
    }
  }

  onDestroy(stopAnimation);
</script>

{#if currentKey}
  <Sprite
    key={currentKey}
    x={x}
    y={y}
    width={width}
    height={height}
    scale={scale}
  />
{:else}
  <div>No frame to display</div>
{/if}
