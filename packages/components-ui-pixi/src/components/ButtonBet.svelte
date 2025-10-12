<script lang="ts">
    import { Container, Text, Sprite } from 'pixi-svelte';
    import { Button, type ButtonProps } from 'components-pixi';
    import { OnHotkey } from 'components-shared';
    import { stateBet, stateBetDerived } from 'state-shared';

    import ButtonBetProvider from './ButtonBetProvider.svelte';
    import UiSprite from './UiSprite.svelte';
    import { UI_BASE_FONT_SIZE, UI_BASE_SIZE } from '../constants';
    import { i18nDerived } from '../i18n/i18nDerived';
    import { WHITE, DISABLED_SECONDARY } from 'constants-shared/colors';

    const props: Partial<Omit<ButtonProps, 'children'>> = $props();
    const disabled = $derived(!stateBetDerived.isBetCostAvailable());
    // Make the button larger and round
    const BUTTON_SIZE = UI_BASE_SIZE * 1;
    const sizes = { width: BUTTON_SIZE, height: BUTTON_SIZE };

    // Check if bonus mode is active (any mode other than 'BASE')
    const isBonusActive = $derived(() => {
        return stateBet.activeBetModeKey !== 'BASE';
    });

    // Calculate text color based on state
    const textColor = $derived(() => {
        return disabled ? DISABLED_SECONDARY : WHITE;
    });

    // Calculate button variant based on bonus state
    const buttonVariant = $derived(() => {
        if (disabled) return 'dark';
        return isBonusActive() ? 'glow-orange' : 'glow-green';
    });

    // Make the button perfectly round
    const borderRadius = $derived(() => BUTTON_SIZE / 2);
</script>

<ButtonBetProvider>
    {#snippet children({ key, onpress })}
        <OnHotkey hotkey="Space" {disabled} {onpress} />
        <Button
            {...props}
            {sizes}
            {onpress}
            {disabled}
            class="bet-round-btn"
        >
            {#snippet children({ center, hovered, pressed })}
                <!-- Glowing round background -->
                <UiSprite
                    {...center}
                    anchor={0.5}
                    width={sizes.width}
                    height={sizes.height}
                    borderRadius={borderRadius()}
                    variant={buttonVariant()}
                    state={disabled ? 'disabled' : pressed ? 'pressed' : hovered ? 'hover' : 'normal'}
                />
                
                <!-- Icon and text content -->
                <Container {...center}>
                    {#if ['spin_default', 'spin_disabled'].includes(key)}
                        <Sprite
                            key="play"
                            width={sizes.width}
                            height={sizes.height}
                            anchor={0.5}
                            scale={0.50}
                        />
                        <Text
                            anchor={0.5}
                            y={BUTTON_SIZE * 0.13}
                            text=""
                            style={{
                                align: 'center',
                                fontFamily: 'bungeeSpice',
                                fontSize: BUTTON_SIZE * 0.4,
                                fill: textColor(),
                                dropShadow: true,
                            }}
                        />
                    {:else if key === 'bonus-active'}
                        <Sprite
                            key="stop"
                            anchor={0.5}
                            scale={0.65}
                        />
                        <Text
                            anchor={0.5}
                            y={BUTTON_SIZE * 0.13}
                            text="Bonus"
                            style={{
                                align: 'center',
                                fontFamily: 'bungeeSpice',
                                fontSize: BUTTON_SIZE * 0.4,
                                fill: textColor(),
                                dropShadow: true,
                            }}
                        />
                    {:else}
                        <Sprite
                            key="stop"
                            width={sizes.width}
                            height={sizes.height}
                            anchor={0.5}
                            scale={0.65}
                        />
                        <Text
                            anchor={0.5}
                            y={BUTTON_SIZE * 0.13}
                            text=""
                            style={{
                                align: 'center',
                                fontFamily: 'bungeeSpice',
                                fontSize: BUTTON_SIZE * 0.4,
                                fill: textColor(),
                                dropShadow: true,
                            }}
                        />
                    {/if}
                </Container>
            {/snippet}
        </Button>
    {/snippet}
</ButtonBetProvider>

