<template>
  <div class="image-block" :class="{ 'has-caption': block.caption }">
    <div class="container">
      <figure class="image-block__figure">
        <img 
          v-if="block.image" 
          :src="getImageUrl(block.image)" 
          :alt="block.alt || ''" 
          class="image-block__image"
        />
        <figcaption v-if="block.caption" class="image-block__caption">
          {{ block.caption }}
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useSanityClient } from '~/utils/sanityClient'

const props = defineProps({
  block: {
    type: Object,
    required: true
  }
})

const { urlFor } = useSanityClient()

const getImageUrl = (image) => {
  if (!image) return ''
  return urlFor(image).url()
}
</script>

<style>
.image-block {
  padding: 2rem 0;
}

.image-block__figure {
  margin: 0;
}

.image-block__image {
  width: 100%;
  height: auto;
  display: block;
}

.image-block__caption {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  opacity: 0.7;
}
</style>
