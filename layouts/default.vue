<template>
  <div class="layout-template">
    <div class="layout-content">
      <div class="sticky-navigation-container">
        <SideNavigation 
          :items="navigationItems" 
          @itemClick="handleNavItemClick"
          v-model:isCollapsed="sideNavCollapsed"
        >
          <template #logo>
            <div class="side-navigation-header title-md" :class="{ 'sidenav--collapsed': sideNavCollapsed }">
              <NuxtLink to="/">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0001 9.49006C15.1077 12.636 12.6361 15.1076 9.49015 16C12.6361 16.8924 15.1077 19.364 16.0001 22.5099C16.8925 19.364 19.3641 16.8924 22.51 16C19.3641 15.1076 16.8925 12.636 16.0001 9.49006Z" fill="var(--fg-object-strong)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.4545 1.45455H14.5455V4.36364H17.4545V1.45455ZM13.0909 0V5.81818H18.9091V0H13.0909Z" fill="var(--fg-object-strong)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M30.5455 14.5455H27.6364V17.4545H30.5455V14.5455ZM26.1818 13.0909V18.9091H32V13.0909H26.1818Z" fill="var(--fg-object-strong)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.36364 14.5455H1.45455V17.4545H4.36364V14.5455ZM0 13.0909V18.9091H5.81818V13.0909H0Z" fill="var(--fg-object-strong)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.4545 27.6364H14.5455V30.5455H17.4545V27.6364ZM13.0909 26.1818V32H18.9091V26.1818H13.0909Z" fill="var(--fg-object-strong)"/>
              </svg>
            </NuxtLink>
              <div v-if="!sideNavCollapsed" class="title-md" style="width: 100%;">Glimmer</div>
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
      </div>
      
      <div class="main-content-area">
        <!-- Slot for page content -->
        <slot />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InputDropdown from '~/components/InputDropdown.vue'
import SideNavigation from '~/patterns/SideNavigation.vue'
import Footer from '~/patterns/Footer.vue'

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

const handleNavItemClick = ({ item, index }) => {
  navigationItems.forEach(navItem => navItem.active = false)
  navigationItems[index].active = true
}

const handleVersionSelect = (item) => {
  selectedVersion.value = item.label
}
</script>

<style>
.layout-template {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  padding: 0;
  background-color: var(--bg-elevation-base);
  margin-bottom: 50vh;
}

.layout-content {
  display: flex;
  flex-direction: row;
  flex: 1;
  padding: 16px;
  width: 100%;
  min-height: 100vh;
}

.sticky-navigation-container {
  position: sticky;
  top: 16px;
  align-self: flex-start;
  z-index: 10;
  height: fit-content;
  max-height: calc(100vh - 32px);
}

.layout-template > .banner {
  width: 100%;
  margin: 0;
}

.side-navigation-header {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-direction: row;
  width: 100%;
  padding: 0px 2px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* Add this to control children width consistently */
.main-content-area > * {
  width: 100%;
}
</style> 