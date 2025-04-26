<template>
  <div class="layout">
    <div class="layout__content">
      <aside class="sidenav layout__sidebar">
      <SideNavigation 
        :items="navigationItems" 
        @itemClick="handleNavItemClick"
        v-model:isCollapsed="sideNavCollapsed"
      >
        <template #logo>
          <div class="layout__logo" :class="{ 'layout__logo--collapsed': sideNavCollapsed }">
            <NuxtLink to="/">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="layout__logo-icon">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0001 9.49006C15.1077 12.636 12.6361 15.1076 9.49015 16C12.6361 16.8924 15.1077 19.364 16.0001 22.5099C16.8925 19.364 19.3641 16.8924 22.51 16C19.3641 15.1076 16.8925 12.636 16.0001 9.49006Z" fill="var(--ei-color-fg-object-strong)"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.4545 1.45455H14.5455V4.36364H17.4545V1.45455ZM13.0909 0V5.81818H18.9091V0H13.0909Z" fill="var(--ei-color-fg-object-strong)"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M30.5455 14.5455H27.6364V17.4545H30.5455V14.5455ZM26.1818 13.0909V18.9091H32V13.0909H26.1818Z" fill="var(--ei-color-fg-object-strong)"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.36364 14.5455H1.45455V17.4545H4.36364V14.5455ZM0 13.0909V18.9091H5.81818V13.0909H0Z" fill="var(--ei-color-fg-object-strong)"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.4545 27.6364H14.5455V30.5455H17.4545V27.6364ZM13.0909 26.1818V32H18.9091V26.1818H13.0909Z" fill="var(--ei-color-fg-object-strong)"/>
              </svg>
            </NuxtLink>
            <div v-if="!sideNavCollapsed" class="layout__logo-text title-md">Glimmer</div>
            <InputDropdown 
              v-if="!sideNavCollapsed"
              variant="primary" 
              size="small"
              :modelValue="selectedVersion"
              @update:modelValue="selectedVersion = $event"
              @select="handleVersionSelect"
              :items="versionOptions"
              id="version-dropdown"
              placeholder="Version"
              :editable="false"
            />
          </div>
        </template>
      </SideNavigation>
    </aside>
      <main class="layout__main">
        <slot />
      </main>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { navigateTo } from '#app'
import InputDropdown from '~/composables/components/InputDropdown.vue'
import SideNavigation from '~/composables/patterns/SideNavigation.vue'
import Footer from '~/composables/patterns/Footer.vue'
import { useSanityClient } from '~/utils/sanityClient'

const selectedVersion = ref("V 1.2")
const sideNavCollapsed = ref(false)
const navigationItems = ref([])
const isLoading = ref(true)

const versionOptions = [
  { label: "V 1.2", value: "1.2" },
  { label: "V 1.1", value: "1.1" },
  { label: "V 1.0", value: "1.0" }
]

// Prevent horizontal scrolling function
function preventHorizontalScroll(event) {
  if (event.deltaX !== 0) {
    event.preventDefault();
  }
}

// Add the event listener only when component is mounted (browser-side)
onMounted(() => {
  document.addEventListener('wheel', preventHorizontalScroll, { passive: false });
});

// Clean up when component is destroyed
onBeforeUnmount(() => {
  document.removeEventListener('wheel', preventHorizontalScroll);
});

// Default navigation for fallback
const useDefaultNavigation = () => {
  navigationItems.value = [
    {
      label: 'Documentation',
      icon: 'book',
      link: '/',
      internal: true,
      active: true
    },
    {
      label: 'Components',
      icon: 'box',
      link: '/components',
      internal: true,
      children: [
        { label: 'Accordion', link: '/accordion', internal: true },
        { label: 'Button', link: '/button', internal: true },
        { label: 'Card', link: '/card', internal: true }
      ]
    },
    {
      label: 'Patterns',
      icon: 'grid',
      link: '/patterns',
      internal: true,
      children: [
        { label: 'Navigation', link: '/navigation', internal: true },
        { label: 'Forms', link: '/forms', internal: true }
      ]
    }
  ]
}

// Fetch navigation items from Sanity
const fetchNavigationItems = async () => {
  try {
    const { getNavigationItems } = useSanityClient()
    
    // Get navigation items using the dedicated function
    const results = await getNavigationItems()
    
    if (results && Array.isArray(results) && results.length > 0) {
      // Make sure at least one item is active
      const navItems = results.map((item, index) => ({
        ...item,
        active: index === 0 // Make first item active by default
      }))
      
      navigationItems.value = navItems
    } else {
      // Fallback to default navigation if no items found
      useDefaultNavigation()
    }
  } catch (error) {
    console.error('Error fetching navigation items from Sanity:', error)
    // Fallback to default navigation if error occurs
    useDefaultNavigation()
  } finally {
    isLoading.value = false
  }
}

// Initialize navigation on component mount
onMounted(() => {
  fetchNavigationItems()
})

const handleNavItemClick = ({ item, index, isChild, parentItem, childIndex }) => {
  // If it's a child item click
  if (isChild && item) {
    // Handle navigation for the child item
    if (item.link) {
      // Handle internal vs external links
      if (item.internal !== false) {
        // Use Nuxt routing for internal links
        navigateTo(item.link)
      } else {
        // Use window.open for external links
        window.open(item.link, '_blank')
      }
    }
    return
  }
  
  // For main menu items
  navigationItems.value.forEach(navItem => navItem.active = false)
  navigationItems.value[index].active = true
  
  // If the navigation item has a link, navigate to it
  if (item.link) {
    // Handle internal vs external links
    if (item.internal !== false) {
      // Use Nuxt routing for internal links
      navigateTo(item.link)
    } else {
      // Use window.open for external links
      window.open(item.link, '_blank')
    }
  }
}

const handleVersionSelect = (item) => {
  selectedVersion.value = item.label
}
</script>

<style>
:root {
  --layout-spacing: 16px;
  --layout-sidebar-width: 280px;
  --layout-sidebar-collapsed-width: 68px;
  --layout-main-padding: 32px;
}

/* Mobile breakpoints */
@media (max-width: 768px) {
  :root {
    --layout-main-padding: 16px;
  }
}

/* 
 * Layout Structure
 * Organized with BEM naming convention for clarity
 */
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  max-width: 100vw;
  background-color: var(--ei-color-bg-elevation-base);
  margin-bottom: 50vh;
}

.layout__content {
  display: flex;
  flex-direction: row;
  flex: 1;
  padding: var(--ei-layout-spacing);
  width: 100%;
  min-height: 100vh;
  overflow-y: visible;
}

/* aside {
  display: flex;
  flex-direction: column;
  align-items: start;
  z-index: 10;
  top: 0px;
} */

/* Sidebar */
.layout__sidebar {
  position: sticky;
  top: var(--ei-layout-spacing);
  z-index: 10;
  height: calc(100vh - var(--ei-layout-spacing) * 2);
  max-height: calc(100vh - var(--ei-layout-spacing) * 2);
  transition: width 0.3s ease;
  overflow-y: auto;
}

/* Logo area */
.layout__logo {
  display: flex;
  align-items: center;
  gap: var(--ei-layout-spacing);
  flex-direction: row;
  width: 100%;
  padding: 0px 2px;
}

.layout__logo--collapsed {
  justify-content: center;
}

.layout__logo-icon {
  min-width: 32px;
  min-height: 32px;
  width: 32px;
  height: 32px;
  fill: var(--ei-color-fg-object-solid-1000);
}

.layout__logo-text {
  width: 100%;
}

/* Main content area */
.layout__main {
  flex: 1;
  padding: 0 var(--ei-layout-main-padding);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 0px;
  position: relative;
  transition: width 0.3s ease;
  max-width: 100%;
}

/* 
 * Responsive adjustments
 */
@media (max-width: 768px) {
  .layout__content {
    flex-direction: column;
  }
  
  .layout__sidebar {
    position: relative;
    top: 0;
    width: 100%;
    height: auto;
    max-height: none;
  }
  
  .layout__main {
    width: 100%;
    padding: var(--ei-layout-main-padding) 0;
  }

  .layout__main * {
    width: 100%;
    max-width: 100%;
  }
}

.sticky-navigation {
  position: sticky;
  top: var(--ei-layout-spacing);
  align-self: flex-start;
  z-index: 10;
  height: calc(100vh - var(--ei-layout-spacing) * 2);
  max-height: calc(100vh - var(--ei-layout-spacing) * 2);
  overflow-y: auto;
}
</style> 