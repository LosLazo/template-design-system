<template>
  <div class="banner" :class="{ 'banner--dismissible': dismissible }">
    <div class="banner__content body-sm">
      {{ text }}
      <Button v-if="dismissible" variant="ghost" size="small" suffixIcon="x" @click="$emit('dismiss')" />
    </div>
  </div>
</template>

<script setup>
import Button from './Button.vue'

defineProps({
  text: {
    type: String,
    required: true
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
  background-color: var(--bg-elevation-background–inverse);
  padding: var(--space-small) var(--space-medium);
  color: var(--fg-text-strong-inverse);
}

.banner__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size-sm);
  line-height: var(--line-height-sm);
}

.banner--dismissible .banner__content {
  padding-right: var(--space-small);
}
</style> 