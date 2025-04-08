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

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'large' | 'medium' | 'small' | 'tiny'
type ButtonState = 'default' | 'loading'

interface Props {
  disabled?: boolean
  prefixIcon?: string
  suffixIcon?: string
  size?: ButtonSize
  state?: ButtonState
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

defineEmits(['click'])
</script>

<style lang="css" scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-small);
  border: none;
  border-radius: 8px;
  font-family: var(--font-text);
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  width: auto;
  min-width: 0;
}

/* Size variants */
.button--large {
  padding: var(--space-small) var(--space-medium);
  font-size: 16px;
  min-width: 120px;
}

.button--medium {
  padding: var(--space-small) var(--space-small);
  font-size: 14px;
  min-width: 100px;
}

.button--small {
  padding: var(--space-tiny) var(--space-small);
  font-size: 14px;
  border-radius: 6px;
  min-width: 80px;
}

.button--tiny {
  padding: var(--space-xxsmall) var(--space-tiny);
  font-size: 12px;
  border-radius: 4px;
  min-width: 60px;
}

/* Icon-only variants */
.button--icon-only {
  min-width: 0;
}

.button--icon-only.button--large {
  padding: var(--space-small);
  aspect-ratio: 1;
}

.button--icon-only.button--medium {
  padding: var(--space-small);
  aspect-ratio: 1;
}

.button--icon-only.button--small {
  padding: var(--space-tiny);
  aspect-ratio: 1;
}

.button--icon-only.button--tiny {
  padding: var(--space-xxsmall);
  aspect-ratio: 1;
}

/* Variant styles */
.button--primary {
  background-color: var(--bg-clickable-primary-default);
  color: var(--fg-text-strong-inverse);
}
.button--primary:hover {
  background-color: var(--bg-clickable-primary-hover);
}

.button--primary:active {
  background-color: var(--bg-clickable-primary-pressed);
}

.button--primary:focus {
  background-color: var(--bg-clickable-primary-focus);
  outline: 2px solid var(--fg-border-clickable-focus);
  outline-offset: 2px;
}

.button--disabled {
  background-color: var(--bg-clickable-primary-disabled);
}

.button--secondary {
  background-color: transparent;
  color: var(--fg-text-strong);
  border: 1px solid var(--fg-border-defined);
}
.button--secondary:hover {
  background-color: var(--bg-clickable-hover);
}

.button--ghost {
  background-color: transparent;
  color: var(--fg-text-strong);
}
.button--ghost:hover {
  background-color: var(--bg-clickable-hover);
}

.button--danger {
  background-color: var(--bg-clickable-danger-danger);
  color: var(--fg-text-strong-inverse);
}
.button--danger:hover {
  background-color: var(--bg-clickable-danger-danger-hover);
}

.button__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style> 