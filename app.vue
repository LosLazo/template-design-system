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
  background-color: var(--bg-elevation-base);
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: start;
  margin: 0;
  padding: 0;
}
</style>

<script setup>
const colorMode = useColorMode()

// Initialize theme on mount
onMounted(() => {
  if (process.client) {
    // Force an initial theme update
    const theme = colorMode.value
    document.documentElement.setAttribute('data-theme', theme)
  }
})

// Watch for theme changes
watch(() => colorMode.value, (newTheme) => {
  if (process.client) {
    document.documentElement.setAttribute('data-theme', newTheme)
  }
}, { immediate: true })
</script>