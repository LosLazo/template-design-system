<script setup lang="ts">
/**
 * @component Checkbox
 * @description A checkbox component for boolean inputs with customizable label and sizing.
 * Follows accessibility best practices and provides visual feedback for different states.
 * 
 * @example <Checkbox v-model="isChecked" />
 * @example <Checkbox v-model="agreeToTerms" label="I agree to the terms and conditions" />
 * @example <Checkbox v-model="rememberMe" size="small" label="Remember me" />
 * @example <Checkbox v-model="isDisabled" disabled />
 */

/**
 * Checkbox component props
 * @typedef {Object} CheckboxProps
 */
interface Props {
  /**
   * Current state of the checkbox (v-model)
   * @type {boolean}
   * @required
   */
  modelValue: boolean;
  
  /**
   * Whether the checkbox is disabled
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Size variant for the checkbox
   * @type {'small'|'default'}
   * @default 'default'
   */
  size?: 'small' | 'default';
  
  /**
   * Text label displayed next to the checkbox
   * @type {string}
   * @default ''
   */
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  size: 'default',
  label: ''
});

/**
 * Events emitted by the Checkbox component
 * @typedef {Object} CheckboxEmits
 * @property {Function} update:modelValue - Emitted when the checkbox state changes
 */
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

/**
 * Toggles the checkbox state when clicked
 * Does nothing if the checkbox is disabled
 */
const toggle = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue);
  }
};
</script>

<template>
  <label
    :class="[
      'checkbox',
      `checkbox--${size}`,
      {
        'checkbox--disabled': disabled
      }
    ]"
  >
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="toggle"
      class="checkbox__input"
    />
    <span class="checkbox__box">
      <svg
        v-if="modelValue"
        class="checkbox__check"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 6L9 17L4 12"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <span v-if="label" class="checkbox__label">{{ label }}</span>
  </label>
</template>

<style scoped>
.checkbox {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--ei-dimension-space-small);
  cursor: pointer;
  user-select: none;
}

.checkbox--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.checkbox__input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkbox__box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 1px solid var(--ei-color-fg-border-defined);
  border-radius: 4px;
  background-color: var(--ei-color-bg-elements-100);
  transition: all 0.2s ease;
}

.checkbox--small .checkbox__box {
  width: 20px;
  height: 20px;
}

.checkbox__input:focus-visible + .checkbox__box {
  border-color: var(--ei-color-fg-border-clickable-focus);
  box-shadow: 0 0 0 2px var(--ei-color-fg-border-clickable-focus);
}

.checkbox__input:checked + .checkbox__box {
  background-color: var(--ei-color-bg-clickable-primary-default);
  border-color: var(--ei-color-bg-clickable-primary-default);
}

.checkbox__input:not(:disabled):hover + .checkbox__box {
  background-color: var(--ei-color-bg-clickable-hover);
}

.checkbox__input:not(:disabled):active + .checkbox__box {
  background-color: var(--ei-color-bg-clickable-pressed);
}

.checkbox__check {
  width: 16px;
  height: 16px;
  color: var(--ei-color-fg-text-strong-inverse);
}

.checkbox--small .checkbox__check {
  width: 14px;
  height: 14px;
}

.checkbox__label {
  font-size: var(--ei-dimension-unit-font-size-300);
  line-height: var(--ei-dimension-unit-line-height-300);
  color: var(--ei-color-fg-text-strong);
}

.checkbox--disabled .checkbox__label {
  color: var(--ei-color-fg-text-soft);
}
</style> 