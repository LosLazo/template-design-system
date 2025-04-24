<template>
  <NuxtLayout name="default">
    <div class="container">
      <h1 class="headline-lg">Sanity Connection Test</h1>
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="results">
        <h2 class="headline-sm">Connection successful!</h2>
        
        <div class="section">
          <h3 class="title-md">Content Type Mapping:</h3>
          <pre>{{ contentTypeMapping }}</pre>
        </div>
        
        <div class="section">
          <h3 class="title-md">Available Content Types:</h3>
          <pre>{{ contentTypes }}</pre>
        </div>
        
        <div class="section">
          <h3 class="title-md">Sample Content:</h3>
          <pre>{{ content }}</pre>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSanityClient, CONTENT_TYPES } from '~/utils/sanity'

const loading = ref(true)
const error = ref(null)
const content = ref(null)
const contentTypes = ref(null)
const contentTypeMapping = ref(CONTENT_TYPES)

onMounted(async () => {
  try {
    // Use our utility function that properly handles the token
    const client = useSanityClient()
    
    // Get content type counts
    try {
      const types = [
        CONTENT_TYPES.component,
        CONTENT_TYPES.paper,
        CONTENT_TYPES.learning,
        CONTENT_TYPES.pattern
      ]
      
      const counts = await client.fetch(`{
        "component": count(*[_type == $componentType]),
        "paper": count(*[_type == $paperType]),
        "learning": count(*[_type == $learningType]),
        "pattern": count(*[_type == $patternType])
      }`, {
        componentType: CONTENT_TYPES.component,
        paperType: CONTENT_TYPES.paper,
        learningType: CONTENT_TYPES.learning,
        patternType: CONTENT_TYPES.pattern
      })
      contentTypes.value = counts
    } catch (err) {
      contentTypes.value = `Error fetching types: ${err.message}`
    }
    
    // Get a sample of all content
    try {
      const types = [
        CONTENT_TYPES.component,
        CONTENT_TYPES.paper,
        CONTENT_TYPES.learning,
        CONTENT_TYPES.pattern
      ]
      const sample = await client.fetch('*[_type in $types][0...2]', { types })
      content.value = JSON.stringify(sample, null, 2)
    } catch (err) {
      content.value = `Error fetching content: ${err.message}`
    }
    
    loading.value = false
  } catch (err) {
    error.value = `Error connecting to Sanity: ${err.message}`
    loading.value = false
    console.error(err)
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