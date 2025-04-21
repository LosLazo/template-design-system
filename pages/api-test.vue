<template>
  <NuxtLayout name="default">
    <div class="container">
      <h1 class="headline-lg">Sanity API Test</h1>
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="results">
        <h2 class="headline-sm">API Response</h2>
        
        <div class="section">
          <h3 class="title-md">Configuration:</h3>
          <pre>{{ apiData.config }}</pre>
        </div>
        
        <div class="section">
          <h3 class="title-md">Content Counts:</h3>
          <pre>{{ apiData.counts }}</pre>
        </div>
        
        <div class="section">
          <h3 class="title-md">Sample Content:</h3>
          <pre>{{ JSON.stringify(apiData.sample, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const loading = ref(true)
const error = ref(null)
const apiData = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('/api/sanity-test')
    const data = await response.json()
    
    if (data.success) {
      apiData.value = data
    } else {
      error.value = data.error || 'Unknown error'
    }
    
    loading.value = false
  } catch (err) {
    error.value = err.message
    loading.value = false
    console.error('Error fetching API:', err)
  }
})
</script>

<style scoped>
.container {
  margin: 0 auto;
}

.loading, .error {
  margin-top: var(--space-large);
  padding: var(--space-medium);
  border-radius: var(--radius-medium);
  font-size: 1.2rem;
}

.loading {
  background-color: var(--bg-surface-disabled);
  color: var(--fg-text-soft);
}

.error {
  background-color: #ffeded;
  color: #d32f2f;
}

.results {
  margin-top: var(--space-large);
}

.section {
  margin-top: var(--space-large);
  margin-bottom: var(--space-large);
}

pre {
  background: var(--bg-surface-disabled);
  padding: var(--space-medium);
  border-radius: var(--radius-medium);
  overflow: auto;
  max-height: 300px;
  white-space: pre-wrap;
}
</style> 