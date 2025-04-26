<template>
  <NuxtLayout name="default">
    <section class="home">
      <div class="home__hero grid">
        <h1 class="headline-lg col-12 home__title">Ask anything</h1>
        <div class="home__search col-span-6 col-start-4">
          <Input 
            placeholder="Should I use a modal or a side panel?" 
            suffix-icon="search" 
            id="search-input"
            v-model="searchQuery"
            class="home__search-input"
          />
        </div>
      </div>

      <div>
        <!-- Loading state with animation -->
        <div v-if="loading">
          <div class="home__loader"></div>
          <p class="home__loading-text">Loading content...</p>
        </div>
        
        <!-- Error state -->
        <div v-else-if="error" class="home__error">
          <p>{{ error }}</p>
          <button @click="loadHomeContent" class="home__retry-button">Retry</button>
        </div>
        
        <!-- Content from CMS -->
        <div v-else-if="homePageContent" class="home__cms-content">
          <SanityBlockContent 
            v-if="homePageContent.pageBuilder" 
            :blocks="homePageContent.pageBuilder" 
          />
          <SanityBlockContent 
            v-else-if="homePageContent.content" 
            :blocks="homePageContent.content" 
          />
          <SanityBlockContent 
            v-else-if="homePageContent.blocks" 
            :blocks="homePageContent.blocks" 
          />
          <div v-else class="home__no-content">
            <p>No content found. Please add content in the CMS.</p>
          </div>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Input from '~/composables/components/Input.vue'
import SanityBlockContent from '~/composables/components/SanityBlockContent.vue'
import { useSanityClient } from '~/utils/sanityClient'

// State
const searchQuery = ref("")
const loading = ref(true)
const homePageContent = ref(null)
const error = ref(null)

// Load home page content from Sanity
const loadHomeContent = async () => {
  loading.value = true
  error.value = null
  
  try {
    const { client } = useSanityClient()
    
    // Query for the home page content
    const result = await client.fetch(`
      *[_type in ["homePage", "home", "homepage"]][0] {
        ...,
        pageBuilder[] {
          ...,
          _type,
          _key
        }
      }
    `)
    
    if (!result) {
      error.value = "Home page not found in CMS"
    } else {
      homePageContent.value = result
    }
  } catch (err) {
    console.error('Error fetching home page content:', err)
    error.value = "Failed to load content. Please try again."
  } finally {
    loading.value = false
  }
}

// Initialize on mount
onMounted(loadHomeContent)
</script>

<style scoped>
:root {
  --home-max-width: 1200px;
  --home-padding: var(--ei-dimension-space-large, 24px);
  --home-title-spacing: 48px;
  --home-hero-padding-top: 128px;
  --home-hero-padding-bottom: 64px;
}

/* Home page container */
.home {
  width: 100%;
  box-sizing: border-box;
}

/* Hero section styling */
.home__hero {
  padding: 128px 0 64px 0;
  gap: 48px;
  width: 100%;
}

.home__title {
  text-align: center;
  margin-bottom: var(--ei-home-title-spacing);
}

.home__search {
  width: 100%;
  grid-column: 4 / 10 !important;
}

.home__search-input {
  width: 100%;
  grid-column: 4 / 10 !important;
}

/* Content area */
.home__content {
  max-width: var(--ei-home-max-width);
  padding: var(--ei-home-padding) 0;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.home__cms-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
}

/* Loading styles */
.home__loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: calc(var(--ei-dimension-space-large) * 2);
  gap: var(--ei-dimension-space-medium);
}

.home__loader {
  width: 40px;
  height: 40px;
  border: 4px solid var(--ei-color-bg-clickable-hover);
  border-top: 4px solid var(--ei-color-fg-accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.home__loading-text {
  color: var(--ei-color-fg-text-soft);
}

/* Error styles */
.home__error {
  background-color: var(--ei-color-bg-surface-disabled);
  border-radius: var(--ei-dimension-radius-medium, 8px);
  padding: var(--ei-dimension-space-large);
  color: var(--ei-color-fg-error);
  text-align: center;
  margin: var(--ei-dimension-space-large) 0;
}

.home__retry-button {
  background-color: var(--ei-color-bg-clickable);
  color: var(--ei-color-fg-text-strong);
  border: none;
  padding: var(--ei-dimension-space-small) var(--ei-dimension-space-medium);
  margin-top: var(--ei-dimension-space-medium);
  border-radius: var(--ei-dimension-radius-small, 4px);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.home__retry-button:hover {
  background-color: var(--ei-color-bg-clickable-hover);
}

.home__no-content {
  text-align: center;
  padding: var(--ei-dimension-space-large);
  color: var(--ei-color-fg-text-soft);
  background-color: var(--ei-color-bg-surface-disabled);
  border-radius: var(--ei-dimension-radius-medium, 8px);
  width: 100%;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .home__content {
    padding: var(--ei-home-padding);
  }
}

@media (max-width: 768px) {
  :root {
    --home-hero-padding-top: 64px;
    --home-hero-padding-bottom: 32px;
    --home-title-spacing: 32px;
  }
  
  .home__search {
    grid-column: 2 / 12;
  }
}

@media (max-width: 480px) {
  :root {
    --home-padding: var(--ei-dimension-space-medium, 16px);
  }
  
  .home__title {
    font-size: 32px;
    line-height: 1.2;
  }
}
</style> 