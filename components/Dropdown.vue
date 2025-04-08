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
import { ref, computed } from 'vue'

interface DropdownItem {
  title: string
  content: string
}

interface Props {
  items: DropdownItem[]
  maxWidth?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: undefined
})

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

const expandedIndices = ref<number[]>([])
const isExpanding = ref<number | null>(null)
const isCollapsing = ref<number | null>(null)

const startExpand = (index: number) => {
  isExpanding.value = index
}

const endExpand = () => {
  isExpanding.value = null
}

const startCollapse = (index: number) => {
  isCollapsing.value = index
}

const endCollapse = () => {
  isCollapsing.value = null
}

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