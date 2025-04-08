<template>
  <div class="landing-page">
    <!-- Navigation -->
    <nav class="nav">
      <div class="nav__logo">
        <img src="/logo.svg" alt="Logo" class="nav__logo-image" />
      </div>
      <div class="nav__actions">
        <a href="https://github.com" class="body-sm color-soft">Github</a>
        <a href="/login" class="body-sm color-soft">Log in</a>
        <Button variant="primary" size="small">Start for free</Button>
      </div>
    </nav>

    <!-- Demo Pages Navigation -->
    <nav class="demo-nav">
      <h2 class="demo-nav__title body-sm color-soft">Demo Pages:</h2>
      <div class="demo-nav__links">
        <NuxtLink to="/demo-page-1" class="body-sm color-soft">Over-Stimulated</NuxtLink>
      </div>
    </nav>

    <!-- Hero Section -->
    <main class="hero">
      <h1 class="hero__title headline-lg">DESIGN, MEET CODE</h1>
      <p class="hero__subtitle body-lg color-soft">The UI design tool for the AI era</p>
      <div class="hero__actions">
        <Button variant="primary" size="medium" suffixIcon="arrow-right">Start for free</Button>
        <Button variant="ghost" size="medium" prefixIcon="globe">Explore templates</Button>
      </div>
    </main>

    <!-- Hero Image -->
    <div class="hero-image">
      <Image 
        src="https://cdn.cosmos.so/0c0eb690-73ce-4a3c-b2b6-68d3d9e9ece6?format=jpeg" 
        alt="Abstract architectural black and white image"
        class="hero-image__img"
      />
    </div>

    <!-- Button Showcase -->
    <ComponentShowcase title="Button">
      <Button suffixIcon="maximize" size="medium" variant="primary">Hello</Button>
      <Button suffixIcon="maximize" size="medium" variant="secondary">Hello</Button>
      <Button suffixIcon="maximize" size="medium" variant="ghost">Hello</Button>
      <Button suffixIcon="maximize" size="medium" variant="primary"/>
      <Button suffixIcon="maximize" size="medium" variant="secondary"/>
      <Button suffixIcon="maximize" size="medium" variant="ghost"/>
    </ComponentShowcase>

    <!-- Dropdown Showcase -->
    <ComponentShowcase title="Component Showcase">
      <Dropdown maxWidth="400px" :items="dropdownItems" />
    </ComponentShowcase>

    <!-- Toggle Showcase -->
    <ComponentShowcase title="Toggle">
      <Toggle v-model="isEnabled" />
    </ComponentShowcase>

    <!-- Tabs Showcase -->
    <ComponentShowcase title="Tabs">
      <Tabs
        v-model="activeTab"
        :items="[
          { id: 'tab1', label: 'Tab 1' },
          { id: 'tab2', label: 'Tab 2' },
          { id: 'tab3', label: 'Tab 3', disabled: true }
        ]"
      />
    </ComponentShowcase>
    
    <!-- Segmented Controls Showcase -->
    <ComponentShowcase title="Segmented Controls">
      <SegmentedControls
        v-model="activeSegment"
        :items="[
          { id: 'option1', label: 'Option 1' },
          { id: 'option2', label: 'Option 2' },
          { id: 'option3', label: 'Option 3' }
        ]"
      />
    </ComponentShowcase>

    <!-- Card Showcase -->
    <ComponentShowcase title="Card">
      <Card
        header-text="Header text"
        subheader-text="Subheader text"
        body-text="This is the main content of the card that provides more details about the topic."
        image-src="https://cdn.cosmos.so/0c0eb690-73ce-4a3c-b2b6-68d3d9e9ece6?format=jpeg"
        image-alt="Description of image"
        image-aspect-ratio="16x9"
      >
      <template #actions>
        <Button suffixIcon="maximize" variant="primary" size="small">Learn More</Button>
        <Button suffixIcon="maximize" variant="secondary" size="small">Cancel</Button>
      </template>
    </Card>
    </ComponentShowcase>

    <!-- Image Showcase -->
    <ComponentShowcase title="Image">
      <Image src="https://cdn.cosmos.so/0c0eb690-73ce-4a3c-b2b6-68d3d9e9ece6?format=jpeg" alt="Image" />
    </ComponentShowcase>

    <!-- Banner Showcase -->
    <ComponentShowcase title="Banner">
      <Banner text="This is a default banner" />
    </ComponentShowcase>

    <!-- Menu Showcase -->
    <ComponentShowcase title="Menu">
      <Menu :items="[
        { label: 'Label 1' },
        { label: 'Label 2' },
        { label: 'Label 3' },
        { label: 'Label 4' }
      ]" />
    </ComponentShowcase>

    <!-- Avatar Showcase -->
    <ComponentShowcase title="Avatar">
      <div style="display: flex; gap: var(--space-medium); align-items: center;">
        <Avatar src="https://cdn.cosmos.so/0c0eb690-73ce-4a3c-b2b6-68d3d9e9ece6?format=jpeg" alt="User avatar" />
        <Avatar />
      </div>
    </ComponentShowcase>

    <!-- Message Showcase -->
    <ComponentShowcase title="Message">
      <Message 
        header="This is a message header"
        body="Longer message text can be placed here. Longer message text can be placed here. Longer message text can be placed here."
        icon="info"
      />
    </ComponentShowcase>

    <!-- Badge Showcase -->
    <ComponentShowcase title="Badge">
      <div style="display: flex; gap: var(--space-medium); align-items: center;">
        <Badge value="1" />
        <Badge value="10" />
        <Badge value="900" />
        <Badge isDot />
      </div>
    </ComponentShowcase>

    <!-- Progress Bar Showcase -->
    <ComponentShowcase title="Progress Bar">
      <div style="display: flex; flex-direction: column; gap: var(--space-medium); width: 100%;">
        <ProgressBar :progress="30" />
        <ProgressBar :progress="60" />
        <ProgressBar :animated="true" />
      </div>
    </ComponentShowcase>

    <!-- Spinner Showcase -->
    <ComponentShowcase title="Spinner">
      <div style="display: flex; gap: var(--space-large); align-items: center;">
        <Spinner size="small" />
        <Spinner size="medium" />
        <Spinner size="large" />
      </div>
    </ComponentShowcase>

    <!-- Loading Screen Showcase -->
    <ComponentShowcase title="Loading Screen">
      <Button @click="showLoadingScreen = true">Show Loading Screen</Button>
      <LoadingScreen v-if="showLoadingScreen" :progress="loadingProgress" />
    </ComponentShowcase>

    <!-- Input Showcase -->
    <ComponentShowcase title="Input">
      <div style="display: flex; flex-direction: column; gap: var(--space-medium); width: 100%; max-width: 400px;">
        <!-- Basic inputs with different sizes -->
        <Input
          id="large-input"
          v-model="inputValue1"
          label="Large input"
          placeholder="Type something..."
          size="large"
        />
        <Input
          id="medium-input"
          v-model="inputValue2"
          label="Medium input with icons"
          placeholder="Search..."
          prefixIcon="search"
          showClearButton
          size="medium"
        />
        <Input
          id="small-input"
          v-model="inputValue3"
          label="Small input"
          placeholder="Type something..."
          size="small"
        />
      </div>
    </ComponentShowcase>

    <!-- InputDropdown Showcase -->
    <ComponentShowcase title="InputDropdown">
      <div style="display: flex; flex-direction: column; gap: var(--space-medium); width: 100%; max-width: 400px;">
        <InputDropdown
          id="dropdown-1"
          v-model="dropdownValue1"
          label="Select an option"
          placeholder="Choose..."
          :items="[
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
            { label: 'Option 3', value: '3' }
          ]"
          @select="handleDropdownSelect"
        />
      </div>
    </ComponentShowcase>
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
  display: flex;
  justify-content: center;
  align-items: start;
  margin: 0;
  padding: 0;
}

.landing-page {
  min-height: 100vh;
  width: 100%;
  padding: var(--space-medium) var(--space-large);
  background-color: var(--bg-elevation-base);
  display: flex;
  flex-direction: column;
  gap: var(--space-huge);
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-medium) 0;
  width: calc(100vw - var(--unit-64));
}

.nav__logo {
  height: 32px;
}

.nav__logo-image {
  height: 100%;
}

.nav__links,
.nav__actions {
  display: flex;
  gap: var(--space-medium);
  align-items: center;
}

.nav__links a,
.nav__actions a {
  text-decoration: none;
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-large);
  padding: var(--space-huge) 0;
}

.hero__subtitle {
  max-width: 600px;
}

.hero__actions {
  display: flex;
  gap: var(--space-medium);
  margin-top: var(--space-medium);
}

.hero-image {
  width: 100%;
  height: 500px;
  overflow: hidden;
  border-radius: 8px;
}

.hero-image__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.demo-nav {
  display: flex;
  align-items: center;
  gap: var(--space-medium);
  padding: var(--space-small) var(--space-large);
  border-bottom: 1px solid var(--fg-border-disabled);
}

.demo-nav__links {
  display: flex;
  gap: var(--space-medium);
}

.demo-nav__links a {
  text-decoration: none;
  transition: color 0.2s ease;
}

.demo-nav__links a:hover {
  color: var(--fg-text-strong);
}
</style>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const colorMode = useColorMode()
const dropdownItems = [
  {
    title: 'Item 1',
    content: 'Content for item 1'
  },
  {
    title: 'Item 2',
    content: 'This is the panel, which contains associated information with the header. Usually it contains text, set in the same size as the header. Lorem ipsum doler sit amet.'
  },
  {
    title: 'Item 3',
    content: 'Content for item 3'
  }
]

// Add reactive states for components
const isEnabled = ref(false)
const activeTab = ref('tab1')
const activeSegment = ref('option1')

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

import Button from '../components/Button.vue'
import Image from '../components/Image.vue'
import Dropdown from '../components/Dropdown.vue'
import Toggle from '../components/Toggle.vue'
import Tabs from '../components/Tabs.vue'
import SegmentedControls from '../components/SegmentedControls.vue'
import Card from '../components/Card.vue'
import ComponentShowcase from '../components/ComponentShowcase.vue'
import Banner from '../components/Banner.vue'
import Menu from '../components/Menu.vue'
import Avatar from '../components/Avatar.vue'
import Message from '../components/Message.vue'
import Badge from '../components/Badge.vue'
import ProgressBar from '../components/ProgressBar.vue'
import Spinner from '../components/Spinner.vue'
import LoadingScreen from '../components/LoadingScreen.vue'
import Input from '../components/Input.vue'
import InputDropdown from '../components/InputDropdown.vue'

const showLoadingScreen = ref(false)
const loadingProgress = ref(0)
let progressInterval

watch(showLoadingScreen, (value) => {
  if (value) {
    loadingProgress.value = 0
    progressInterval = setInterval(() => {
      loadingProgress.value += 10
      if (loadingProgress.value >= 100) {
        showLoadingScreen.value = false
      }
    }, 500)
  } else {
    clearInterval(progressInterval)
  }
})

onUnmounted(() => {
  clearInterval(progressInterval)
})

const inputValue1 = ref('')
const inputValue2 = ref('')
const inputValue3 = ref('')
const inputValue4 = ref('')
const inputValue5 = ref('')
const inputValue6 = ref('')
const inputValue7 = ref('')
const inputValue8 = ref('')
const inputValue9 = ref('')
const inputValue10 = ref('')
const dropdownValue1 = ref('')
const handleDropdownSelect = (item) => {
  console.log('Selected item:', item)
}
</script> 