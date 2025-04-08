<template>
  <div 
    class="card"
    :class="{ 'card--link': href }"
    :style="cardStyle"
  >
    <Image
      v-if="imageSrc"
      :src="imageSrc"
      :alt="imageAlt || ''"
      :aspect-ratio="imageAspectRatio"
      :orientation="imageOrientation"
      class="card__image"
    />
    <div class="card__content">
      <div class="card__header">
        <p v-if="headerText" class="body-sm-loud">{{headerText }}</p>
        <p v-if="subheaderText" class="body-sm color-soft">{{ subheaderText }}</p>
      </div>
      <p v-if="bodyText" class="body-sm color-soft">{{ bodyText }}</p>
      <div v-if="$slots.actions" class="card__actions">
        <slot name="actions"></slot>
      </div>
    </div>
    <Icon 
      v-if="href"
      name="arrow-right"
      :size="24"
      class="card__link-icon"
    />
  </div>
</template>

<script setup lang="ts">
import Image from './Image.vue'
import Icon from './Icon.vue'
import { computed } from 'vue'

type WidthValue = number | `${number}` | `span ${number}`

interface Props {
  headerText?: string
  subheaderText?: string
  bodyText?: string
  imageSrc?: string
  imageAlt?: string
  imageAspectRatio?: '16x9' | '5x4' | '4x3' | '1x1'
  imageOrientation?: 'landscape' | 'portrait'
  href?: string
  width?: WidthValue
}

const props = defineProps<Props>()

const cardStyle = computed(() => {
  if (!props.width) return {}
  
  if (typeof props.width === 'number' || !props.width.startsWith('span')) {
    return { width: typeof props.width === 'number' ? `${props.width}px` : props.width }
  }
  
  return { gridColumn: props.width }
})
</script>

<style lang="css" scoped>
.card {
  position: relative;
  border-radius: 8px;
  transition: transform 0.2s ease;
}

.card--link {
  cursor: pointer;
}

.card--link:hover {
  transform: translateY(-4px);
}

.card__image {
  width: 100%;
}

.card__header {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: var(--space-tiny);
}

.card__content {
    padding: var(--space-medium);
    gap: var(--space-small);
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 24px 24px 24px 0px;
    text-align: left;
}

.card__actions {
  display: flex;
  gap: var(--space-small);
  margin-top: var(--space-small);
}

.card__link-icon {
  position: absolute;
  bottom: var(--space-medium);
  right: var(--space-medium);
  color: var(--fg-text-strong);
}
</style> 