<template>
  <span 
    class="icon" 
    v-html="svgContent"
    :style="{ 
      width: size + 'px', 
      height: size + 'px',
      color: color
    }"
  ></span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import feather from 'feather-icons'

interface Props {
  name: string
  size?: number
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  color: 'currentColor'
})

const svgContent = computed(() => {
  if (!props.name || !feather.icons[props.name]) {
    console.warn(`Icon with name "${props.name}" not found`)
    return ''
  }
  
  return feather.icons[props.name].toSvg({
    width: props.size,
    height: props.size,
    color: props.color
  })
})
</script>

<style scoped>
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon :deep(svg) {
  width: 100%;
  height: 100%;
}
</style> 