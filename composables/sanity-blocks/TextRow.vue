<template>
  <div class="text-row" :class="{'text-row--loading': loading}">
    <div class="container">
      <div v-if="loading" class="text-row__loading">
        <div class="text-row__loader"></div>
      </div>
      
      <div v-else class="text-row__grid split-2">
        <div v-if="block.title" class="text-row__title-column">
          <h2 class="headline-sm">{{ block.title }}</h2>
          <h2 v-if="block.subtitle" class="headline-sm color-disabled">{{ block.subtitle }}</h2>
        </div>
        <div class="text-row__content-column">
          <div v-if="bodyTextData" class="text-row__content">
            <!-- Use PortableText component to render the bodyText blocks -->
            <PortableText :value="bodyTextData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  return props.block.bodyText
})

// Load any necessary data
const loadContent = () => {
  loading.value = true
  try {
    // Any additional processing can happen here
    // For example, if we need to fetch additional data for the block
  } catch (error) {
    console.error('Error loading text row content:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadContent()
})
</script>

<style>
.text-row {
  padding: 3rem 0;
  position: relative;
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--ei-color-fg-border-discrete);
}

.text-row--loading {
  min-height: 150px;
}

.text-row__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.text-row__title {
  font-size: 1.75rem;
  margin-bottom: 1rem;
}

.text-row__title-column h2 {
  margin: 0px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.text-row__subtitle {
  margin-bottom: 1rem;
  opacity: 0.8;
}

.text-row__loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
}

.text-row__loader {
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

@media (max-width: 768px) {
  .text-row__grid {
    grid-template-columns: 1fr;
  }
}
</style>
