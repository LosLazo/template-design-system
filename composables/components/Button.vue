<template>
  <button
    :class="[
      'button',
      `button--${variant}`,
      `button--${size}`,
      { 'button--loading': state === 'loading' },
      { 'button--disabled': disabled },
      { 'button--icon-only': !$slots.default }
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <Icon 
      v-if="prefixIcon" 
      :name="prefixIcon"
      :size="Number(iconSize)"
      class="button__icon button__icon--prefix"
    />
    
    <span v-if="$slots.default" class="button__content">
      <slot></slot>
    </span>
    
    <Icon 
      v-if="suffixIcon"
      :name="suffixIcon"
      :size="Number(iconSize)"
      class="button__icon button__icon--suffix"
    />

    <span v-if="state === 'loading'" class="button__loader"></span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from './Icon.vue'

/**
 * @component Button
 * @description A versatile button component with multiple variants, sizes, and states.
 * Supports icons and loading state.
 * 
 * @example <Button>Click me</Button>
 * @example <Button variant="secondary" size="medium">Secondary Button</Button>
 * @example <Button prefixIcon="arrow-right">With Icon</Button>
 * @example <Button state="loading">Loading</Button>
 */

/**
 * Button variant types
 * @typedef {'primary'|'secondary'|'ghost'|'danger'} ButtonVariant
 */
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

/**
 * Button size options
 * @typedef {'large'|'medium'|'small'|'tiny'} ButtonSize
 */
type ButtonSize = 'large' | 'medium' | 'small' | 'tiny'

/**
 * Button state options
 * @typedef {'default'|'loading'} ButtonState
 */
type ButtonState = 'default' | 'loading'

/**
 * Button component props
 * @typedef {Object} ButtonProps
 */
interface Props {
  /**
   * Disables the button when true
   * @type {boolean}
   */
  disabled?: boolean

  /**
   * Icon to display before the button text
   * @type {string}
   */
  prefixIcon?: string

  /**
   * Icon to display after the button text
   * @type {string}
   */
  suffixIcon?: string

  /**
   * Size of the button
   * @type {ButtonSize}
   */
  size?: ButtonSize

  /**
   * Current state of the button
   * @type {ButtonState}
   */
  state?: ButtonState

  /**
   * Visual style variant of the button
   * @type {ButtonVariant}
   */
  variant?: ButtonVariant
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  prefixIcon: undefined,
  suffixIcon: undefined,
  size: 'large',
  state: 'default',
  variant: 'primary'
})

/**
 * Computes the appropriate icon size based on button size
 * @returns {number} Icon size in pixels
 */
const iconSize = computed<number>(() => {
  switch (props.size) {
    case 'large':
      return 20
    case 'medium':
      return 16
    case 'small':
      return 14
    case 'tiny':
      return 12
    default:
      return 24
  }
})

/**
 * Events emitted by the Button component
 * @typedef {Object} ButtonEmits
 * @property {Function} click - Emitted when the button is clicked
 */
defineEmits(['click'])
</script>

<style lang="css" scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--ei-dimension-space-small);
  border: none;
  font-family: var(--ei-typography-text);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  width: auto;
  min-width: 0;
}

/* Size variants */
.button--large {
  padding: 12px 24px;
  font-size: 16px;
  min-width: 120px;
  height: 48px;
  border-radius: 8px;
}

.button--medium {
  padding: 8px 16px;
  font-size: 14px;
  min-width: 100px;
  height: 48px;
  border-radius: 8px;
}

.button--small {
  padding: 6px 12px;
  font-size: 14px;
  min-width: 80px;
  height: 32px;
  border-radius: 4px;
}

.button--tiny {
  padding: 4px 8px;
  font-size: 12px;
  min-width: 60px;
  height: 24px;
}

/* Icon-only variants */
.button--icon-only {
  min-width: 0;
}

.button--icon-only.button--large {
  padding: var(--ei-dimension-space-small);
  aspect-ratio: 1;
}

.button--icon-only.button--medium {
  padding: var(--ei-dimension-space-small);
  aspect-ratio: 1;
}

.button--icon-only.button--small {
  padding: var(--ei-dimension-space-tiny);
  aspect-ratio: 1;
}

.button--icon-only.button--tiny {
  padding: var(--ei-dimension-space-xxsmall);
  aspect-ratio: 1;
}

/* Variant styles */
.button--primary {
  background-color: var(--ei-color-bg-clickable-primary-default);
  color: var(--ei-color-fg-text-strong-inverse);
}
.button--primary:hover {
  background-color: var(--ei-color-bg-clickable-primary-hover);
}

.button--primary:active {
  background-color: var(--ei-color-bg-clickable-primary-pressed);
}

.button--primary:focus {
  background-color: var(--ei-color-bg-clickable-primary-default);
  outline: 2px solid var(--ei-color-fg-border-clickable-focus);
  outline-offset: 2px;
}

.button--disabled {
  opacity: 0.6;
  cursor: not-allowed !important;
}

.button--primary.button--disabled {
  background-color: var(--ei-color-bg-clickable-primary-disabled);
}

.button--secondary {
  background-color: transparent;
  color: var(--ei-color-fg-text-strong);
  border: 1px solid var(--ei-color-fg-border-defined);
}
.button--secondary:hover {
  background-color: var(--ei-color-bg-clickable-hover);
}
.button--secondary:active {
  background-color: var(--ei-color-bg-clickable-pressed);
}
.button--secondary.button--disabled {
  color: var(--ei-color-fg-text-disabled);
  border-color: var(--ei-color-fg-border-disabled);
}

.button--ghost {
  background-color: transparent;
  color: var(--ei-color-fg-text-strong);
}
.button--ghost:hover {
  background-color: var(--ei-color-bg-clickable-hover);
}
.button--ghost:active {
  background-color: var(--ei-color-bg-clickable-pressed);
}
.button--ghost.button--disabled {
  color: var(--ei-color-fg-text-disabled);
}

.button--danger {
  background-color: var(--ei-color-bg-clickable-danger-danger);
  color: var(--ei-color-fg-text-strong-inverse);
}
.button--danger:hover {
  background-color: var(--ei-color-bg-clickable-danger-danger-hover);
}
.button--danger:active {
  background-color: var(--ei-color-bg-clickable-danger-danger-pressed);
}
.button--danger.button--disabled {
  background-color: var(--ei-color-bg-clickable-danger-disabled);
}

.button__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style> 