<template>
  <div 
    class="spinner" 
    :class="[`spinner--${size}`]"
    :style="{ borderColor: color }"
  >
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script setup lang="ts">
/**
 * @component Spinner
 * @description A loading spinner component that provides visual feedback during asynchronous operations.
 * The spinner can be customized with different sizes and colors.
 * 
 * @example <Spinner />
 * @example <Spinner size="large" color="var(--color-primary)" />
 * @example <Spinner size="small" color="#ff0000" />
 */

/**
 * Spinner component props
 * @typedef {Object} SpinnerProps
 */
defineProps({
  /**
   * Size of the spinner
   * Controls the dimensions of the spinner element
   * @type {String}
   * @default 'medium'
   * @values 'small', 'medium', 'large'
   */
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  /**
   * Color of the spinner
   * Can be a CSS color value or a CSS variable
   * @type {String}
   * @default 'var(--content-primary)'
   */
  color: {
    type: String,
    default: 'var(--content-primary)'
  }
})
</script>

<style>
.spinner {
  display: inline-block;
  border: 2px solid;
  border-right-color: transparent !important;
  border-radius: 50%;
  animation: spin 0.75s linear infinite;
}

.spinner--small {
  width: 16px;
  height: 16px;
}

.spinner--medium {
  width: 24px;
  height: 24px;
}

.spinner--large {
  width: 32px;
  height: 32px;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style> 