<template>
  <NuxtLayout name="default">
    <div class="container">
      <h1 class="headline-lg">Sanity Content Debug</h1>
      
      <div class="search-form">
        <div class="form-row">
          <label for="content-type">Content Type:</label>
          <select id="content-type" v-model="contentType">
            <option value="componentPage">Component</option>
            <option value="paperPage">Paper</option>
            <option value="learningPage">Learning</option>
            <option value="patternPage">Pattern</option>
            <option value="custom">Custom Type</option>
          </select>
          <input 
            v-if="contentType === 'custom'" 
            type="text" 
            placeholder="Enter custom type" 
            v-model="customType"
          />
        </div>
        
        <div class="form-row">
          <label for="slug">Slug (optional):</label>
          <input type="text" id="slug" v-model="slug" placeholder="e.g., badge"/>
        </div>
        
        <button @click="fetchContent" :disabled="loading">Fetch Content</button>
      </div>
      
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else-if="data" class="results">
        <h2 class="headline-sm">Results</h2>
        
        <div class="result-info">
          <p><strong>Content Type:</strong> {{ data.params.type }}</p>
          <p v-if="data.params.slug"><strong>Slug:</strong> {{ data.params.slug }}</p>
        </div>
        
        <div class="section">
          <h3 class="title-md">All Document Types in Dataset:</h3>
          <pre>{{ data.allDocumentTypes }}</pre>
        </div>
        
        <div class="section">
          <h3 class="title-md">Content:</h3>
          <pre>{{ JSON.stringify(data.result, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const contentType = ref('componentPage')
const customType = ref('')
const slug = ref('')
const loading = ref(false)
const error = ref(null)
const data = ref(null)

const fetchContent = async () => {
  loading.value = true
  error.value = null
  data.value = null
  
  try {
    const type = contentType.value === 'custom' ? customType.value : contentType.value
    const url = `/api/debug-content?type=${encodeURIComponent(type)}${slug.value ? `&slug=${encodeURIComponent(slug.value)}` : ''}`
    
    const response = await fetch(url)
    const result = await response.json()
    
    if (result.success) {
      data.value = result
    } else {
      error.value = result.error || 'Unknown error'
    }
  } catch (err) {
    error.value = err.message
    console.error('Error fetching data:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
}

.search-form {
  margin-top: var(--space-large);
  padding: var(--space-medium);
  background-color: var(--bg-surface-disabled);
  border-radius: var(--radius-medium);
}

.form-row {
  display: flex;
  align-items: center;
  margin-bottom: var(--space-medium);
  gap: var(--space-medium);
}

.form-row label {
  min-width: 150px;
}

.form-row select,
.form-row input {
  padding: 8px 12px;
  border: 1px solid var(--fg-border-disabled);
  border-radius: var(--radius-small);
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

.result-info {
  margin-top: var(--space-medium);
  padding: var(--space-medium);
  background-color: var(--bg-surface-disabled);
  border-radius: var(--radius-medium);
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
  max-height: 500px;
  white-space: pre-wrap;
}
</style> 