<script lang="ts">
	import { stateUi } from 'state-shared';
	import { BLACK } from 'constants-shared/colors';
	import { MainContainer } from 'components-layout';
	import { Container, Rectangle, anchorToPivot } from 'pixi-svelte';

	import UiSprite from './UiSprite.svelte';
	import { DESKTOP_BASE_SIZE, DESKTOP_BACKGROUND_WIDTH_LIST } from '../constants';
	import { getContext } from '../context';
	import type { LayoutUiProps } from '../types';

	const props: LayoutUiProps = $props();
	const context = getContext();
</script>

<Container x={20} y={80}>
	{@render props.gameName()}
</Container>

<Container x={context.stateLayoutDerived.canvasSizes().width - 20} y={20} scale={0.4}>
	{@render props.logo()}
</Container>


<MainContainer standard alignVertical="bottom">
	<Container
		x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5}
		y={context.stateLayoutDerived.mainLayoutStandard().height - DESKTOP_BASE_SIZE - 10}
		pivot={anchorToPivot({
			anchor: { x: 0.5, y: 0 },
			sizes: {
				height: DESKTOP_BASE_SIZE,
				width: DESKTOP_BACKGROUND_WIDTH_LIST.reduce((sum, width) => sum + width, 0),
			},
		})}
	>

<UiSprite
	width={DESKTOP_BACKGROUND_WIDTH_LIST.reduce((sum, width) => sum + width, 0)}
	height={DESKTOP_BASE_SIZE}
	x={-DESKTOP_BACKGROUND_WIDTH_LIST.reduce((sum, width) => sum + width, 0) * -0}
	y={0}
	variant="dark"
	state="normal"
	borderRadius={12}
	showBorder={true}
	showShadow={false}
	borderColor="#2563eb"
	borderWidth={2}
	backgroundColor="#000000"
/>

<Container y={DESKTOP_BASE_SIZE * 0.5 - 50} x={840 - 545} scale={.8}>
			{@render props.amountBalance({ stacked: true })}
		</Container>


		<Container y={DESKTOP_BASE_SIZE * .25} x={380 + 520} scale={0.7}>
			{@render props.amountBet({ stacked: true })}
		</Container>
		<Container y={DESKTOP_BASE_SIZE * 0.5} x={90} scale={0.7}>
			{@render props.buttonMenu({ anchor: 0.5 })}
		</Container>

		<Container y={DESKTOP_BASE_SIZE * 0.5} x={80 + 1200} scale={0.7}>
			{@render props.buttonBuyBonus({ anchor: 0.5 })}
		</Container>


		<Container y={DESKTOP_BASE_SIZE * 0.5} x={820 + 150 * 5} scale={1.1}>
			{@render props.buttonBet({ anchor: 0.5 })}
		</Container>

		
		<Container y={DESKTOP_BASE_SIZE * 0.25} x={820 + 120 * 5} scale={0.35}>
			{@render props.buttonAutoSpin({ anchor: 0.5 })}
		</Container>

		<Container y={DESKTOP_BASE_SIZE * 0.75}  x={820 + 120 * 5} scale={0.35}>
			{@render props.buttonTurbo({ anchor: 0.5 })}
		</Container>

		<Container y={DESKTOP_BASE_SIZE * 0.75} x={1700} scale={0.35}>
			{@render props.buttonDecrease({ anchor: 0.5 })}
		</Container>

		<Container y={DESKTOP_BASE_SIZE * 0.25} x={1700} scale={0.35}>
			{@render props.buttonIncrease({ anchor: 0.5 })}
		</Container>
	</Container>
	
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
			x={298}
			y={context.stateLayoutDerived.mainLayoutStandard().height - DESKTOP_BASE_SIZE - 10}
		>
			<Container scale={0.8} y={DESKTOP_BASE_SIZE * 0.5 - 150 - 170 * 3}>
				{@render props.buttonPayTable({ anchor: 0.5 })}
			</Container>

			<Container scale={0.8} y={DESKTOP_BASE_SIZE * 0.5 - 150 - 170 * 2}>
				{@render props.buttonGameRules({ anchor: 0.5 })}
			</Container>

			<Container scale={0.8} y={DESKTOP_BASE_SIZE * 0.5 - 150 - 170 * 1}>
				{@render props.buttonSettings({ anchor: 0.5 })}
			</Container>

			<Container scale={0.8} y={DESKTOP_BASE_SIZE * 0.5 - 150}>
				{@render props.buttonSoundSwitch({ anchor: 0.5 })}
			</Container>

			<Container scale={0.8} y={DESKTOP_BASE_SIZE * 0.5}>
				{@render props.buttonMenuClose({ anchor: 0.5 })}
			</Container>
		</Container>
	</MainContainer>
{/if}