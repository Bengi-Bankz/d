<script lang="ts">
	import { Container } from 'pixi-svelte';
	import { stateBetDerived, stateModal } from 'state-shared';
	import { numberToCurrencyString } from 'utils-shared/amount';

	import UiLabel from './UiLabel.svelte';
	import { getContext } from '../context';
	import { i18nDerived } from '../i18n/i18nDerived';

	type Props = {
		stacked?: boolean;
	};

	const props: Props = $props();
	const context = getContext();
	const label = $derived(stateBetDerived.activeBetMode()?.text.betAmountLabel || i18nDerived.bet());
	const value = $derived(numberToCurrencyString(stateBetDerived.betCost()));
	const disabled = $derived(!context.stateXstateDerived.isIdle());

	// Calculate glow variant based on bet mode
	const glowVariant = $derived(() => {
		const activeBetMode = stateBetDerived.activeBetMode();
		if (activeBetMode?.key === 'ANTEBET') return 'glow-orange';
		if (activeBetMode?.type === 'activate') return 'glow-purple';
		return 'glow-green';
	});

	// Calculate state based on disabled status
	const labelState = $derived(() => {
		return disabled ? 'disabled' : 'normal';
	});

	const onpress = () => {
		if (disabled) return;
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateModal.modal = { name: 'betAmountMenu' };
	};
</script>

<Container eventMode="static" cursor={disabled ? 'not-allowed' : 'pointer'} onpointerup={onpress}>
	<UiLabel 
		tiled 
		{label} 
		{value} 
		stacked={props.stacked}
		glowVariant={glowVariant()}
		state={labelState()}
	/>
</Container>
