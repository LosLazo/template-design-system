<template>
  <div 
    class="spinner" 
    :class="[`spinner--${size}`]"
    :style="{ borderColor: color }"
  >
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
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