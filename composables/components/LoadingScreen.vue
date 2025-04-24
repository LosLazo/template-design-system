<template>
  <div class="loading-screen">
    <div class="loading-screen__content">
      <Spinner size="large" />
      <ProgressBar :progress="progress" :animated="true" class="loading-screen__progress" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Spinner from './Spinner.vue'
import ProgressBar from './ProgressBar.vue'

defineProps({
  progress: {
    type: Number,
    default: 0
  }
})
</script>

<style>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--bg-elevation-base);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-screen__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-large);
}

.loading-screen__progress {
  width: 200px;
}
</style>