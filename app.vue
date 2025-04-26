<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style>
/* Make sure these styles are not scoped */
:root {
  color-scheme: light dark; /* Enable system color scheme support */
}

body {
  background-color: var(--ei-color-bg-elevation-base);
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: start;
  margin: 0;
  padding: 0;
}
</style>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useColorMode } from '#imports'

const colorMode = useColorMode()

// Initialize theme on mount
onMounted(() => {
  if (process.client) {
    // Force an initial theme update
    const theme = colorMode.value
    // Apply the theme class to the HTML element
    updateThemeClass(theme)
  }
})

// Watch for theme changes
watch(() => colorMode.value, (newTheme: string) => {
  if (process.client) {
    // Update data-theme attribute for compatibility
    document.documentElement.setAttribute('data-theme', newTheme)
    // Update the theme class
    updateThemeClass(newTheme)
  }
}, { immediate: true })

// Function to update theme classes
function updateThemeClass(theme: string) {
  // Remove all theme classes
  document.documentElement.classList.remove('theme-light-mode', 'theme-dark-mode')
  
  // Add the correct theme class
  if (theme === 'dark') {
    document.documentElement.classList.add('theme-dark-mode')
  } else {
    document.documentElement.classList.add('theme-light-mode')
  }
}
</script>