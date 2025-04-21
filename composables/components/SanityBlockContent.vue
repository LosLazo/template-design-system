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

<script setup>
import { defineProps } from 'vue'

// Import all block components
import CollectionCarousel from '~/composables/sanity-blocks/CollectionCarousel.vue'
import CollectionGrid from '~/composables/sanity-blocks/CollectionGrid.vue'
import ImageBlock from '~/composables/sanity-blocks/ImageBlock.vue'
import ImageRow from '~/composables/sanity-blocks/ImageRow.vue'
import TextBlock from '~/composables/sanity-blocks/TextBlock.vue'
import TextRow from '~/composables/sanity-blocks/TextRow.vue'
import TextShowcase from '~/composables/sanity-blocks/TextShowcase.vue'

const props = defineProps({
  blocks: {
    type: Array,
    required: true
  }
})

// Map Sanity block types to components
const getComponentType = (block) => {
  if (!block || !block._type) return null

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