<template>
  <div class="carousel">
    <h3 v-if="title" style="margin: 0px;">{{ title }}</h3>
    <div class="carousel__container" ref="containerRef">
      <div 
        class="carousel__items" 
        ref="itemsRef"
        :style="{ transform: `translateX(${translateX}px)` }"
      >
        <slot></slot>
      </div>
    </div>
    <div class="carousel__navigation">
      <Button
        variant="secondary"
        size="small"
        prefixIcon="chevron-left"
        @click="prev"
        :disabled="isAtStart"
      />
      <Button
        variant="secondary"
        size="small"
        prefixIcon="chevron-right"
        @click="next"
        :disabled="isAtEnd"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import Button from './Button.vue'

/**
 * @component Carousel
 * @description A horizontally scrollable carousel component with navigation buttons.
 * Allows users to browse through a collection of items with next/previous buttons.
 * @example
 * <Carousel title="Featured Products">
 *   <div class="carousel-item">Item 1</div>
 *   <div class="carousel-item">Item 2</div>
 *   <div class="carousel-item">Item 3</div>
 * </Carousel>
 * 
 * @slot default - Place carousel items here, preferably with the .carousel-item class
 */

interface Props {
  /**
   * Optional title to display above the carousel
   * @default undefined
   */
  title?: string,
  
  /**
   * CSS selector to identify carousel items
   * @default '.carousel-item'
   */
  itemSelector?: string
}

const props = withDefaults(defineProps<Props>(), {
  itemSelector: '.carousel-item' // Default selector for items
})

/**
 * Reference to the container element
 * @private
 */
const containerRef = ref<HTMLElement | null>(null)

/**
 * Reference to the items wrapper element
 * @private
 */
const itemsRef = ref<HTMLElement | null>(null)

/**
 * Current horizontal translation value in pixels
 * @private
 */
const translateX = ref(0)

/**
 * Current index of the first visible item
 * @private
 */
const currentIndex = ref(0)

/**
 * Gap between carousel items in pixels
 * @private
 */
const itemGap = ref(16) // --space-medium in pixels

/**
 * Whether the carousel is at the start position
 * @private
 */
const isAtStart = ref(true)

/**
 * Whether the carousel is at the end position
 * @private
 */
const isAtEnd = ref(false)

/**
 * Get all carousel items
 * @private
 * @returns {Array<Element>} Array of carousel item elements
 */
const getCarouselItems = () => {
  if (!itemsRef.value) return []
  
  // If a selector is provided, use it to find items
  if (props.itemSelector) {
    return Array.from(itemsRef.value.querySelectorAll(props.itemSelector))
  }
  
  // Fallback to direct children
  return Array.from(itemsRef.value.children)
}

/**
 * Calculate the gap between items
 * @private
 * @returns {number} Gap size in pixels
 */
const calculateItemGap = () => {
  if (!itemsRef.value) return 16
  
  // Try to get computed style
  const computedStyle = window.getComputedStyle(itemsRef.value)
  const gapValue = computedStyle.getPropertyValue('gap')
  
  if (gapValue) {
    const numericGap = parseInt(gapValue)
    if (!isNaN(numericGap)) {
      return numericGap
    }
  }
  
  return 16 // Default gap
}

/**
 * Check carousel limits and update navigation state
 * @private
 */
const updateNavigationState = () => {
  if (!containerRef.value || !itemsRef.value) return
  
  const containerWidth = containerRef.value.offsetWidth
  const contentWidth = itemsRef.value.scrollWidth
  const maxTranslate = -(contentWidth - containerWidth)
  
  // Check if we're at the start (can't go backward)
  isAtStart.value = translateX.value >= 0
  
  // Check if we're at the end (can't go forward)
  isAtEnd.value = translateX.value <= maxTranslate || contentWidth <= containerWidth
}

/**
 * Move to the next item
 * @public
 */
const next = () => {
  console.log('Next button clicked')
  
  // Safety check
  if (!containerRef.value || !itemsRef.value) {
    console.warn('Container or items ref not found')
    return
  }
  
  // Get container and content dimensions
  const containerWidth = containerRef.value.offsetWidth
  const contentWidth = itemsRef.value.scrollWidth
  
  // Get all carousel items
  const items = getCarouselItems()
  console.log('Carousel items found:', items.length)
  
  if (items.length === 0) {
    console.warn('No carousel items found')
    return
  }
  
  // Calculate how much we can scroll
  const maxTranslate = -(contentWidth - containerWidth)
  
  // Find the width of the current item to scroll by
  let currentItemWidth = 300 // Default fallback
  if (currentIndex.value < items.length) {
    const currentItem = items[currentIndex.value] as HTMLElement
    currentItemWidth = currentItem.offsetWidth + itemGap.value
    
    console.log('Current item:', currentIndex.value, 'Width:', currentItemWidth)
  }
  
  // Calculate new position
  const newPosition = Math.max(maxTranslate, translateX.value - currentItemWidth)
  console.log('New position:', newPosition, 'Current position:', translateX.value)
  
  // Only move if we can go further
  if (newPosition !== translateX.value) {
    translateX.value = newPosition
    
    // Update current index
    currentIndex.value = Math.min(items.length - 1, currentIndex.value + 1)
    
    // Update navigation state
    updateNavigationState()
    console.log('Carousel moved to position:', translateX.value, 'Index:', currentIndex.value)
  } else {
    console.log('Cannot move further')
  }
}

/**
 * Move to the previous item
 * @public
 */
const prev = () => {
  // Safety check
  if (!itemsRef.value) return
  
  // Get all items
  const items = getCarouselItems()
  if (items.length === 0) return
  
  // Find width of previous item (if it exists)
  const prevIndex = Math.max(0, currentIndex.value - 1)
  
  let prevItemWidth = 300 // Default fallback
  if (prevIndex < items.length) {
    const prevItem = items[prevIndex] as HTMLElement
    prevItemWidth = prevItem.offsetWidth + itemGap.value
    
    console.log('Prev - Previous item details:', {
      element: prevItem,
      width: prevItem.offsetWidth,
      gap: itemGap.value,
      totalWidth: prevItemWidth
    })
  }
  
  // Calculate new position
  const newPosition = Math.min(0, translateX.value + prevItemWidth)
  
  // Only move if we're not at the start
  if (newPosition !== translateX.value) {
    translateX.value = newPosition
    currentIndex.value = prevIndex
    
    // Update navigation state
    updateNavigationState()
  }
}

onMounted(() => {
  // Initialize at the start
  translateX.value = 0
  currentIndex.value = 0
  
  // Calculate the item gap from CSS
  itemGap.value = calculateItemGap()
  
  // Initial check for navigation state
  updateNavigationState()
  
  console.log('Carousel mounted:', {
    items: getCarouselItems(),
    itemCount: getCarouselItems().length,
    gap: itemGap.value
  })
})

// Watch for content changes that might affect navigation state
watch(() => getCarouselItems().length, () => {
  updateNavigationState()
})
</script>

<style scoped>
.carousel {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: visible;
  gap: var(--space-medium);
}

.carousel__container {
  position: relative;
  width: 100%;
  overflow: visible;
}

.carousel__items {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  gap: var(--space-medium);
  transition: transform 0.3s ease;
  overflow: visible;
  width: max-content;
  min-height: 400px;
}

.carousel-item {
  transition: transform 0.3s ease;
  height: 100%;
}

.carousel__navigation {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  gap: var(--space-tiny);
  background-color: var(--bg-elevation-base);
  border-radius: var(--units-radius-for-surface-clickable);
  z-index: 10;
}

/* Force cursor styles for carousel buttons */
.carousel__navigation :deep(button[disabled]) {
  cursor: not-allowed !important;
}
</style> 