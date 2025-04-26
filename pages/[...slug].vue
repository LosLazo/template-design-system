<template>
  <!-- This is just a wrapper component that will render the appropriate template -->
  <component :is="contentTemplate" v-if="content" :content="content" />
  <div v-else-if="error" class="error">
    <h1>Error</h1>
    <p>{{ error }}</p>
    <div v-if="debug" class="debug">
      <h3>Debug Information:</h3>
      <pre>{{ debug }}</pre>
      <div class="debug-links">
        <a :href="`/api/debug-content?slug=${encodeURIComponent(currentSlug)}`" target="_blank">
          View Raw API Data
        </a>
        <a href="/test-direct" target="_blank">Test Direct Connection</a>
        <a href="/debug" target="_blank">Debug Utility</a>
      </div>
    </div>
  </div>
  <div v-else class="loading">
    Loading... <span v-if="currentSlug">(Slug: {{ currentSlug }})</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { createClient } from '@sanity/client'

// Page components for different content types
import ComponentsTemplate from '~/composables/templates/ComponentsTemplate.vue'
import PaperTemplate from '~/composables/templates/PaperTemplate.vue'
import LearningTemplate from '~/composables/templates/LearningTemplate.vue'
import PatternTemplate from '~/composables/templates/PatternTemplate.vue'

const route = useRoute()
const content = ref(null)
const contentType = ref(null)
const error = ref(null)
const currentSlug = ref('')
const debug = ref(null)

// Create a direct Sanity client
const client = createClient({
  projectId: '7if5w35b',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: true
})

// Compute the template to use based on the content type
const contentTemplate = computed(() => {
  if (!contentType.value) return ComponentsTemplate // Default template
  
  switch (contentType.value) {
    case 'paper':
    case 'paperPage':
      return PaperTemplate
    case 'learning':
    case 'learningPage':
      return LearningTemplate
    case 'pattern':
    case 'patternPage':
      return PatternTemplate
    case 'component':
    case 'componentPage':
    default:
      return ComponentsTemplate
  }
})

onMounted(async () => {
  try {
    console.log('Route params:', route.params);
    
    // Extract the slug from the route params
    const slug = Array.isArray(route.params.slug) 
      ? route.params.slug.join('/') 
      : route.params.slug
    
    currentSlug.value = slug
    console.log('Fetching content for slug:', slug);
    
    // Collect debug info
    const debugInfo = {
      slug,
      contentTypes: CONTENT_TYPES,
      attempts: []
    };
    
    // Create array of content types to try
    const typesToTry = [
      { type: 'component', sanityType: CONTENT_TYPES.component },
      { type: 'paper', sanityType: CONTENT_TYPES.paper },
      { type: 'learning', sanityType: CONTENT_TYPES.learning },
      { type: 'pattern', sanityType: CONTENT_TYPES.pattern }
    ];
    
    // Try each content type with direct client
    let pageContent = null;
    
    for (const { type, sanityType } of typesToTry) {
      try {
        console.log(`Trying direct query for ${sanityType} with slug "${slug}"`);
        const query = `*[_type == "${sanityType}" && slug.current == "${slug}"][0]`;
        const result = await client.fetch(query);
        
        debugInfo.attempts.push({
          type,
          sanityType,
          query,
          success: !!result
        });
        
        if (result) {
          pageContent = result;
          contentType.value = type;
          console.log(`Found content with type: ${type}`);
          break;
        }
      } catch (err) {
        debugInfo.attempts.push({
          type,
          sanityType,
          error: err.message
        });
        console.error(`Error fetching ${type}:`, err);
      }
    }
    
    // Set the content for the template
    if (pageContent) {
      // Map pageBuilder to blocks if it exists
      if (pageContent.pageBuilder && !pageContent.blocks) {
        pageContent.blocks = pageContent.pageBuilder;
      }
      content.value = pageContent;
      contentType.value = pageContent._type || contentType.value;
      console.log('Content found with type:', contentType.value);
    } else {
      // Try one more time with a broader query to see what's available
      try {
        const availableSlugs = await client.fetch(
          `*[slug.current != null] { _type, "slug": slug.current }[0...10]`
        );
        
        debugInfo.availableSlugs = availableSlugs;
        console.log('Available slugs:', availableSlugs);
        
        // Handle 404 case
        error.value = `Content not found for slug: ${slug}`;
        debug.value = debugInfo;
        console.error('Content not found');
      } catch (err) {
        console.error('Error fetching available slugs:', err);
        debugInfo.availableSlugsError = err.message;
        
        error.value = `Content not found for slug: ${slug}`;
        debug.value = debugInfo;
      }
    }
  } catch (err) {
    error.value = `Error loading content: ${err.message}`;
    debug.value = { error: err.message, stack: err.stack };
    console.error('Error fetching content:', err);
  }
})
</script>

<style scoped>
.loading, .error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  width: 100%;
  font-size: 1.5rem;
  color: var(--ei-color-fg-text-soft);
  padding: 2rem;
}

.error {
  color: red;
}

.debug {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f5f5f5;
  color: #333;
  font-size: 0.9rem;
  width: 100%;
  max-width: 800px;
  text-align: left;
  overflow: auto;
  border-radius: 4px;
}

.debug pre {
  white-space: pre-wrap;
  font-family: monospace;
}

.debug-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.debug-links a {
  color: blue;
  text-decoration: underline;
}
</style> 