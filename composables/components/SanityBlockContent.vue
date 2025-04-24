<template>
  <div class="block-content">
    <template v-for="(block, index) in blocks" :key="index">
      <component
        v-if="getComponentType(block)"
        :is="getComponentType(block)"
        :block="block"
      />
      <pre v-else>{{ JSON.stringify(block, null, 2) }}</pre>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

/**
 * @component SanityBlockContent
 * @description Renders content blocks from Sanity CMS by mapping them to appropriate Vue components.
 * This component serves as a renderer for structured content from Sanity, supporting various block types.
 * 
 * @example <SanityBlockContent :blocks="pageContent.blocks" />
 * @example <SanityBlockContent :blocks="article.content" />
 */

// Import all block components
import CollectionCarousel from '~/composables/sanity-blocks/CollectionCarousel.vue'
import CollectionGrid from '~/composables/sanity-blocks/CollectionGrid.vue'
import ImageBlock from '~/composables/sanity-blocks/ImageBlock.vue'
import ImageRow from '~/composables/sanity-blocks/ImageRow.vue'
import TextBlock from '~/composables/sanity-blocks/TextBlock.vue'
import TextRow from '~/composables/sanity-blocks/TextRow.vue'
import TextShowcase from '~/composables/sanity-blocks/TextShowcase.vue'

/**
 * SanityBlockContent component props
 * @typedef {Object} SanityBlockContentProps
 */
const props = defineProps({
  /**
   * Array of content blocks from Sanity CMS
   * Each block should have a _type property that maps to a component
   * @type {Array}
   * @required
   */
  blocks: {
    type: Array,
    required: true
  }
})

/**
 * Maps a Sanity block type to its corresponding Vue component
 * @param {Object} block - Sanity content block
 * @returns {Component|null} Vue component for the block type or null if not found
 */
const getComponentType = (block) => {
  if (!block || !block._type) return null

  /**
   * Mapping of Sanity block types to Vue components
   * @type {Object.<string, Component>}
   */
  const typeComponentMap = {
    'collectionCarousel': CollectionCarousel,
    'collectionCarouselBlock': CollectionCarousel,
    'collectionGrid': CollectionGrid,
    'collectionGridBlock': CollectionGrid,
    'imageBlock': ImageBlock,
    'imageRow': ImageRow,
    'imageRowBlock': ImageRow,
    'textBlock': TextBlock,
    'richTextBlock': TextBlock,
    'textRow': TextRow,
    'textRowBlock': TextRow,
    'textShowcase': TextShowcase,
    'textShowcaseBlock': TextShowcase
  }

  return typeComponentMap[block._type] || null
}
</script>

<style>
.block-content {
  width: 100%;
}

.block-content > *:not(:last-child) {
  margin-bottom: 2rem;
  width: 100%;
}
</style> 