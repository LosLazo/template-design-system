<template>
  <div class="text-block">
    <div class="container grid">
      <div v-if="loading" class="text-block__loading">
        <div class="text-block__loader"></div>
      </div>
      
      <div v-else class="text-block__content split-1">
        <h2 v-if="block.title" class="headline-md">{{ block.title }}</h2>
        <div v-if="bodyTextData" class="text-block__rich-content">
          <!-- Use PortableText component for rich text content -->
          <PortableText :value="bodyTextData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import PortableText from '~/composables/components/PortableText.vue'

const props = defineProps({
  block: {
    type: Object,
    required: true
  }
})

const loading = ref(true)

// Process the body text data appropriately
const bodyTextData = computed(() => {
  if (!props.block) return null
  return props.block.bodyText || props.block.content
})

// Load any necessary data
const loadContent = () => {
  loading.value = true
  try {
    // Any additional processing can happen here
    // For example, if we need to fetch additional data for the block
  } catch (error) {
    console.error('Error loading text block content:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadContent()
})
</script>

<style>
.text-block {
  padding: 2rem 0;
  position: relative;
}

.text-block__loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
}

.text-block__loader {
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

.text-block__content {
  width: 100%;
  max-width: 60ch;
}

.text-block__rich-content {
  margin-top: 1rem;
}

.text-block__rich-content > *:not(:last-child) {
  margin-bottom: 1rem;
}
</style>
