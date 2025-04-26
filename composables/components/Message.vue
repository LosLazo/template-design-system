<template>
  <div class="message">
    <div class="message__icon">
      <Icon :name="icon" />
    </div>
    <div class="message__content">
      <h3 class="message__header body-md color-inverse-strong">{{ header }}</h3>
      <p class="message__body body-sm color-inverse-soft">{{ body }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from './Icon.vue'

defineProps({
  header: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'info'
  }
})
</script>

<style>
.message {
  display: flex;
  gap: var(--ei-dimension-space-medium);
  padding: var(--ei-dimension-space-medium);
  padding-right: var(--ei-dimension-space-large);
  background-color: var(--ei-color-bg-elevation-background–inverse);
  border-radius: var(--ei-dimension-unit-8);
  color: var(--ei-color-fg-text-strong-inverse);
  overflow: hidden;
}

.message__icon {
  flex-shrink: 0;
}

.message__content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message__header {
  margin: 0;
  margin-bottom: var(--ei-dimension-space-xxsmall);
  color: var(--ei-color-fg-text-strong-inverse);
}

.message__body {
  margin: 0;
  color: var(--ei-color-fg-text-soft-inverse);
}
</style> 