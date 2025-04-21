<template>
  <div class="text-showcase" :class="[
    {'text-showcase--loading': loading},
    `text-showcase--align-${block.align || 'center'}`,
    `text-showcase--size-${block.fontSize || 'medium'}`
  ]">
    <div class="grid">
      <div v-if="loading" class="text-showcase__loading">
        <div class="text-showcase__loader"></div>
      </div>
      
      <div v-else class="text-showcase__content split-1">
        <div v-if="block.text" class="headline-md">
          {{ block.text }}
        </div>
        <div v-if="block.author" class="author-block">
          <Avatar shape="squircle" size="48" src="https://images.unsplash.com/photo-1570158268183-d296b2892211?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Author" />
          <div>
            <p class="color-strong" style="margin-top: 0px;"> {{ block.author }}</p>
            <p class="color-soft" style="margin-top: 0px;"> {{ block.authorTitle }} </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  block: {
    type: Object,
    required: true
  }
})

const loading = ref(true)

// Load and process content
const loadContent = () => {
  loading.value = true
  try {
    // Process block data if needed
  } catch (error) {
    console.error('Error loading text showcase content:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadContent()
})
</script>

<style>
.text-showcase {
  padding: 4rem 0;
  position: relative;
}

.text-showcase--loading {
  min-height: 200px;
}

.text-showcase--align-left {
  text-align: left;
}

.text-showcase--align-center {
  text-align: center;
}

.text-showcase--align-right {
  text-align: right;
}

.text-showcase__loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.text-showcase__loader {
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

.text-showcase__content {
}

.text-showcase__text {
  margin-bottom: 2rem;
  font-style: italic;
}

.text-showcase--size-small .text-showcase__text {
  font-size: 1.25rem;
}

.text-showcase--size-medium .text-showcase__text {
  font-size: 1.75rem;
}

.text-showcase--size-large .text-showcase__text {
  font-size: 2.25rem;
}

.text-showcase__author {
  opacity: 0.8;
}

.text-showcase__author-name {
  font-weight: bold;
}

.text-showcase__author-title {
  font-size: 0.9rem;
}
</style>
