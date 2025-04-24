<script setup lang="ts">
/**
 * @component Toggle
 * @description A toggle switch component for boolean inputs, similar to a checkbox but with a sliding visual design.
 * Used for enabling/disabling settings or features.
 * 
 * @example <Toggle v-model="enabled" />
 * @example <Toggle v-model="darkMode" size="small" />
 * @example <Toggle v-model="notifications" disabled />
 */

/**
 * Toggle component props
 * @typedef {Object} ToggleProps
 */
interface Props {
  /**
   * Current state of the toggle (v-model)
   * @type {boolean}
   * @required
   */
  modelValue: boolean;
  
  /**
   * Whether the toggle is disabled
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Size variant for the toggle
   * @type {'small'|'default'}
   * @default 'default'
   */
  size?: 'small' | 'default';
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  size: 'default'
});

/**
 * Events emitted by the Toggle component
 * @typedef {Object} ToggleEmits
 * @property {Function} update:modelValue - Emitted when the toggle state changes
 */
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

/**
 * Toggles the switch state when clicked
 * Does nothing if the toggle is disabled
 */
const toggle = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue);
  }
};
</script>

<template>
  <button
    :class="[
      'toggle',
      `toggle--${size}`,
      {
        'toggle--active': modelValue,
        'toggle--disabled': disabled
      }
    ]"
    type="button"
    role="switch"
    :aria-checked="modelValue"
    :disabled="disabled"
    @click="toggle"
  >
    <span class="toggle__track">
      <span class="toggle__thumb" />
    </span>
  </button>
</template>

<style scoped>
.toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: var(--units-radius-for-surface-clickable);
}

.toggle--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* inactive track */
.toggle__track {
  display: inline-flex;
  align-items: center;
  width: 44px;
  height: 24px;
  padding: 2px;
  border-radius: 24px;
  background-color: var(--bg-elements-400);
  transition: background-color 0.2s ease;
}

.toggle--small .toggle__track {
  width: 36px;
  height: 20px;
  border-radius: 10px;
}

/* thumb */
.toggle__thumb {
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--bg-elements-100);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transform: translateX(0);
  transition: transform 0.2s ease;
}

.toggle--small .toggle__thumb {
  width: 16px;
  height: 16px;
}

.toggle--active .toggle__thumb {
  transform: translateX(20px);
}

.toggle--small.toggle--active .toggle__thumb {
  transform: translateX(16px);
}

/* active track */
.toggle--active .toggle__track {
  background-color: var(--bg-elements-900);
}

.toggle--active .toggle__thumb {
  transform: translateX(20px);
}
</style> 