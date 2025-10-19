<script lang="ts">
	import { Text } from 'pixi-svelte';
	import { WHITE } from 'constants-shared/colors';

	import UiSprite from './UiSprite.svelte';
	import { UI_BASE_FONT_SIZE } from '../constants';

	import { Graphics } from 'pixi-svelte';

	type Props = {
		label: string;
		value: string;
		tiled?: boolean;
		stacked?: boolean;
		glowVariant?: 'glow-green' | 'glow-blue' | 'glow-purple' | 'glow-orange' | 'glow-pink' | 'dark';
		state?: 'normal' | 'hover' | 'pressed' | 'disabled';
		small?: boolean;
		spriteKey?: string; // key for background sprite
	};

	const props: Props = $props();

	const labelStyle = {
		fontFamily: 'Bangers-Regular',
		fontSize: props.small ? UI_BASE_FONT_SIZE * 0.6 : UI_BASE_FONT_SIZE,
		fill: WHITE,
	} as const;

	const valueStyle = {
		fontFamily: 'Bangers-Regular',
		fontSize: props.small ? UI_BASE_FONT_SIZE * 0.5 : UI_BASE_FONT_SIZE * 0.9,
		fill: WHITE,
	} as const;

	import { onMount } from 'svelte';
	import * as PIXI from 'pixi.js';

	let padding = 32;

	function measureText(text: string, style: any) {
		const temp = new PIXI.Text(text, style);
		return temp.width;
	}

	const labelWidth = $derived(() => measureText(props.label, labelStyle));
	const valueWidth = $derived(() => measureText(props.value, valueStyle));
	const totalWidth = $derived(() => labelWidth() + valueWidth() + padding);
</script>

{#if props.stacked}
	<Graphics
		y={-20}
		draw={(g) => {
			g.clear();
			g.fill({ color: 0x222222, alpha: 0.85 });
			g.roundRect(-totalWidth()/2, 0, totalWidth(), props.small ? 40 : 60, 18);
		}}
	/>
	<Text anchor={{ x: 0.5, y: 0 }} text={props.label} style={labelStyle} x={-valueWidth()/2} />
	<Text anchor={{ x: 0.5, y: 0 }} text={props.value} style={valueStyle} x={labelWidth()/2} y={UI_BASE_FONT_SIZE * (props.small ? 0.7 : 1)} />
{:else}
	<Graphics
		x={-90}
		draw={(g) => {
			g.clear();
			g.fill({ color: 0x222222, alpha: 0.85 });
			g.roundRect(0, -30, totalWidth(), props.small ? 40 : 60, 18);
		}}
	/>
	<Text anchor={{ x: 0, y: 0.5 }} text={props.label} style={labelStyle} x={0} />
	<Text
		anchor={{ x: 1, y: 0.5 }}
		text={props.value}
		style={valueStyle}
		x={totalWidth()}
	/>
{/if}
