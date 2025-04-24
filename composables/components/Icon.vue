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

/**
 * @component Icon
 * @description Renders SVG icons from the Feather icon library with customizable size and color.
 * This component provides a simple way to include consistent icons throughout the application.
 * 
 * @example <Icon name="user" />
 * @example <Icon name="heart" size="16" color="red" />
 * @example <Icon name="star" size="32" />
 * @see {@link https://feathericons.com/|Feather Icons} for available icon names
 */

/**
 * Icon component props
 * @typedef {Object} IconProps
 */
interface Props {
  /**
   * Name of the icon from Feather icon set
   * @type {string}
   * @required
   * @see {@link https://feathericons.com/|Available Icons}
   */
  name: string
  
  /**
   * Size of the icon in pixels
   * @type {number}
   * @default 24
   */
  size?: number
  
  /**
   * Color of the icon (CSS color value)
   * @type {string}
   * @default 'currentColor'
   */
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  color: 'currentColor'
})

/**
 * Computed SVG content based on the icon name
 * @returns {string} Raw SVG HTML string or empty string if icon not found
 */
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