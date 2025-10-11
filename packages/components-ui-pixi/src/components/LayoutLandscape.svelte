<script lang="ts">
	import { stateUi } from 'state-shared';
	import { BLACK } from 'constants-shared/colors';
	import { MainContainer } from 'components-layout';
	import { Container, Rectangle, anchorToPivot } from 'pixi-svelte';

	import UiSprite from './UiSprite.svelte';
	import { LANDSCAPE_BASE_SIZE, LANDSCAPE_BACKGROUND_WIDTH_LIST } from '../constants';
	import type { LayoutUiProps } from '../types';
	import { getContext } from '../context';

	const props: LayoutUiProps = $props();
	const context = getContext();
</script>




<MainContainer standard alignVertical="bottom">
	<Container
		x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5}
		y={context.stateLayoutDerived.mainLayoutStandard().height - LANDSCAPE_BASE_SIZE - 40}
		pivot={anchorToPivot({
			anchor: { x: 0.5, y: 0 },
			sizes: {
				height: LANDSCAPE_BASE_SIZE,
				width: LANDSCAPE_BACKGROUND_WIDTH_LIST.reduce((sum, width) => sum + width, 0),
			},
		})}
	>


		    <!-- Add background rectangle behind all buttons -->
        <UiSprite
            width={LANDSCAPE_BACKGROUND_WIDTH_LIST.reduce((sum, width) => sum + width, 0)}
            height={LANDSCAPE_BASE_SIZE}
            x={-LANDSCAPE_BACKGROUND_WIDTH_LIST.reduce((sum, width) => sum + width, 0) * 0}
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


		<Container y={LANDSCAPE_BASE_SIZE * +0.2} x={560} scale={1}>
			{@render props.amountBalance({ stacked: true })}
		</Container>

		<Container y={LANDSCAPE_BASE_SIZE * -2.5 + 495} x={85 + 20} scale={0.8}>
			{@render props.buttonMenu({ anchor: 0.5 })}
		</Container>

		<Container y={LANDSCAPE_BASE_SIZE * -2.5 + 495} x={270 + 20} scale={0.8}>
			{@render props.buttonBuyBonus({ anchor: 0.5 })}
		</Container>





		<Container y={LANDSCAPE_BASE_SIZE * -2.5 + 460} x={948} scale={0.75}>
			{@render props.amountBet({ stacked: true })}
		</Container>

		<Container  y={LANDSCAPE_BASE_SIZE * -2.5 + 494} x={840} scale={0.35}>
			{@render props.buttonDecrease({ anchor: 0.5 })}
		</Container>

		<Container  y={LANDSCAPE_BASE_SIZE * -2.5 + 494} x={1055} scale={0.35}>
			{@render props.buttonIncrease({ anchor: 0.5 })}
		</Container>
	</Container>

	<Container
		x={context.stateLayoutDerived.mainLayoutStandard().width - 660}
		y={context.stateLayoutDerived.mainLayoutStandard().height * .88}
		pivot={anchorToPivot({
			anchor: { x: 1, y: 0.5 },
			sizes: {
				height: LANDSCAPE_BASE_SIZE,
				width: LANDSCAPE_BASE_SIZE,
			},
		})}
	>
		

		<Container x={LANDSCAPE_BASE_SIZE * -2.5 + 1045} y={LANDSCAPE_BASE_SIZE * 0.5} scale={0.8}>
			{@render props.buttonBet({ anchor: 0.5 })}
		</Container>

		<Container x={LANDSCAPE_BASE_SIZE * -2.5 + 845} y={LANDSCAPE_BASE_SIZE * -.35 + 140} scale={0.5}>
			{@render props.buttonAutoSpin({ anchor: 0.5 })}
		</Container>

		<Container x={LANDSCAPE_BASE_SIZE *  -2.5 + 695} y={LANDSCAPE_BASE_SIZE * -.35 + 140} scale={0.5}>
			{@render props.buttonTurbo({ anchor: 0.5 })}
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
			x={165}
			y={context.stateLayoutDerived.mainLayoutStandard().height - LANDSCAPE_BASE_SIZE - 130}
		>
			<Container scale={0.8} y={LANDSCAPE_BASE_SIZE * 0.5 - 150 - 170 * 3}>
				{@render props.buttonPayTable({ anchor: 0.5 })}
			</Container>

			<Container scale={0.8} y={LANDSCAPE_BASE_SIZE * 0.5 - 150 - 170 * 2}>
				{@render props.buttonGameRules({ anchor: 0.5 })}
			</Container>

			<Container scale={0.8} y={LANDSCAPE_BASE_SIZE * 0.5 - 150 - 170 * 1}>
				{@render props.buttonSettings({ anchor: 0.5 })}
			</Container>

			<Container scale={0.8} y={LANDSCAPE_BASE_SIZE * 0.5 - 150}>
				{@render props.buttonSoundSwitch({ anchor: 0.5 })}
			</Container>

			<Container scale={1} y={LANDSCAPE_BASE_SIZE * 0.5}>
				{@render props.buttonMenuClose({ anchor: 0.5 })}
			</Container>
		</Container>
	</MainContainer>
{/if}
