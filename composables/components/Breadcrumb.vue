<template>
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol>
      <li v-for="(item, index) in breadcrumbItems" :key="index">
        <NuxtLink 
          :to="item.path" 
          class="body-sm"
          :class="{ 'active': index === breadcrumbItems.length - 1 }"
        >
          {{ item.label }}
        </NuxtLink>
        <Icon v-if="index < breadcrumbItems.length - 1" name="chevron-right" :size="16" class="chevron" />
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { CONTENT_TYPES, useSanityClient } from '~/utils/sanityClient';

/**
 * @component Breadcrumb
 * @description Displays a navigation breadcrumb path showing the user's current location within the application.
 * Automatically generates breadcrumbs based on the current route or uses provided items.
 * 
 * @example <Breadcrumb />
 * @example <Breadcrumb :items="[{label: 'Home', path: '/'}, {label: 'Components', path: '/components'}]" />
 */

/**
 * Interface for breadcrumb navigation items
 * @typedef {Object} BreadcrumbItem
 * @property {string} label - Display text for the breadcrumb item
 * @property {string} path - URL path for the breadcrumb item
 */
interface BreadcrumbItem {
  label: string;
  path: string;
}

/**
 * Breadcrumb component props
 * @typedef {Object} BreadcrumbProps
 */
const props = defineProps({
  /**
   * Optional array of breadcrumb items to display
   * If not provided, breadcrumbs will be generated automatically based on the current route
   * @type {BreadcrumbItem[]}
   * @default []
   */
  items: {
    type: Array as () => BreadcrumbItem[],
    default: () => []
  }
});

const route = useRoute();
const generatedItems = ref<BreadcrumbItem[]>([]);
const loading = ref(true);

/**
 * Computed property that returns either the provided items or auto-generated breadcrumbs
 * @returns {BreadcrumbItem[]} Array of breadcrumb items to display
 */
const breadcrumbItems = computed(() => {
  if (props.items && props.items.length > 0) {
    // If items are explicitly provided, use those
    return props.items;
  }
  // Otherwise use the dynamically generated breadcrumbs
  return generatedItems.value;
});

/**
 * Generates breadcrumb items based on the current route
 * Fetches page titles from Sanity when available
 * @async
 */
const generateBreadcrumbs = async () => {
  loading.value = true;
  const path = route.path;
  const pathSegments = path.split('/').filter(segment => segment);
  
  // Always start with Home
  const items: BreadcrumbItem[] = [
    { label: 'Home', path: '/' }
  ];

  // If no segments (we're on home page), just return Home
  if (pathSegments.length === 0) {
    generatedItems.value = items;
    loading.value = false;
    return;
  }

  // Map content types to section names
  const sectionNames: Record<string, string> = {
    'componentPage': 'Components',
    'patternPage': 'Patterns',
    'paperPage': 'Papers',
    'learningPage': 'Learning'
  };

  try {
    const { client } = useSanityClient();
    
    // Check if this is a section page (e.g., /components, /patterns)
    if (pathSegments.length === 1) {
      const sectionKey = Object.keys(CONTENT_TYPES).find(key => 
        key.toLowerCase() === pathSegments[0].toLowerCase()
      );
      
      if (sectionKey) {
        const sectionName = sectionNames[CONTENT_TYPES[sectionKey as keyof typeof CONTENT_TYPES]] || 
                           pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1);
        items.push({ 
          label: sectionName, 
          path: `/${pathSegments[0]}` 
        });
      }
    } 
    // If this is a detail page (e.g., /components/button, /patterns/navigation)
    else if (pathSegments.length >= 2) {
      // Add the section
      const section = pathSegments[0];
      const sectionKey = Object.keys(CONTENT_TYPES).find(key => 
        key.toLowerCase() === section.toLowerCase()
      );
      
      const sectionLabel = sectionKey ? 
        sectionNames[CONTENT_TYPES[sectionKey as keyof typeof CONTENT_TYPES]] || 
        section.charAt(0).toUpperCase() + section.slice(1) : 
        section.charAt(0).toUpperCase() + section.slice(1);
      
      items.push({ 
        label: sectionLabel, 
        path: `/${section}` 
      });
      
      // Get the current page's title from Sanity
      const slug = pathSegments[pathSegments.length - 1];
      let contentType = sectionKey ? 
        CONTENT_TYPES[sectionKey as keyof typeof CONTENT_TYPES] : null;
      
      if (contentType) {
        // Try to fetch the page title from Sanity
        const query = `*[_type == "${contentType}" && slug.current == "${slug}"][0] { title }`;
        const pageData = await client.fetch(query);
        
        if (pageData && pageData.title) {
          items.push({ 
            label: pageData.title, 
            path: path 
          });
        } else {
          // Fallback to slug-based name if title not found
          const pageName = slug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          
          items.push({ 
            label: pageName, 
            path: path 
          });
        }
      } else {
        // If we couldn't determine the content type, use the slug
        const pageName = slug
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        items.push({ 
          label: pageName, 
          path: path 
        });
      }
    }
  } catch (error) {
    console.error('Error generating breadcrumbs:', error);
    
    // Fallback: Add remaining path segments with basic formatting
    for (let i = 0; i < pathSegments.length; i++) {
      const segment = pathSegments[i];
      const path = '/' + pathSegments.slice(0, i + 1).join('/');
      
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      items.push({
        label,
        path
      });
    }
  }
  
  generatedItems.value = items;
  loading.value = false;
};

// Generate breadcrumbs on mount and when route changes
onMounted(() => {
  generateBreadcrumbs();
});

watch(() => route.path, () => {
  generateBreadcrumbs();
});
</script>

<style scoped>
.breadcrumb {
  padding: var(--space-small) 0;
  width: 100%;
  padding: 30px 0px;
  z-index: 1000;
}

.breadcrumb ol {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
}

.breadcrumb li {
  display: flex;
  align-items: center;
}

.breadcrumb a {
  color: var(--fg-text-soft);
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.breadcrumb a.active {
  color: var(--fg-text-strong);
  pointer-events: none;
}

.chevron {
  margin: 0 var(--space-x-small);
  color: var(--fg-text-soft);
}
</style> 