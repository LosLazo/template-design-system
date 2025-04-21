<template>
  <div class="collection-grid" :class="{'collection-grid--loading': loading}">
    <div class="container">
      <h3 v-if="block.title" class="collection-grid__title">{{ block.title }}</h3>
      
      <div v-if="loading" class="collection-grid__loading">
        <div class="collection-grid__loader"></div>
      </div>
      
      <div v-else-if="displayItems.length > 0" class="collection-grid__grid" :class="`collection-grid__grid--cols-${block.columns || 3}`">
        <Card 
          v-for="item in displayItems" 
          :key="item._id" 
          :headerText="item.subtitle || ''"
          :title="item.title"
          :text="item.description"
          :imageSrc="item.imageUrl"
          :imageAlt="item.title || ''"
          :href="item.link"
          class="collection-grid__card"
        />
      </div>
      
      <div v-else class="collection-grid__empty">
        <p>No items found in this collection</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSanityClient } from '~/utils/sanityClient'
import Card from '~/composables/components/Card.vue'

const props = defineProps({
  block: {
    type: Object,
    required: true
  }
})

const { urlFor, client: sanityClient } = useSanityClient()
const items = ref([])
const loading = ref(true)

// Computed content type based on collection name
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

// Helper function to safely get an image URL
const getImageUrl = (image) => {
  if (!image) return ''
  
  if (image.asset) return urlFor(image).url()
  if (typeof image === 'string') return image
  if (image.url) return image.url
  
  console.warn('Unable to extract image URL from:', image)
  return ''
}

// Helper function to map items to Card format
const mapItemToCardFormat = (item, collection) => {
  // Find the best image field
  const imageField = item.mainImage || item.coverImage || item.image || null
  const imageUrl = imageField ? getImageUrl(imageField) : ''
  
  return {
    ...item,
    title: item.title || 'Untitled',
    description: item.description || item.excerpt || '',
    imageUrl,
    link: item.slug ? `/${item.slug}` : null,
  }
}

// Load items from Sanity
const loadItems = async () => {
  loading.value = true
  
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
      items.value = []
    }
  } catch (error) {
    console.error('Error loading grid items:', error)
    items.value = []
  } finally {
    loading.value = false
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
    excerpt,
    "slug": slug.current,
    mainImage { ..., asset-> },
    coverImage { ..., asset-> },
    backgroundColor
  }`
  
  const result = await sanityClient.fetch(query, { itemRefs })
  
  if (result?.length) {
    items.value = result.map(item => mapItemToCardFormat(item, block.collection))
  } else {
    console.warn('No manual items found with the provided references')
    items.value = []
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
    excerpt,
    "slug": slug.current,
    mainImage { ..., asset-> },
    coverImage { ..., asset-> }
  }`
  
  const result = await sanityClient.fetch(query)
  
  if (result?.length) {
    items.value = result.map(item => mapItemToCardFormat(item, block.collection))
  } else {
    console.warn('No items found in collection')
    items.value = []
  }
}

const displayItems = computed(() => {
  return items.value.slice(0, props.block.limit || 6)
})

onMounted(() => {
  loadItems()
})
</script>

<style>
.collection-grid {
  padding: 3rem 0;
  position: relative;
}

.collection-grid--loading {
  min-height: 200px;
}

.collection-grid__title {
  margin-bottom: 2rem;
  text-align: left;
}

.collection-grid__loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.collection-grid__loader {
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

.collection-grid__grid {
  display: grid;
  gap: 2rem;
}

.collection-grid__grid--cols-2 {
  grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
}

.collection-grid__grid--cols-3 {
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}

.collection-grid__grid--cols-4 {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

.collection-grid__empty {
  text-align: center;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .collection-grid__grid {
    grid-template-columns: 1fr;
  }
}
</style>
