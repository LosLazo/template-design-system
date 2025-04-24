<template>
  <section class="collection-carousel" :class="{'collection-carousel--loading': isLoading}">
    <div class="collection-carousel__container">
      <div v-if="isLoading" class="collection-carousel__loading">
        <div class="collection-carousel__loader"></div>
      </div>
      
      <div v-else-if="carouselItems.length > 0">
        <Carousel :title="block.title">
          <div 
            v-for="item in carouselItems" 
            :key="item._id" 
            class="carousel-item"
          >
            <ProjectCard
              :title="item.title"
              :description="item.description"
              :image="item.imageUrl"
              :background-color="item.backgroundColor || '#f5f5f5'"
              :aspect-ratio="aspectRatioForScreen(item.aspectRatio)"
              :orientation="item.orientation || 'landscape'"
              :link="item.link"
              class="collection-carousel__card"
            />
          </div>
        </Carousel>
      </div>
      
      <div v-else class="collection-carousel__empty">
        <p>No items found in this collection</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useSanityClient } from '~/utils/sanityClient'
import Carousel from '~/composables/components/Carousel.vue'
import ProjectCard from '~/composables/components/ProjectCard.vue'

// Props
const props = defineProps({
  block: {
    type: Object,
    required: true
  }
})

// State
const { urlFor, client: sanityClient } = useSanityClient()
const carouselItems = ref([])
const isLoading = ref(true)
const screenSize = ref('desktop')

// Computed
const contentType = computed(() => {
  if (!props.block?.collection) return null
  
  switch(props.block.collection) {
    case 'components': return 'componentPage'
    case 'patterns': return 'patternPage'
    case 'papers': return 'paperPage'
    case 'learning': return 'learningPage'
    default: return `${props.block.collection}Page`
  }
})

// Methods
const updateScreenSize = () => {
  const width = window.innerWidth
  if (width < 768) {
    screenSize.value = 'mobile'
  } else if (width < 1024) {
    screenSize.value = 'tablet'
  } else {
    screenSize.value = 'desktop'
  }
}

const aspectRatioForScreen = (aspectRatio) => {
  const defaultRatio = '16x9'
  if (!aspectRatio) return defaultRatio
  
  // On mobile, prefer shorter aspect ratios
  if (screenSize.value === 'mobile') {
    return '1x1'
  }
  
  return aspectRatio
}

// Helper function to safely get an image URL 
const getImageUrl = (image) => {
  if (!image) return ''
  
  if (image.asset) return urlFor(image).url()
  if (typeof image === 'string') return image
  if (image.url) return image.url
  
  console.warn('Unable to extract image URL from:', image)
  return ''
}

// Helper function to map items to ProjectCard format
const mapItemToCardFormat = (item, collection) => {
  // Find the best image field
  const imageField = item.mainImage || item.coverImage || item.image || null
  const imageUrl = imageField ? getImageUrl(imageField) : ''
  
  return {
    ...item,
    title: item.title || 'Untitled',
    description: item.description || '',
    imageUrl,
    backgroundColor: item.backgroundColor || '#f5f5f5',
    aspectRatio: item.aspectRatio || '16x9',
    orientation: item.orientation || 'landscape',
    link: item.slug ? `/${collection}/${item.slug}` : null,
  }
}

// Load items from Sanity
const loadItems = async () => {
  isLoading.value = true
  
  try {
    const block = props.block
    
    // Case 1: Manual selection with items
    if (block.manualSelection && block.items?.length > 0) {
      await loadManualItems(block)
    }
    // Case 2: Collection-based items 
    else if (block.collection) {
      await loadCollectionItems(block)
    } 
    // Case 3: No valid data source
    else {
      console.warn('No collection or manually selected items found in block')
      carouselItems.value = []
    }
  } catch (error) {
    console.error('Error loading carousel items:', error)
    carouselItems.value = []
  } finally {
    isLoading.value = false
  }
}

// Load manually selected items
const loadManualItems = async (block) => {
  const itemRefs = block.items.map(item => item._ref || item)
  
  const query = `*[_id in $itemRefs]{
    _id,
    title,
    subtitle,
    description,
    "slug": slug.current,
    mainImage { ..., asset-> },
    coverImage { ..., asset-> },
    backgroundColor,
    aspectRatio,
    orientation
  }`
  
  const items = await sanityClient.fetch(query, { itemRefs })
  
  if (items?.length) {
    carouselItems.value = items.map(item => mapItemToCardFormat(item, block.collection))
  } else {
    console.warn('No manual items found with the provided references')
    carouselItems.value = []
  }
}

// Load collection items
const loadCollectionItems = async (block) => {
  if (!contentType.value) return
  
  const limit = block.limit || 6
  
  const query = `*[_type == "${contentType.value}" && defined(slug) && !(_id in path('drafts.**'))][0...${limit}] | order(_createdAt desc) {
    _id,
    title,
    subtitle,
    description,
    "slug": slug.current,
    mainImage { ..., asset-> },
    coverImage { ..., asset-> },
    backgroundColor,
    aspectRatio,
    orientation
  }`
  
  const items = await sanityClient.fetch(query)
  
  if (items?.length) {
    carouselItems.value = items.map(item => mapItemToCardFormat(item, block.collection))
  } else {
    console.warn('No items found in collection')
    carouselItems.value = []
  }
}

// Lifecycle
onMounted(() => {
  updateScreenSize()
  window.addEventListener('resize', updateScreenSize)
  loadItems()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize)
})
</script>

<style scoped>
:root {
  --carousel-gap: var(--space-medium, 16px);
  --carousel-item-width-desktop: 300px;
  --carousel-item-width-tablet: 240px;
  --carousel-item-width-mobile: calc(100vw - 48px);
}

.collection-carousel {
  width: 100%;
  max-width: 100%;
  position: relative;
  box-sizing: border-box;
  margin: var(--space-large, 24px) 0;
  overflow: visible;
}

.collection-carousel__container {
  max-width: 100%;
  position: relative;
  box-sizing: border-box;
  overflow: visible;
}

.collection-carousel__item {
  position: relative;
  z-index: 1;
  max-width: 100%;
  width: var(--carousel-item-width-desktop);
  box-sizing: border-box;
}

.collection-carousel__card {
  width: var(--carousel-item-width-desktop);
  box-sizing: border-box;
}

.collection-carousel__loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.collection-carousel__loader {
  width: 40px;
  height: 40px;
  border: 4px solid var(--bg-clickable-hover);
  border-top: 4px solid var(--fg-accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.collection-carousel__empty {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: var(--fg-text-soft);
  background-color: var(--bg-surface-disabled);
  border-radius: var(--radius-medium, 8px);
  padding: var(--space-medium, 16px);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive styles */
@media screen and (max-width: 1024px) {
  .collection-carousel__card {
    width: var(--carousel-item-width-tablet);
  }
}

@media screen and (max-width: 768px) {
  .collection-carousel__card {
    width: var(--carousel-item-width-mobile);
  }
  
  .collection-carousel {
    margin: var(--space-medium, 16px) 0;
  }
}

/* Ensure the carousel navigation buttons are clickable */
:deep(.carousel__navigation) {
  z-index: 10;
  position: relative;
}

/* Ensure buttons receive click events */
:deep(.carousel__navigation button) {
  pointer-events: auto;
  cursor: pointer;
}
</style>