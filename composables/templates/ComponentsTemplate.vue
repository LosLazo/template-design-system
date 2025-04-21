<template>
  <NuxtLayout name="default">
    <Breadcrumb />
    <div class="hero-section">
      <h1 class="headline-lg" style="max-width: 20ch;">{{ componentData?.title || content.title || 'Component' }}</h1>
      <p v-if="componentData?.description" class="body-lg">{{ componentData.description }}</p>
    </div> 
    <div class="component__cms-content">
      
      <!-- Loading state with spinner -->
      <div v-if="loading" class="components__loading">
        <Spinner size="large" color="var(--color-primary)" />
        <p class="components__loading-text">Loading component data...</p>
      </div>
        
      <!-- Error state with debug info -->
      <div v-else-if="error" class="components__error">
        <p>{{ error }}</p>
        <div v-if="isDev" class="components__debug">
          <p><strong>Debug Info:</strong></p>
          <p>Component slug/id: {{ componentSlug }}</p>
          <p>Route params: {{ JSON.stringify(route.params) }}</p>
          <p>Content prop: {{ JSON.stringify(content, null, 2) }}</p>
        </div>
        <button @click="loadComponentData" class="components__retry-button">Retry</button>
      </div>
      
      <!-- Component content from CMS -->
      <div v-else-if="componentData" class="component__cms-content">
        <!-- Render the component content through SanityBlockContent -->
        <SanityBlockContent 
          v-if="componentData.content && componentData.content.length > 0" 
          :blocks="componentData.content" 
        />
        <SanityBlockContent 
          v-else-if="componentData.pageBuilder && componentData.pageBuilder.length > 0" 
          :blocks="componentData.pageBuilder" 
        />
        <SanityBlockContent 
          v-else-if="componentData.blocks && componentData.blocks.length > 0" 
          :blocks="componentData.blocks" 
        />
        
        <!-- Usage examples section -->
        <div v-if="componentData.examples && componentData.examples.length > 0" class="component__examples">
          <h2 class="headline-md">Examples</h2>
          <div v-for="(example, index) in componentData.examples" :key="example._key || index" class="component__example">
            <h3 v-if="example.title" class="title-md">{{ example.title }}</h3>
            <div v-if="example.description" class="body-md">{{ example.description }}</div>
            
            <!-- Example content or rendered component -->
            <SanityBlockContent v-if="example.content" :blocks="example.content" />
            
            <!-- Code example if available -->
            <pre v-if="example.code" class="component__code"><code>{{ example.code }}</code></pre>
          </div>
        </div>
        
        <!-- Props documentation section -->
        <div v-if="componentData.props && componentData.props.length > 0" class="component__props">
          <h2 class="headline-md">Properties</h2>
          <table class="component__props-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="prop in componentData.props" :key="prop.name">
                <td>{{ prop.name }}</td>
                <td>{{ prop.type }}</td>
                <td>{{ prop.default }}</td>
                <td>{{ prop.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div v-if="!componentData.content && !componentData.pageBuilder && !componentData.blocks" 
             class="component__no-content">
          <p>No content found for this component. Please add content in the CMS.</p>
          <div v-if="isDev" class="components__debug">
            <p><strong>Available component data:</strong></p>
            <pre>{{ JSON.stringify(componentData, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SanityBlockContent from '~/composables/components/SanityBlockContent.vue'
import Breadcrumb from '~/composables/components/Breadcrumb.vue'
import Spinner from '~/composables/components/Spinner.vue'
import { useSanityClient } from '~/utils/sanityClient'

// Environment check for dev mode (client-safe)
const isDev = ref(false);
if (typeof window !== 'undefined') {
  // Check if we're in development based on URL or other client-side indications
  isDev.value = window.location.hostname === 'localhost' || 
                window.location.hostname === '127.0.0.1';
}

// Content prop is passed from the parent component
const props = defineProps({
  content: {
    type: Object,
    required: true
  }
});

// Get the component slug/id from the route if available
const route = useRoute();
const router = useRouter();

const componentSlug = computed(() => {
  // Handle case where slug is an array (from route.params)
  let slug = route.params.slug;
  
  // If it's an array, get the first item
  if (Array.isArray(slug)) {
    slug = slug[0];
  }
  
  // Try other sources if no slug from route
  if (!slug) {
    slug = props.content.slug?.current || 
           props.content._id ||
           props.content.id;
  }
  
  console.log('Resolved component slug/id:', slug);
  return slug;
});

// State
const loading = ref(true);
const componentData = ref(null);
const error = ref(null);

// Load component data from Sanity
const loadComponentData = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const { client } = useSanityClient();
    
    // Make sure we have a valid slug
    const slug = componentSlug.value;
    if (!slug) {
      error.value = "No component identifier found";
      loading.value = false;
      return;
    }
    
    console.log('Fetching component with slug/id:', slug);
    
    // Try multiple approaches to find the component
    const query = `
      *[_type == "componentPage" && (
        slug.current == $id || 
        _id == $id || 
        title match $titleMatch
      )][0] {
        _id,
        title,
        description,
        "slug": slug.current,
        content,
        pageBuilder,
        blocks,
        examples,
        props
      }
    `;
    
    const result = await client.fetch(query, { 
      id: slug,
      titleMatch: `*${slug}*`
    });
    
    console.log('Component query result:', result);
    
    if (result) {
      componentData.value = result;
    } else {
      // Check if component exists in content object directly
      if (props.content.title && props.content.title.toLowerCase().includes(slug.toLowerCase())) {
        console.log('Using content prop as component data');
        componentData.value = props.content;
      } else {
        // Try getting all components for user feedback
        const allComponents = await client.fetch(`
          *[_type == "componentPage"] {
            _id,
            title,
            "slug": slug.current
          }
        `);
        
        console.log('Available components:', allComponents);
        
        const componentNames = allComponents && allComponents.length > 0 
          ? allComponents.map(c => c.title).join(', ')
          : 'None found';
          
        error.value = `Component "${slug}" not found. Available components: ${componentNames}`;
      }
    }
  } catch (err) {
    console.error('Error fetching component data:', err);
    error.value = `Failed to load component: ${err.message}`;
  } finally {
    loading.value = false;
  }
};

// Initialize on mount
onMounted(loadComponentData);
</script>

<style scoped>
.hero-section {
  padding: 0px 0px 64px 0px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: var(--space-medium);
  width: 100%;
}

.grid {
  margin-top: var(--space-large);
}

.component__cms-content {
  display: flex;
  width: 100% !important;
  flex-direction: column;
  gap: var(--space-large);
}

.components__loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-xlarge) 0;
}

.components__loading-text,
.components__error,
.component__no-content {
  text-align: center;
  margin-top: var(--space-medium);
}

.components__retry-button {
  margin-top: var(--space-small);
  padding: 8px 16px;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.component__examples,
.component__props {
  margin-top: var(--space-xlarge);
  margin-bottom: var(--space-xlarge);
}

.component__example {
  margin-top: var(--space-large);
  padding: var(--space-medium);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-surface);
}

.component__code {
  margin-top: var(--space-medium);
  padding: var(--space-medium);
  background-color: var(--color-code-bg, #f6f8fa);
  border-radius: 4px;
  overflow-x: auto;
}

.component__props-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: var(--space-medium);
}

.component__props-table th,
.component__props-table td {
  padding: var(--space-small);
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.component__props-table th {
  font-weight: 600;
}

.components__debug {
  margin-top: var(--space-medium);
  text-align: left;
  background-color: #f8f8f8;
  padding: var(--space-medium);
  border-radius: 4px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  overflow: auto;
}

.components__debug pre {
  white-space: pre-wrap;
  word-break: break-word;
}
</style> 