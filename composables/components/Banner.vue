<template>
  <div class="banner" :class="[
    { 'banner--dismissible': dismissible },
    `banner--${variant || 'default'}`
  ]">
    <div class="banner__content body-sm">
      {{ text || title }}
      <Button v-if="dismissible" variant="ghost" size="small" suffixIcon="x" @click="$emit('dismiss')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from './Button.vue'

defineProps({
  text: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'default'
  },
  dismissible: {
    type: Boolean,
    default: true
  }
})

defineEmits(['dismiss'])
</script>

<style>
.banner {
  width: 100%;
  background-color: var(--ei-color-bg-elevation-background–inverse);
  padding: var(--ei-dimension-space-tiny) 32px;
  color: var(--ei-color-fg-text-strong-inverse);
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.banner--info {
  color: var(--ei-color-fg-text-strong-inverse);
}

.banner__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--ei-typography-size-sm);
  line-height: var(--ei-line-height-sm);
}

.banner--dismissible .banner__content {
  padding-right: var(--ei-dimension-space-small);
}
</style> 