<template>
  <div class="carousel">
    <h2 v-if="title" class="body-xl">{{ title }}</h2>
    <div class="carousel__container">
      <div 
        class="carousel__items" 
        :style="{ transform: `translateX(${translateX}px)` }"
      >
        <slot></slot>
      </div>
      <div 
        v-if="showNavigation" 
        class="carousel__navigation"
      >
        <Button
          variant="secondary"
          size="small"
          prefixIcon="chevron-left"
          :disabled="!canGoPrev"
          @click="goPrev"
        />
        <Button
          variant="secondary"
          size="small"
          prefixIcon="chevron-right"
          :disabled="!canGoNext"
          @click="goNext"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Button from './Button.vue'

interface Props {
  title?: string
  infinite?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  infinite: false
})

const currentIndex = ref(0)
const translateX = ref(0)
const containerWidth = ref(0)
const itemWidth = ref(0)
const totalItems = ref(0)

const showNavigation = computed(() => {
  return totalItems.value > 0 && containerWidth.value < (itemWidth.value * totalItems.value)
})

const canGoPrev = computed(() => {
  return props.infinite || currentIndex.value > 0
})

const canGoNext = computed(() => {
  if (props.infinite) return true
  const maxTranslate = -(totalItems.value * itemWidth.value - containerWidth.value)
  return translateX.value > maxTranslate
})

const updateDimensions = () => {
  const container = document.querySelector('.carousel__container')
  const items = document.querySelector('.carousel__items')
  if (container && items) {
    containerWidth.value = container.clientWidth
    itemWidth.value = items.children[0]?.clientWidth || 0
    totalItems.value = items.children.length
  }
}

const goPrev = () => {
  if (!canGoPrev.value) return
  
  if (currentIndex.value === 0 && props.infinite) {
    currentIndex.value = totalItems.value - 1
  } else {
    currentIndex.value--
  }
  translateX.value = -currentIndex.value * itemWidth.value
}

const goNext = () => {
  if (!canGoNext.value) return
  
  if (currentIndex.value === totalItems.value - 1 && props.infinite) {
    currentIndex.value = 0
    translateX.value = 0
  } else {
    currentIndex.value++
    // Calculate the maximum allowed translation
    const maxTranslate = -(totalItems.value * itemWidth.value - containerWidth.value)
    translateX.value = Math.max(maxTranslate, -currentIndex.value * itemWidth.value)
  }
}

onMounted(() => {
  updateDimensions()
  window.addEventListener('resize', updateDimensions)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDimensions)
})
</script>

<style scoped>
.carousel {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: visible;
  gap: var(--space-tiny);
}

.carousel__container {
  position: relative;
  width: 100%;
  overflow: visible;
  padding-bottom: var(--space-large); /* Add space for navigation */
}

.carousel__items {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  gap: var(--space-medium);
  transition: transform 0.3s ease;
  padding: var(--space-small) 0;
  overflow: visible;
  width: max-content; /* Allow the content to determine the width */
}

.carousel__navigation {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  gap: var(--space-tiny);
  background-color: var(--bg-elevation-base);
  border-radius: var(--units-radius-for-surface-clickable);
}
</style> 