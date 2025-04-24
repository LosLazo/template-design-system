<template>
  <div 
    class="dropdown"
    :style="dropdownStyles"
  >
    <div 
      v-for="(item, index) in items" 
      :key="index"
      class="dropdown-item"
      :class="{ 
        'expanded': expandedIndices.includes(index),
        'expanding': isExpanding === index,
        'collapsing': isCollapsing === index
      }"
    >
      <button 
        class="dropdown-header body-md-loud"
        @click="toggleItem(index)"
      >
        {{ item.title }}
        <Icon 
          :name="expandedIndices.includes(index) ? 'chevron-down' : 'chevron-down'"
          class="dropdown-icon"
        />
      </button>
      <transition
        name="expand"
        @enter="startExpand(index)"
        @after-enter="endExpand"
        @leave="startCollapse(index)"
        @after-leave="endCollapse"
      >
        <div 
          v-if="expandedIndices.includes(index)"
          class="dropdown-panel body-sm color-soft"
        >
          {{ item.content }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @component Dropdown
 * @description An expandable/collapsible dropdown component that displays items with titles and expandable content.
 * Features smooth animations and customizable max-width settings.
 * 
 * @example <Dropdown :items="[{title: 'Section 1', content: 'This is the content for section 1'}]" />
 * @example <Dropdown :items="dropdownItems" maxWidth="600px" />
 * @example <Dropdown :items="faqItems" maxWidth="span 6" />
 */
import { ref, computed } from 'vue'

/**
 * Represents a dropdown item with title and content
 * @typedef {Object} DropdownItem
 * @property {string} title - The title displayed in the dropdown header
 * @property {string} content - The content displayed when the dropdown is expanded
 */
interface DropdownItem {
  /**
   * The title displayed in the dropdown header
   */
  title: string;
  
  /**
   * The content displayed when the dropdown is expanded
   */
  content: string;
}

/**
 * Dropdown component props
 * @typedef {Object} DropdownProps
 */
interface Props {
  /**
   * Array of dropdown items to display
   * @type {DropdownItem[]}
   * @required
   */
  items: DropdownItem[];
  
  /**
   * Maximum width of the dropdown
   * Can be a CSS value (e.g. '600px'), a number (interpreted as pixels),
   * or a grid column span value (e.g. 'span 6')
   * @type {string|number}
   */
  maxWidth?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: undefined
})

/**
 * Computed styles for the dropdown based on maxWidth prop
 * Handles different formats of maxWidth (pixels, grid spans, etc.)
 */
const dropdownStyles = computed(() => {
  if (!props.maxWidth) return {}
  
  // If it's a number or ends with 'px', treat as pixel value
  if (typeof props.maxWidth === 'number' || props.maxWidth.endsWith('px')) {
    return { maxWidth: typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth }
  }
  
  // If it's a span value (e.g. 'span 6')
  if (props.maxWidth.startsWith('span')) {
    return { gridColumn: props.maxWidth }
  }
  
  return { maxWidth: props.maxWidth }
})

/**
 * Indices of currently expanded dropdown items
 */
const expandedIndices = ref<number[]>([])

/**
 * Index of the item currently being expanded (for animation)
 */
const isExpanding = ref<number | null>(null)

/**
 * Index of the item currently being collapsed (for animation)
 */
const isCollapsing = ref<number | null>(null)

/**
 * Start the expand animation for a dropdown item
 * @param {number} index - Index of the item being expanded
 */
const startExpand = (index: number) => {
  isExpanding.value = index
}

/**
 * End the expand animation
 */
const endExpand = () => {
  isExpanding.value = null
}

/**
 * Start the collapse animation for a dropdown item
 * @param {number} index - Index of the item being collapsed
 */
const startCollapse = (index: number) => {
  isCollapsing.value = index
}

/**
 * End the collapse animation
 */
const endCollapse = () => {
  isCollapsing.value = null
}

/**
 * Toggle expansion state of a dropdown item
 * @param {number} index - Index of the item to toggle
 */
const toggleItem = (index: number) => {
  if (expandedIndices.value.includes(index)) {
    // Remove the index if it's already expanded
    expandedIndices.value = expandedIndices.value.filter(i => i !== index)
  } else {
    // Add the index if it's not expanded
    expandedIndices.value = [...expandedIndices.value, index]
  }
}
</script>

<style scoped>
.dropdown {
  width: 100%;
  display: block;
}

.dropdown-item {
  margin-bottom: var(--unit-8);
  border-radius: 8px;
  background: var(--bg-elevation-base);
  overflow: hidden;
}

.dropdown-item.expanded,
.dropdown-item.expanding,
.dropdown-item.collapsing {
  background: var(--bg-clickable-expanded);
  align-items: start;
  text-align: left;
}

.dropdown-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--unit-16);
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--fg-text-strong);
  text-align: left;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

/* Only apply hover effect when not expanded, expanding, or collapsing */
.dropdown-item:not(.expanded):not(.expanding):not(.collapsing) .dropdown-header:hover {
  background: var(--bg-clickable-hover);
}

.dropdown-panel {
  background: transparent;
  margin-top: -1px;
  padding: 0 var(--unit-16) var(--unit-16);
  color: var(--fg-text-soft);
  max-height: 1000px;
  height: auto;
}

.dropdown-icon {
  width: var(--unit-20);
  height: var(--unit-20);
  color: var(--fg-text-soft);
  transition: transform 0.3s ease;
}

.expanded .dropdown-icon {
  transform: rotate(-180deg);
}

/* Animation classes */
.expand-enter-active,
.expand-leave-active {
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out, padding 0.3s ease-out;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
  height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 1000px;
  height: auto;
  opacity: 1;
}
</style> 