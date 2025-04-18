<template>
  <div 
    class="project-card"
    :class="{ 'project-card--interactive': interactive }"
    @click="$emit('click')"
  >
    <div class="project-card__aspect-container">
      <div class="project-card__content" :style="{ aspectRatio: aspectRatio }">
        <div class="project-card__image-wrapper">
          <Image
            v-if="image"
            :src="image"
            :alt="title"
            class="project-card__image"
          />
          <div 
            v-else-if="backgroundColor" 
            class="project-card__color-bg"
            :style="{ backgroundColor }"
          ></div>
        </div>
        <div class="project-card__footer">
          <h2 class="title-sm project-card__title">{{ title }}</h2>
          <Icon 
            name="arrow-right"
            :size="20"
            class="project-card__arrow"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Image from './Image.vue'
import Icon from './Icon.vue'

interface Props {
  title: string
  image?: string
  backgroundColor?: string
  interactive?: boolean
  aspectRatio?: string
}

const props = withDefaults(defineProps<Props>(), {
  interactive: false,
  aspectRatio: '4/5'
})

defineEmits<{
  (e: 'click'): void
}>()
</script>

<style scoped>
.project-card {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--bg-surface);
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-card__aspect-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 100%;
  overflow: hidden;
}

.project-card__content {
  position: relative;
  height: 100%;
  max-height: 100%;
  width: auto;
}

.project-card__image-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.project-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1), filter 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  filter: grayscale(100%);
}

.project-card__color-bg {
  width: 100%;
  height: 100%;
  transition: opacity 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.project-card--interactive {
  cursor: pointer;
}

.project-card--interactive:hover .project-card__image {
  transform: scale(1.05);
  filter: grayscale(0%);
}

.project-card--interactive:hover .project-card__color-bg {
  opacity: 0.8;
}

.project-card--interactive:hover .project-card__arrow {
  transform: translateX(4px);
}

.project-card__footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--space-small);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--permanent-white) !important;
  z-index: 1;
}

.project-card__title {
  margin: 0;
  font-weight: 500;
}

.project-card__arrow {
  transition: transform 0.3s ease;
}
</style> 