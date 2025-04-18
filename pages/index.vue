<template>
  <div class="dashboard-layout">
    <SideNavigation :items="navigationItems" @itemClick="handleNavItemClick">
      <template #logo>
        <div class="dashboard-layout__logo title-md">BRAND</div>
      </template>
      <template #footer>
        <div class="dashboard-layout__footer">
          <div class="dashboard-layout__user">
            <Avatar class="dashboard-layout__user-avatar" />
            <div class="dashboard-layout__user-info">
              <div class="body-sm-loud">User Name</div>
              <div class="body-xs color-soft">user@example.com</div>
            </div>
            <Button size="small" icon="chevron-down" variant="ghost" class="dashboard-layout__user-button" />
          </div>
        </div>
      </template>
    </SideNavigation>

    <div class="dashboard-layout__content">
      <div class="landing-page">
        <!-- Navigation -->
        <nav class="nav">
          <div class="nav__actions">
            <NuxtLink to="/projects" class="body-sm color-soft">Projects</NuxtLink>
            <NuxtLink to="/demo-page-1" class="body-sm color-soft">Demo 1</NuxtLink>
            <NuxtLink to="/portfolio" class="body-sm color-soft">Portfolio</NuxtLink>
            <Button variant="primary" size="medium">Start for free</Button>
          </div>
        </nav>

        <!-- Hero Section -->
        <main class="hero">
          <h1 class="headline-lg">Design, Meet Code</h1>
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

        <!-- Slider Showcase -->
        <ComponentShowcase title="Slider">
          <div style="display: flex; flex-direction: column; gap: var(--space-medium); width: 100%;">
            <div class="body-sm">Basic Slider: {{ sliderValue1 }}</div>
            <Slider v-model="sliderValue1" />
            
            <div class="body-sm">Slider with step of 10: {{ sliderValue2 }}</div>
            <Slider v-model="sliderValue2" :step="10" />
            
            <div class="body-sm">Slider with custom range (0-1000): {{ sliderValue3 }}</div>
            <Slider v-model="sliderValue3" :min="0" :max="1000" :step="50" />
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

        <!-- Carousel Showcase -->
        <ComponentShowcase title="Carousel">
          <div style="width: 100%;">
            <Carousel title="Featured Items" :infinite="false">
              <Card
                v-for="(item, index) in carouselItems"
                :key="index"
                :header-text="item.title"
                :subheader-text="item.subtitle"
                :body-text="item.description"
                :image-src="item.image"
                :image-alt="item.title"
                image-aspect-ratio="16x9"
                width="300px"
                style="flex-shrink: 0;"
              >
                <template #actions>
                  <Button variant="primary" size="small">Learn More</Button>
                </template>
              </Card>
            </Carousel>
          </div>
        </ComponentShowcase>

        <!-- Image Carousel Showcase -->
        <ComponentShowcase title="Image Carousel">
          <ImageCarousel
            :items="[
              {
                title: 'Modern Architecture',
                subtitle: 'Contemporary Design',
                image: 'https://cdn.cosmos.so/0c0eb690-73ce-4a3c-b2b6-68d3d9e9ece6?format=jpeg'
              },
              {
                title: 'Urban Living',
                subtitle: 'City Lifestyle',
                image: 'https://cdn.cosmos.so/0c0eb690-73ce-4a3c-b2b6-68d3d9e9ece6?format=jpeg'
              },
              {
                title: 'Minimalist Design',
                subtitle: 'Less is More',
                image: 'https://cdn.cosmos.so/0c0eb690-73ce-4a3c-b2b6-68d3d9e9ece6?format=jpeg'
              }
            ]"
            :interval="5000"
          />
        </ComponentShowcase>
        <ComponentShowcase title="Image Carousel">
          <ProjectCard 
            title="Project 1"
            description="This is the description of the project"
            image="https://cdn.cosmos.so/0c0eb690-73ce-4a3c-b2b6-68d3d9e9ece6?format=jpeg"
          />
          <ProjectCard 
            title="Project 1"
            description="This is the description of the project"
            image="https://cdn.cosmos.so/0c0eb690-73ce-4a3c-b2b6-68d3d9e9ece6?format=jpeg"
          /><ProjectCard 
            title="Project 1"
            description="This is the description of the project"
            image="https://cdn.cosmos.so/0c0eb690-73ce-4a3c-b2b6-68d3d9e9ece6?format=jpeg"
          />
        </ComponentShowcase>
      </div>
    </div>
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
  overflow-x: hidden;
}

.dashboard-layout {
  display: flex;
  width: 100%;
  min-height: 100vh;
}

.dashboard-layout__content {
  flex: 1;
  overflow-y: auto;
  height: 100vh;
}

.dashboard-layout__logo {
  color: var(--brand-primary-600);
  font-weight: var(--weight-loud);
  font-size: 24px;
}

.dashboard-layout__footer {
  display: flex;
  flex-direction: column;
}

.dashboard-layout__user {
  display: flex;
  align-items: center;
  gap: var(--unit-12);
  border-radius: var(--unit-8);
  padding: var(--unit-8);
  transition: background-color 0.2s ease;
}

.dashboard-layout__user:hover {
  background-color: var(--bg-elements-50);
  cursor: pointer;
}

.dashboard-layout__user-avatar {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
}

.dashboard-layout__user-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.dashboard-layout__user-info .body-sm-loud {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dashboard-layout__user-button {
  opacity: 0.6;
}

.dashboard-layout__user:hover .dashboard-layout__user-button {
  opacity: 1;
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
  justify-content: flex-end;
  align-items: center;
  padding: var(--space-medium) 0;
  width: 100%;
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
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useColorMode } from '#imports'
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

// Navigation items for the side navigation
const navigationItems = [
  {
    label: 'Dashboard',
    icon: 'grid',
    active: true
  },
  {
    label: 'Projects',
    icon: 'folder',
    badge: true
  },
  {
    label: 'Tasks',
    icon: 'check-square'
  },
  {
    label: 'Calendar',
    icon: 'calendar'
  },
  {
    label: 'Messages',
    icon: 'message-square',
    badge: true
  },
  {
    label: 'Documents',
    icon: 'file-text'
  },
  {
    label: 'Analytics',
    icon: 'bar-chart-2'
  },
  {
    label: 'Settings',
    icon: 'settings'
  }
]

const selectedItem = ref(navigationItems[0])

const handleNavItemClick = ({ item, index }) => {
  navigationItems.forEach(navItem => navItem.active = false)
  navigationItems[index].active = true
  selectedItem.value = item
}

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
import Carousel from '../components/Carousel.vue'
import ImageCarousel from '../components/ImageCarousel.vue'
import Slider from '../components/Slider.vue'
import SideNavigation from '../patterns/SideNavigation.vue'
import Icon from '../components/Icon.vue'

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

// Carousel items data
const carouselItems = ref([
  {
    title: 'Modern Architecture',
    subtitle: 'Contemporary Design',
    description: 'Explore the latest trends in modern architecture and design.',
    image: 'https://cdn.cosmos.so/0c0eb690-73ce-4a3c-b2b6-68d3d9e9ece6?format=jpeg'
  },
  {
    title: 'Urban Living',
    subtitle: 'City Lifestyle',
    description: 'Discover the perfect balance of comfort and style in urban spaces.',
    image: 'https://cdn.cosmos.so/0c0eb690-73ce-4a3c-b2b6-68d3d9e9ece6?format=jpeg'
  },
  {
    title: 'Minimalist Design',
    subtitle: 'Less is More',
    description: 'Experience the beauty of simplicity in modern minimalist design.',
    image: 'https://cdn.cosmos.so/0c0eb690-73ce-4a3c-b2b6-68d3d9e9ece6?format=jpeg'
  },
  {
    title: 'Sustainable Living',
    subtitle: 'Eco-Friendly',
    description: 'Learn about sustainable design practices for a better future.',
    image: 'https://cdn.cosmos.so/0c0eb690-73ce-4a3c-b2b6-68d3d9e9ece6?format=jpeg'
  },
  {
    title: 'Luxury Interiors',
    subtitle: 'Premium Design',
    description: 'Indulge in the finest luxury interior design concepts.',
    image: 'https://cdn.cosmos.so/0c0eb690-73ce-4a3c-b2b6-68d3d9e9ece6?format=jpeg'
  }
])

const sliderValue1 = ref(25)
const sliderValue2 = ref(50)
const sliderValue3 = ref(750)
</script> 