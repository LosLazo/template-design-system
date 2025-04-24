<template>
  <div 
    class="input-wrapper"
    :class="[
      `input-wrapper--${size}`,
      { 'input-wrapper--error': error },
      { 'input-wrapper--success': success },
      { 'input-wrapper--disabled': disabled }
    ]"
  >
    <label 
      v-if="label" 
      :for="id" 
      class="input__label body-xs color-strong"
      :class="`input__label--${size}`"
    >
      {{ label }}
    </label>
    <div class="input__container">
      <Icon 
        v-if="prefixIcon" 
        :name="prefixIcon"
        :size="Number(iconSize)"
        class="input__icon input__icon--prefix"
      />
      <input
        :id="id"
        v-model="localValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${id}-error` : undefined"
        class="input__field body-sm"
        :class="[
          `input__field--${size}`,
          { 'input__field--readonly': readonly }
        ]"
        @input="(e) => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
      />
      <!-- <Button
        v-if="showClearButton && localValue"
        variant="ghost"
        size="small"
        class="input__clear-button"
        prefixIcon="x"
        @click="clearInput"
      /> -->
      <Button
        v-if="showClearButton"
        suffixIcon="x" 
        size="small" 
        variant="ghost"
        class="input__clear-button"
        :class="{ 'input__clear-button--hidden': !localValue }"
        @click="clearInput"
      />
      <!-- Debug info -->
      <div v-if="false" style="position: absolute; top: 0; right: 0; background: red; color: white; padding: 4px;">
        showClearButton: {{ showClearButton }}<br>
        localValue: {{ localValue }}<br>
        modelValue: {{ modelValue }}
      </div>
      <Icon 
        v-if="suffixIcon" 
        :name="suffixIcon"
        :size="Number(iconSize)"
        class="input__icon input__icon--suffix"
      />
    </div>
    <span 
      v-if="error" 
      :id="`${id}-error`" 
      class="input__error body-xs"
      :class="`input__error--${size}`"
      role="alert"
    >
      {{ error }}
    </span>
    <span 
      v-if="success" 
      class="input__success body-xs"
      :class="`input__success--${size}`"
    >
      {{ success }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from './Icon.vue'
import Button from './Button.vue'

/**
 * @component Input
 * @description A form input component with support for various states, icons, and validation.
 * Provides a consistent interface for text input with built-in error handling and visual feedback.
 * 
 * @example <Input v-model="value" label="Username" placeholder="Enter username" />
 * @example <Input v-model="email" type="email" prefixIcon="mail" error="Invalid email format" />
 * @example <Input v-model="search" suffixIcon="search" showClearButton />
 */

/**
 * Input component props
 * @typedef {Object} InputProps
 */
interface Props {
  /**
   * Current value of the input (v-model)
   * @type {string}
   * @required
   */
  modelValue: string
  
  /**
   * Label text displayed above the input
   * @type {string}
   */
  label?: string
  
  /**
   * Placeholder text displayed when input is empty
   * @type {string}
   */
  placeholder?: string
  
  /**
   * HTML input type (text, password, email, etc.)
   * @type {string}
   * @default 'text'
   */
  type?: string
  
  /**
   * Size variant of the input
   * @type {'large'|'medium'|'small'}
   * @default 'medium'
   */
  size?: 'large' | 'medium' | 'small'
  
  /**
   * Whether the input is disabled
   * @type {boolean}
   * @default false
   */
  disabled?: boolean
  
  /**
   * Whether the input is read-only
   * @type {boolean}
   * @default false
   */
  readonly?: boolean
  
  /**
   * Error message to display below the input
   * @type {string}
   */
  error?: string
  
  /**
   * Success message to display below the input
   * @type {string}
   */
  success?: string
  
  /**
   * Icon to display at the start of the input
   * @type {string}
   */
  prefixIcon?: string
  
  /**
   * Icon to display at the end of the input
   * @type {string}
   */
  suffixIcon?: string
  
  /**
   * Unique identifier for the input element
   * Used for accessibility (connecting label and error messages)
   * @type {string}
   * @required
   */
  id: string
  
  /**
   * Whether to show a clear button when the input has a value
   * @type {boolean}
   * @default false
   */
  showClearButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'medium',
  disabled: false,
  readonly: false,
  showClearButton: false
})

/**
 * Events emitted by the Input component
 * @typedef {Object} InputEmits
 * @property {Function} update:modelValue - Emitted when the input value changes
 */
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

/**
 * Computed property for two-way binding with v-model
 * @type {ComputedRef<string>}
 */
const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

/**
 * Clears the input value
 */
const clearInput = () => {
  emit('update:modelValue', '')
}

/**
 * Computed property for icon size based on input size
 * @returns {number} Size of icon in pixels
 */
const iconSize = computed(() => {
  switch (props.size) {
    case 'large':
      return 20
    case 'medium':
      return 16
    case 'small':
      return 14
    default:
      return 16
  }
})

/**
 * Computed property for button size based on input size
 * @returns {string} Button size variant
 */
const buttonSize = computed(() => {
  switch (props.size) {
    case 'large':
      return 'medium'
    case 'medium':
      return 'small'
    case 'small':
      return 'tiny'
    default:
      return 'small'
  }
})
</script>

<style>
.input-wrapper {
  display: flex;
  gap: var(--space-tiny);
  flex-direction: column;
  width: 100%;
}

.input__container {
  position: relative;
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 1px solid var(--fg-border-disabled);
  border-radius: var(--units-radius-for-surface-clickable);
  transition: all 0.2s ease;
}

.input__container:hover {
  border: 1px solid var(--fg-border-strong);
}

.input__field {
  width: 100%;
  border: none;
  background: transparent;
  color: var(--fg-text-strong);
}

.input__field--large {
  padding: 0 var(--space-medium);
}

.input__field--medium {
  padding: 0 var(--space-small);
}

.input__field--small {
  padding: 0 var(--space-tiny);
}

.input__field:focus {
  outline: none;
}

.input__container:focus-within {
  border-color: var(--fg-border-clickable-focus);
  box-shadow: 0 0 0 2px var(--fg-border-clickable-focus);
}

.input__icon {
  color: var(--fg-text-soft);
  flex-shrink: 0;
}

.input__icon--prefix {
  margin-left: var(--space-small);
}

.input__icon--suffix {
  margin-right: var(--space-tiny);
}

.input__error {
  color: var(--system-danger-default);
}

.input__error--large {
  line-height: var(--line-height-medium);
}

.input__error--medium {
  line-height: var(--line-height-small);
}

.input__error--small {
  line-height: var(--line-height-xsmall);
}

.input__success {
  color: var(--system-success-default);
}

.input__success--large {
  line-height: var(--line-height-medium);
}

.input__success--medium {
  line-height: var(--line-height-small);
}

.input__success--small {
  line-height: var(--line-height-xsmall);
}

/* Size variants */
.input-wrapper--large .input__container {
  height: 48px;
  border-radius: 8px;
}

.input-wrapper--medium .input__container {
  height: 40px;
  border-radius: 6px;
}

.input-wrapper--small .input__container {
  height: 32px;
  border-radius: 4px;
}

/* States */
.input-wrapper--error .input__container {
  border-color: var(--system-danger-default);
}

.input-wrapper--success .input__container {
  border-color: var(--system-success-default);
}

.input-wrapper--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.input-wrapper--disabled .input__container {
  background-color: var(--bg-clickable-disabled);
  border-color: var(--fg-border-defined);
}

.input-wrapper--disabled .input__field {
  cursor: not-allowed;
}

/* Placeholder styling */
.input__field::placeholder {
  color: var(--fg-text-disabled);
}

.input__clear-button {
  margin: 0 var(--space-tiny);
  opacity: 1;
  transition: opacity 0.2s ease;
}

.input__clear-button--hidden {
  opacity: 0;
  pointer-events: none;
}

.input__field--readonly {
  cursor: default;
  pointer-events: none;
}

/* Change appearance of readonly fields without looking disabled */
.input__field--readonly {
  opacity: 1;
  color: var(--fg-text-strong);
}
</style> 