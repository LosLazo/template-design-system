<template>
  <div class="layout-template">
    <SideNavigation 
      :items="navigationItems" 
      @itemClick="handleNavItemClick"
      v-model:isCollapsed="sideNavCollapsed"
    >
      <template #logo>
        <div class="side-navigation-header title-md" :class="{ 'sidenav--collapsed': sideNavCollapsed }">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0001 9.49006C15.1077 12.636 12.6361 15.1076 9.49015 16C12.6361 16.8924 15.1077 19.364 16.0001 22.5099C16.8925 19.364 19.3641 16.8924 22.51 16C19.3641 15.1076 16.8925 12.636 16.0001 9.49006Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.4545 1.45455H14.5455V4.36364H17.4545V1.45455ZM13.0909 0V5.81818H18.9091V0H13.0909Z" fill="#030303"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M30.5455 14.5455H27.6364V17.4545H30.5455V14.5455ZM26.1818 13.0909V18.9091H32V13.0909H26.1818Z" fill="#030303"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.36364 14.5455H1.45455V17.4545H4.36364V14.5455ZM0 13.0909V18.9091H5.81818V13.0909H0Z" fill="#030303"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.4545 27.6364H14.5455V30.5455H17.4545V27.6364ZM13.0909 26.1818V32H18.9091V26.1818H13.0909Z" fill="#030303"/>
          </svg>
        
          <div v-if="!sideNavCollapsed" class="title-md" style="width: 100%;">glimmer</div>
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
    
    <div class="main-content-area grid-area">
      
      <div class="hero-section grid-area">
        <h1 class="headline-md col-12" style="text-align: center;">Ask anything</h1>
        <Input class="col-12"  placeholder="Should I use a modal or a side panel?" suffix-icon="search" />
      </div>
      
      <div class="row">
        <Carousel title="News" :infinite="false" class="col-12">
          <div class="carousel-grid">
            <ProjectCard
              v-for="(item, index) in carouselItems"
              :key="index"
              :title="item.title"
              :image="item.image"
              :backgroundColor="item.backgroundColor"
              :interactive="true"
              :aspectRatio="item.aspectRatio"
              @click="() => alert(`Selected: ${item.title}`)"
            />
          </div>
        </Carousel>
      </div>
    </div>
  <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InputDropdown from '~/components/InputDropdown.vue'
import ProjectCard from '~/components/ProjectCard.vue'
import Divider from '~/components/Divider.vue'
import SideNavigation from '~/patterns/SideNavigation.vue'
import Footer from '~/patterns/Footer.vue'
const selectedItem = ref(null)
const selectedVersion = ref("V 1.2")
const sideNavCollapsed = ref(false)

const versionOptions = [
  { label: "V 1.2", value: "1.2" },
  { label: "V 1.1", value: "1.1" },
  { label: "V 1.0", value: "1.0" }
]

const navigationItems = [
  {
    label: 'Documentation',
    icon: 'book',
    active: true
  },
  {
    label: 'Tokens',
    icon: 'box'
  },
  {
    label: 'Components',
    icon: 'box'
  },
  {
    label: 'Patterns',
    icon: 'box'
  },
  {
    label: 'Roadmap',
    icon: 'compass'
  },
  {
    label: 'Request Feature',
    icon: 'message-circle'
  },
]

// Carousel items data
const carouselItems = ref([
  {
    title: 'Sustainable Living',
    subtitle: 'Eco-Friendly',
    description: 'Learn about sustainable design practices for a better future.',
    backgroundColor: '#27ae60', // Green color
    aspectRatio: '16/9'
  },
  {
    title: 'Modern Architecture',
    subtitle: 'Contemporary Design',
    description: 'Explore the latest trends in modern architecture and design.',
    image: 'https://cdn.cosmos.so/0c0eb690-73ce-4a3c-b2b6-68d3d9e9ece6?format=jpeg',
    aspectRatio: '4/5'
  },
  {
    title: 'Urban Living',
    subtitle: 'City Lifestyle',
    description: 'Discover the perfect balance of comfort and style in urban spaces.',
    backgroundColor: '#3498db', // Blue color
    aspectRatio: '4/3'
  },
  {
    title: 'Minimalist Design',
    subtitle: 'Less is More',
    description: 'Experience the beauty of simplicity in modern minimalist design.',
    image: 'https://cdn.cosmos.so/0c0eb690-73ce-4a3c-b2b6-68d3d9e9ece6?format=jpeg',
    aspectRatio: '1/1'
  },
  {
    title: 'Luxury Interiors',
    subtitle: 'Premium Design',
    description: 'Indulge in the finest luxury interior design concepts.',
    image: 'https://cdn.cosmos.so/0c0eb690-73ce-4a3c-b2b6-68d3d9e9ece6?format=jpeg',
    aspectRatio: '3/2'
  }
])

const handleNavItemClick = ({ item, index }) => {
  navigationItems.forEach(navItem => navItem.active = false)
  navigationItems[index].active = true
  selectedItem.value = item
}

const handleVersionSelect = (item) => {
  selectedVersion.value = item.label
}
</script>

<style>

.hero-section {
  padding: 128px 0px 64px 0px;
  align-items: center;
  justify-content: center;
  gap: var(--space-large);
}

.layout-template {
  display: flex;
  min-height: 100vh;
  width: 100vw;
  padding: 16px;
  overflow: visible; /* Change from hidden to visible */
  background-color: var(--bg-elevation-base);
  margin-bottom: 50vh;
}

.side-navigation-header {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-direction: row; /* Corrected from flex: row */
  width: 100%;
}

.side-navigation-header.sidenav--collapsed {
  justify-content: center;
}

.logo-svg {
  min-width: 32px;
  min-height: 32px;
  width: 32px;
  height: 32px;
  fill: var(--fg-object-solid-1000);
}

.main-content-area {
  flex: 1; /* Take up remaining space */
  padding: 0px 32px;
  overflow: visible; /* Change from auto to visible */
}

.side-navigation {
  flex-shrink: 0; /* Don't allow sidebar to shrink */
  width: 280px; /* Fixed width */
  overflow: visible;
}

.side-navigation--collapsed {
  width: 60px;
}

/* Ensure grid items don't cause overflow issues */
.grid-area {
  overflow: visible;
}

.carousel-grid {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: auto;
  grid-template-rows: 450px; /* Fixed height for all cards */
  gap: var(--space-medium);
}

.carousel-grid > * {
  height: 100%; /* Make all cards take full height of the grid row */
  width: auto; /* Let width be determined by aspect ratio */
}
</style> 