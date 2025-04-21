<template>
  <NuxtLayout name="default">
    <div class="container">
      <h1 class="headline-lg">Direct Sanity Test</h1>
      <div class="btn-group">
        <button @click="testFetch('badge')" :disabled="loading">Test Badge</button>
        <button @click="testFetch('avatar')" :disabled="loading">Test Avatar</button>
        <button @click="testAllComponentPages" :disabled="loading">All Components</button>
      </div>
      
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">
        <h2>Error</h2>
        <pre>{{ error }}</pre>
      </div>
      <div v-else-if="result" class="result">
        <h2>Result</h2>
        <pre>{{ JSON.stringify(result, null, 2) }}</pre>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref } from 'vue'
import { createClient } from '@sanity/client'

const loading = ref(false)
const error = ref(null)
const result = ref(null)

// Create a direct Sanity client with no environment variables
// to rule out configuration issues
const client = createClient({
  projectId: '7if5w35b',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: true
})

async function testFetch(slugValue) {
  loading.value = true
  error.value = null
  result.value = null
  
  try {
    console.log(`Testing direct fetch for slug: ${slugValue}`)
    
    // Make the direct GROQ query
    const data = await client.fetch(
      `*[_type == "componentPage" && slug.current == $slug][0]`,
      { slug: slugValue }
    )
    
    console.log('Direct fetch result:', data)
    result.value = data
  } catch (err) {
    console.error('Direct fetch error:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

async function testAllComponentPages() {
  loading.value = true
  error.value = null
  result.value = null
  
  try {
    console.log('Testing fetch for all componentPage documents')
    
    // Fetch all componentPage documents
    const data = await client.fetch(
      `*[_type == "componentPage"][0...10] {
        _id,
        title,
        "slug": slug.current
      }`
    )
    
    console.log('All componentPages result:', data)
    result.value = data
  } catch (err) {
    console.error('Fetch all error:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
}

.btn-group {
  display: flex;
  gap: var(--space-medium);
  margin-top: var(--space-large);
}

button {
  padding: 8px 16px;
  background-color: var(--bg-interactive-default);
  color: white;
  border: none;
  border-radius: var(--radius-small);
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading, .error, .result {
  margin-top: var(--space-large);
  padding: var(--space-medium);
  border-radius: var(--radius-medium);
}

.loading {
  background-color: var(--bg-surface-disabled);
  color: var(--fg-text-soft);
}

.error {
  background-color: #ffeded;
  color: #d32f2f;
}

.result {
  background-color: #f5f5f5;
}

pre {
  white-space: pre-wrap;
  overflow: auto;
  max-height: 500px;
}
</style> 