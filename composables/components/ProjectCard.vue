<template>
  <NuxtLink 
    v-if="link"
    :to="link"
    class="project-card"
    :class="{ 'project-card--interactive': interactive }"
  >
    <div class="project-card__aspect-container">
      <div class="project-card__content" :style="{ aspectRatio: aspectRatio }">
        <div class="project-card__image-wrapper">
          <Image
            :src="image"
            :alt="title"
            :backgroundColor="backgroundColor"
            class="project-card__image"
          />
        </div>
        <div class="project-card__footer">
          <h2 class="body-md project-card__title">{{ title }}</h2>
          <Icon 
            name="arrow-right"
            :size="20"
            class="project-card__arrow"
          />
        </div>
      </div>
    </div>
  </NuxtLink>
  <div 
    v-else
    class="project-card"
    :class="{ 'project-card--interactive': interactive }"
    @click="$emit('click')"
  >
    <div class="project-card__aspect-container">
      <div class="project-card__content" :style="{ aspectRatio: aspectRatio }">
        <div class="project-card__image-wrapper">
          <Image
            :src="image"
            :alt="title"
            :backgroundColor="backgroundColor"
            class="project-card__image"
          />
        </div>
        <div class="project-card__footer">
          <h2 class="body-md project-card__title">{{ title }}</h2>
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
import { computed } from 'vue'

/**
 * @component ProjectCard
 * @description A card component for displaying project information with an image and title.
 * Features interactive hover effects and can function as a link or clickable element.
 * @example
 * <ProjectCard
 *   title="Project Name"
 *   image="/path/to/image.jpg"
 *   link="/projects/project-name"
 *   interactive
 * />
 */

interface Props {
  /**
   * The title of the project
   */
  title: string
  
  /**
   * URL or path to the project image
   */
  image?: string
  
  /**
   * Background color for the image area when image is loading or unavailable
   */
  backgroundColor?: string
  
  /**
   * Whether the card should have hover effects
   * @default false
   */
  interactive?: boolean
  
  /**
   * Aspect ratio of the card
   * @default '4x5'
   */
  aspectRatio?: '1x1' | '16x9' | '4x3' | '4x5' | '3x2'
  
  /**
   * Orientation of the card
   * @default 'landscape'
   */
  orientation?: 'landscape' | 'portrait'
  
  /**
   * URL or path for the card to link to
   */
  link?: string
}

const props = withDefaults(defineProps<Props>(), {
  interactive: false,
  aspectRatio: '4x5',
  orientation: 'landscape'
})

/**
 * Calculated aspect ratio for CSS
 * @private
 */
const computedAspectRatio = computed(() => {
  if (!props.aspectRatio) return '1/1';
  
  // Handle both old format (4/5) and new format (4x5)
  let width, height;
  
  if (props.aspectRatio.includes('x')) {
    [width, height] = props.aspectRatio.split('x');
  } else if (props.aspectRatio.includes('/')) {
    [width, height] = props.aspectRatio.split('/');
  } else {
    return '1/1'; // Default fallback
  }
  
  // If in portrait mode, invert the ratio
  return props.orientation === 'portrait' 
    ? `${height}/${width}` 
    : `${width}/${height}`;
})

/**
 * Define emitted events
 */
defineEmits<{
  /**
   * Emitted when the card is clicked (only when no link is provided)
   */
  (e: 'click'): void
}>()
</script>

<style scoped>
.project-card {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--ei-color-bg-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: inherit;
}

.project-card__aspect-container {
  height: 100%;
  width: 100%;
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
  width: 100%;
  aspect-ratio: v-bind(computedAspectRatio);
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
  transition: transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1), filter 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  /* filter: grayscale(100%); */
}

.project-card--interactive {
  cursor: pointer;
}

.project-card--interactive:hover .project-card__image {
  transform: scale(1.05);
  filter: grayscale(0%);
}

.project-card--interactive:hover .project-card__arrow {
  transform: translateX(4px);
}

.project-card__footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--ei-dimension-space-small);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--ei-color-fg-text-strong) !important;
  z-index: 1;
}

.project-card__title {
  margin: 0;
  font-weight: 500;
}

.project-card__arrow {
  transition: transform 0.3s ease;
}

/* Add this class for component page context */
.three-col-block .project-card {
  align-items: flex-start;
}

.three-col-block .project-card__aspect-container {
  align-items: flex-start;
}

.three-col-block .project-card__content {
  height: auto;
}
</style> 