<template>
  <div class="tooltip" :class="[`tooltip--${position}`]" v-if="visible">
    <div class="tooltip__content body-md">
      <slot>{{ text }}</slot>
    </div>
    <div class="tooltip__arrow"></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Props {
  text?: string
  position?: 'top' | 'right' | 'bottom' | 'left'
  visible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  position: 'right',
  visible: false,
  text: ''
})
</script>

<style scoped>
.tooltip {
  position: absolute;
  z-index: 100;
  max-width: 280px;
  pointer-events: none;
}

.tooltip__content {
  background-color: var(--fg-object-solid-1000, #101010);
  color: var(--permanent-white, #FFFFFF);
  font-size: 12px;
  line-height: 1.3em;
  padding: 12px 12px;
  border-radius: 4px;
  white-space: nowrap;
}

.tooltip__arrow {
  position: absolute;
  width: 0;
  height: 0;
}

.tooltip--right {
  transform: translateY(-50%);
}

.tooltip--right .tooltip__arrow {
  left: -5px;
  top: 50%;
  transform: translateY(-50%);
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-right: 5px solid var(--fg-object-solid-1000, #101010);
}

.tooltip--left {
  transform: translateY(-50%);
}

.tooltip--left .tooltip__arrow {
  right: -5px;
  top: 50%;
  transform: translateY(-50%);
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid var(--fg-object-solid-1000, #101010);
}

.tooltip--top {
  transform: translateX(-50%);
}

.tooltip--top .tooltip__arrow {
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid var(--fg-object-solid-1000, #101010);
}

.tooltip--bottom {
  transform: translateX(-50%);
}

.tooltip--bottom .tooltip__arrow {
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid var(--fg-object-solid-1000, #101010);
}
</style> 