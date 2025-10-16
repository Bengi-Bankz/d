<script lang="ts">
	import { stateUi } from 'state-shared';
	import { BLACK } from 'constants-shared/colors';
	import { MainContainer } from 'components-layout';
	import { Container, Rectangle } from 'pixi-svelte';

	import UiSprite from './UiSprite.svelte';
	import LabelFreeSpinCounter from './LabelFreeSpinCounter.svelte';
	import type { LayoutUiProps } from '../types';
	import { getContext } from '../context';

	const props: LayoutUiProps = $props();
	const context = getContext();
</script>

<Container x={20} scale={0.8}>
	{@render props.gameName()}
</Container>

<MainContainer standard alignVertical="bottom">

	<Container
		x={context.stateLayoutDerived.canvasSizes().width - 160}
		y={1620}
		scale={1.2}
	>
		{@render props.amountBalance({ stacked: true })}
	</Container>

	<Container
		x={context.stateLayoutDerived.canvasSizes().width + 190}
		y={1620}
		scale={1.2}
	>
		{@render props.amountBet({ stacked: true })}
	</Container>

	<!-- Full-width background behind all UI buttons -->
	<UiSprite
		x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5}
		y={context.stateLayoutDerived.mainLayoutStandard().height - 200}
		width={context.stateLayoutDerived.mainLayoutStandard().width}
		height={300}
		anchor={0.5}
		variant="dark"
		state="normal"
		borderRadius={12}
		showBorder={true}
		showShadow={false}
		borderColor="#2563eb"
		borderWidth={2}
		backgroundColor="#000000"
		zIndex={-1}
	/>
	
	<Container
		x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5 - 440}
		y={context.stateLayoutDerived.mainLayoutStandard().height - 160}
	>
		{@render props.buttonMenu({ anchor: 0.5 })}
	</Container>

	<Container
		x={context.stateLayoutDerived.mainLayoutStandard().width * -.15 + 440}
		y={context.stateLayoutDerived.mainLayoutStandard().height - 160}
	>
		{@render props.buttonBuyBonus({ anchor: 0.5 })}
	</Container>

	<Container
		x={context.stateLayoutDerived.mainLayoutStandard().width * 0.81}
		y={context.stateLayoutDerived.mainLayoutStandard().height - 160}
		scale={1.5}
	>
		{@render props.buttonBet({ anchor: 0.5 })}
	</Container>

<Container
    x={context.stateLayoutDerived.mainLayoutStandard().width * 0.38 + 8}
    y={context.stateLayoutDerived.mainLayoutStandard().height - 197}
    scale={1}
>
    {@render props.buttonAutoSpin({ anchor: 0.25 })}
</Container>

<Container
    x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5 + 2}
    y={context.stateLayoutDerived.mainLayoutStandard().height - 270}
    scale={1}  
>
    {@render props.buttonTurbo({ anchor: -.25 })}
</Container>



</MainContainer>

<MainContainer standard alignVertical="bottom">
	{#if stateUi.freeSpinCounterShow}
		<Container
			x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5}
			y={context.stateLayoutDerived.mainLayoutStandard().height - 130}
		>
			<LabelFreeSpinCounter stacked />
		</Container>
	{:else}

<Container
    x={context.stateLayoutDerived.mainLayoutStandard().width * 0.96 }
    y={context.stateLayoutDerived.mainLayoutStandard().height - 105}
    scale={0.45}  
>
    {@render props.buttonDecrease({ anchor: 0.5 })}
</Container>

<Container
    x={context.stateLayoutDerived.mainLayoutStandard().width * 0.96}
    y={context.stateLayoutDerived.mainLayoutStandard().height - 185}
    scale={0.45}
>
    {@render props.buttonIncrease({ anchor: 0.5 })}
</Container>
	{/if}

</MainContainer>

{#if stateUi.menuOpen}
	<Rectangle
		eventMode="static"
		cursor="pointer"
		alpha={0.5}
		anchor={0.5}
		backgroundColor={BLACK}
		width={context.stateLayoutDerived.canvasSizes().width}
		height={context.stateLayoutDerived.canvasSizes().height}
		x={context.stateLayoutDerived.canvasSizes().width * 0.5}
		y={context.stateLayoutDerived.canvasSizes().height * 0.5}
		onpointerup={() => (stateUi.menuOpen = false)}
	/>

	<MainContainer standard alignVertical="bottom">
		<Container
			x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5 - 350}
			y={context.stateLayoutDerived.mainLayoutStandard().height - 110}
		>
			<Container y={-190 - 210 * 3}>
				{@render props.buttonPayTable({ anchor: 0.5 })}
			</Container>

			<Container y={-190 - 210 * 2}>
				{@render props.buttonGameRules({ anchor: 0.5 })}
			</Container>

			<Container y={-190 - 210 * 1}>
				{@render props.buttonSettings({ anchor: 0.5 })}
			</Container>

			<Container y={-190}>
				{@render props.buttonSoundSwitch({ anchor: 0.5 })}
			</Container>

			<Container>
				{@render props.buttonMenuClose({ anchor: 0.5 })}
			</Container>
		</Container>
	</MainContainer>
{/if}
