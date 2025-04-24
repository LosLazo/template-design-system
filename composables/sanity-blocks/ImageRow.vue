<template>
  <div class="image-row" :class="{'image-row--loading': loading}">
    <div class="container">
      <h2 v-if="block.title" class="image-row__title">{{ block.title }}</h2>
      
      <div v-if="loading" class="image-row__loading">
        <div class="image-row__loader"></div>
      </div>
      
      <div v-else class="image-row__grid">
        <div v-for="(image, index) in images" :key="index" class="image-row__item">
          
          <Image :src="image.url" :alt="image.alt || ''" class="image-row__image" />
          <div v-if="image.caption" class="image-row__caption">
            {{ image.caption }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSanityClient } from '~/utils/sanityClient'

const props = defineProps({
  block: {
    type: Object,
    required: true
  }
})

const { urlFor } = useSanityClient()
const loading = ref(true)
const images = ref([])

// Helper function to safely get an image URL
const getImageUrl = (image) => {
  if (!image) return ''
  
  if (image.asset) return urlFor(image).url()
  if (typeof image === 'string') return image
  if (image.url) return image.url
  
  console.warn('Unable to extract image URL from:', image)
  return ''
}

// Load and process images
const processImages = () => {
  loading.value = true
  
  try {
    if (props.block.images && props.block.images.length > 0) {
      // Process each image in the block
      images.value = props.block.images.map(image => ({
        url: getImageUrl(image),
        alt: image.alt || '',
        caption: image.caption || ''
      }))
    } else {
      console.warn('No images found in the image row block')
      images.value = []
    }
  } catch (error) {
    console.error('Error processing images:', error)
    images.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  processImages()
})
</script>

<style>
.image-row {
  padding: 2rem 0;
  position: relative;
}

.image-row--loading {
  min-height: 150px;
}

.image-row__title {
  margin-bottom: 1.5rem;
  text-align: center;
}

.image-row__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.image-row__image {
  width: 100%;
  height: auto;
  display: block;
}

.image-row__caption {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  opacity: 0.7;
}

.image-row__loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
}

.image-row__loader {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
