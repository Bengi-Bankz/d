<script lang="ts">
	import { Rectangle, SpineProvider, SpineTrack, Sprite } from 'pixi-svelte';
	import { FadeContainer } from 'components-pixi';
	import { SECOND } from 'constants-shared/time';

	import { getContext } from '../game/context';


	const context = getContext();
	const backgroundProps = $derived({
		width: context.stateLayoutDerived.canvasSizes().width + 100,
		height: context.stateLayoutDerived.canvasSizes().height,
		anchor: 0,
		x: -100,
		y: 0,
	});

	// Manual switch for testing backgrounds
	let manualBgKey = $state('bg');
	const bgKeys = ['bg', 'bg2', 'bg3', 'bg4'];
	import { scatterLandedThisRound } from '../stores/scatterLandedThisRound';

	const showBaseBackground = $derived(context.stateGame.gameType === 'basegame');
	const showFeatureBackground = $derived(context.stateGame.gameType === 'freeSpins');

	const bonusBgIndex = $derived(() => {
		if (!showFeatureBackground) return 1;
		if ($scatterLandedThisRound === 4) return 2;
		if ($scatterLandedThisRound === 5) return 3;
		if ($scatterLandedThisRound >= 6) return 4;
		return 1;
	});

	const bgKey = $derived(() => {
		const idx = bonusBgIndex();
		if (!showFeatureBackground) return 'bg';
		if (idx === 2) return 'bg2';
		if (idx === 3) return 'bg3';
		if (idx === 4) return 'bg4';
		return 'bg';
	});
</script>


<Rectangle {...context.stateLayoutDerived.canvasSizes()} backgroundColor={0x000000} zIndex={-3} />

<!-- Render our own background sprite, keeping resizing functionality -->
<!-- Render background sprite based on index -->



<!-- Layer all backgrounds, only one is visible (opacity 1) -->
{#each bgKeys as key}
	<Sprite
		{...backgroundProps}
		key={key}
		zIndex={manualBgKey === key ? -2 : -3}
	/>
{/each}

<!-- Manual switch UI for testing -->
<div style="position: absolute; top: 10px; left: 10px; z-index: 1000; background: rgba(0,0,0,0.5); padding: 8px; border-radius: 6px;">
	<label for="bg-switch" style="color: white; font-weight: bold;">Background Switch:</label>
	<div id="bg-switch">
		{#each bgKeys as key}
			<button
				style="margin: 0 4px; padding: 4px 8px; border-radius: 4px; border: none; background: {manualBgKey === key ? '#ffa500' : '#444'}; color: white; cursor: pointer;"
				onclick={() => manualBgKey = key}
			>{key}</button>
		{/each}
	</div>
</div>
