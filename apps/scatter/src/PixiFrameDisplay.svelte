<script lang="ts">
  import { AnimatedSprite } from 'pixi-svelte';
  export let textures: any[] = [];
  export let animationSpeed: number = 0.4; // PixiJS default is 0.1, 0.4 ~ 24fps
  export let loop: boolean = true;
  export let play: boolean = true;
  export let x: number = 0;
  export let y: number = 0;
  export let width: number = 200;
  export let height: number = 250;
</script>

<AnimatedSprite
  {textures}
  {animationSpeed}
  {loop}
  {play}
  x={x}
  y={y}
  width={width}
  height={height}
/>
