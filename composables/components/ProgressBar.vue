<template>
  <div class="progress-bar">
    <div 
      class="progress-bar__fill" 
      :style="{ width: `${progress}%` }"
      :class="{
        'progress-bar__fill--looping': looping,
        'progress-bar__fill--progress': !looping
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  progress: {
    type: Number,
    default: 50
  },
  looping: {
    type: Boolean,
    default: false
  }
})
</script>

<style>
.progress-bar {
  width: 100%;
  height: 4px;
  border-radius: 4px;
  background-color: var(--bg-elements-200);
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar__fill {
  height: 100%;
  background-color: var(--fg-object-transparent-strong);
  border-radius: 4px;
}

.progress-bar__fill--looping {
  animation: indeterminate 1.5s infinite linear;
  width: 40% !important;
}

.progress-bar__fill--progress {
  transition: width 0.1s linear;
}

@keyframes indeterminate {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(250%);
  }
}
</style> 