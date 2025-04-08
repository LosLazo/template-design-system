<template>
  <div 
    class="image-container"
    :class="[
      `image-container--${aspectRatio}`,
      { 'image-container--portrait': isPortrait }
    ]"
  >
    <img
      :src="src"
      :alt="alt"
      class="image"
    />
  </div>
</template>

<script setup lang="ts">
type AspectRatio = '16x9' | '5x4' | '4x3' | '1x1'
type Orientation = 'landscape' | 'portrait'

interface Props {
  src: string
  alt: string
  aspectRatio?: AspectRatio
  orientation?: Orientation
}

const props = withDefaults(defineProps<Props>(), {
  aspectRatio: '16x9',
  orientation: 'landscape'
})

const isPortrait = computed(() => props.orientation === 'portrait')
</script>

<style lang="css" scoped>
.image-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Aspect ratio classes */
.image-container--16x9 {
  padding-bottom: 56.25%; /* 9/16 = 0.5625 */
}

.image-container--5x4 {
  padding-bottom: 80%; /* 4/5 = 0.8 */
}

.image-container--4x3 {
  padding-bottom: 75%; /* 3/4 = 0.75 */
}

.image-container--1x1 {
  padding-bottom: 100%; /* 1/1 = 1 */
}

/* Portrait mode adjustments */
.image-container--portrait {
  padding-bottom: 0;
  padding-top: var(--aspect-ratio-padding);
}

.image-container--portrait.image-container--16x9 {
  --aspect-ratio-padding: 177.78%; /* 16/9 = 1.7778 */
}

.image-container--portrait.image-container--5x4 {
  --aspect-ratio-padding: 125%; /* 5/4 = 1.25 */
}

.image-container--portrait.image-container--4x3 {
  --aspect-ratio-padding: 133.33%; /* 4/3 = 1.3333 */
}

.image-container--portrait.image-container--1x1 {
  --aspect-ratio-padding: 100%; /* 1/1 = 1 */
}
</style> 