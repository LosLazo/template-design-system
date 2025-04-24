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
  gap: var(--space-medium);
  padding: var(--space-medium);
  padding-right: var(--space-large);
  background-color: var(--bg-elevation-background–inverse);
  border-radius: var(--unit-8);
  color: var(--fg-text-strong-inverse);
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
  margin-bottom: var(--space-xxsmall);
  color: var(--fg-text-strong-inverse);
}

.message__body {
  margin: 0;
  color: var(--fg-text-soft-inverse);
}
</style> 