<template>
  <div class="progress-bar">
    <div 
      class="progress-bar__fill" 
      :style="{ width: `${progress}%` }"
      :class="{ 'progress-bar__fill--animated': animated }"
    ></div>
  </div>
</template>

<script setup>
defineProps({
  progress: {
    type: Number,
    default: 50
  },
  animated: {
    type: Boolean,
    default: false
  }
})
</script>

<style>
.progress-bar {
  width: 100%;
  height: 5px;
  border-radius: 4px;
  background-color: var(--bg-elements-200);
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar__fill {
  height: 100%;
  background-color: var(--fg-object-transparent-strong);
  border-radius: 4px;
  transition: width 0.3s ease-in-out;
}

.progress-bar__fill--animated {
  animation: indeterminate 1.5s infinite linear;
  width: 40% !important;
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