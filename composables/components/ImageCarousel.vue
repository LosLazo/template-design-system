<template>
  <div class="image-carousel">
    <div class="image-carousel__content">
      <div class="image-carousel__image-container">
        <Image
          v-for="(item, index) in items"
          :key="index"
          :src="item.image"
          :alt="item.title"
          class="image-carousel__image"
          :class="{ 'image-carousel__image--active': currentIndex === index }"
        />
      </div>
      <div class="image-carousel__overlay image-carousel__overlay--top">
        <div class="image-carousel__title">
          <h2 class="title-lg">{{ currentItem.title }}</h2>
        </div>
      </div>
      <div class="image-carousel__overlay image-carousel__overlay--bottom">
        <div class="image-carousel__pagination">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="image-carousel__pagination-item"
            :class="{ 'image-carousel__pagination-item--active': currentIndex === index }"
            @click="setCurrentIndex(index)"
          >
            <ProgressBar
              :progress="getStepProgress(index)"
              :looping="false"
              class="image-carousel__progress"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Image from './Image.vue'
import ProgressBar from './ProgressBar.vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  },
  interval: {
    type: Number,
    default: 5000
  }
})

const currentIndex = ref(0)
const progress = ref(0)
const completedSteps = ref(new Set())
let animationFrame

const currentItem = computed(() => props.items[currentIndex.value])

const getStepProgress = (index) => {
  if (completedSteps.value.has(index)) return 100
  if (currentIndex.value === index) return progress.value
  return 0
}

const setCurrentIndex = (index) => {
  // Set all steps before the clicked index to completed
  for (let i = 0; i < index; i++) {
    completedSteps.value.add(i)
  }
  
  // Clear all completed steps from the clicked index onwards
  for (let i = index; i < props.items.length; i++) {
    completedSteps.value.delete(i)
  }
  
  currentIndex.value = index
  progress.value = 0
  startAnimation()
}

const startAnimation = () => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }

  const startTime = performance.now()
  const duration = props.interval

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime
    progress.value = Math.min((elapsed / duration) * 100, 100)

    if (progress.value < 100) {
      animationFrame = requestAnimationFrame(animate)
    } else {
      completedSteps.value.add(currentIndex.value)
      
      if (completedSteps.value.size === props.items.length) {
        // All steps completed, reset everything
        completedSteps.value.clear()
        currentIndex.value = 0
        progress.value = 0
      } else {
        // Move to next incomplete step
        let nextIndex = (currentIndex.value + 1) % props.items.length
        while (completedSteps.value.has(nextIndex)) {
          nextIndex = (nextIndex + 1) % props.items.length
        }
        currentIndex.value = nextIndex
        progress.value = 0
      }
      
      startAnimation()
    }
  }

  animationFrame = requestAnimationFrame(animate)
}

onMounted(() => {
  startAnimation()
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>

<style scoped>
.image-carousel {
  width: 100%;
  position: relative;
}

.image-carousel__content {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: var(--ei-dimension-radius-medium);
}

.image-carousel__image-container {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
}

.image-carousel__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.image-carousel__image--active {
  opacity: 1;
}

.image-carousel__overlay {
  position: absolute;
  left: 0;
  right: 0;
  padding: var(--ei-dimension-space-small);
  color: var(--ei-color-permanent-white) !important;
}

.image-carousel__overlay--top {
  top: 0;
}

.image-carousel__overlay--bottom {
  bottom: 0;
}

.image-carousel__title {
  margin-bottom: var(--ei-dimension-space-medium);
}

.image-carousel__pagination {
  display: flex;
  gap: var(--ei-dimension-space-small);
  border-radius: var(--ei-dimension-radius-medium);
  width: fit-content;
}

.image-carousel__pagination-item {
  flex: 0 0 64px;
  cursor: pointer;
  height: 4px;
  background-color: transparent;
  border-radius: var(--ei-dimension-radius-small);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-carousel__progress {
  height: 100%;
  width: 100%;
}
</style> 