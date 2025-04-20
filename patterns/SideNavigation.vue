<template>
  <div class="sidenav" :class="{ 
    'sidenav--collapsed': isCollapsed && !isMobile, 
    'sidenav--mobile': isMobile,
    'sidenav--mobile-expanded': isMobile && isMobileExpanded 
  }">
    
    <div class="sidenav__content">
      <div class="sidenav__header">
          <slot name="logo"></slot>
          <div v-if="isMobile" class="sidenav__mobile-toggle" @click="toggleMobileMenu">
            <Icon :name="isMobileExpanded ? 'x' : 'menu'" :size="24" />
          </div>
      </div>
      <div class="sidenav__scrollable">
        <Divider color="discrete" margin="var(--space-medium)" />
        <ul class="sidenav__menu">
          <div 
            v-for="(item, index) in items" 
            :key="index" 
            class="nav-item"
            :class="{ 'nav-item--active': item.active }"
            @click="handleItemClick(item, index)"
            @mouseenter="handleItemHover(index, true)"
            @mouseleave="handleItemHover(index, false)"
          >
            <div class="nav-item__content">
              <Icon 
                v-if="item.icon" 
                :name="item.icon" 
                :size="20" 
                class="nav-item__icon" 
              />
              <span class="nav-item__label body-sm">{{ item.label }}</span>
            </div>
            <div 
              v-if="item.badge" 
              class="nav-item__badge"
            ></div>
            <Tooltip 
              v-if="isCollapsed && !isMobile" 
              :text="item.label"
              position="right"
              :visible="hoveredItemIndex === index"
              class="nav-item__tooltip"
            />
          </div>
        </ul>
      </div>
    </div>
    
    <div class="sidenav__footer" v-if="!isMobile || isMobileExpanded">
      <slot name="footer"></slot>
      <div 
        v-if="!isMobile"
        class="sidenav__toggle" 
        @click="toggleCollapse"
        @mouseenter="showCollapseTooltip = true"
        @mouseleave="showCollapseTooltip = false"
      >
        <Icon :name="isCollapsed ? 'chevron-right' : 'chevron-left'" :size="20" />
        <span v-if="!isCollapsed" class="body-sm" style="margin: 0px;">Collapse</span>
        <Tooltip 
          v-if="isCollapsed" 
          :text="'Expand'" 
          position="right" 
          :visible="showCollapseTooltip"
          class="nav-item__tooltip"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import Tooltip from '../components/Tooltip.vue'
import Divider from '../components/Divider.vue'
import Icon from '../components/Icon.vue'

interface NavigationItem {
  label: string
  icon?: string
  active?: boolean
  badge?: boolean
  onClick?: () => void
}

interface Props {
  items: NavigationItem[]
  isCollapsed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isCollapsed: false
})

const emit = defineEmits(['itemClick', 'update:isCollapsed'])

const isCollapsed = ref(props.isCollapsed)
const isMobile = ref(false)
const isMobileExpanded = ref(false)

// Watch for prop changes to update internal state
watch(() => props.isCollapsed, (newValue) => {
  isCollapsed.value = newValue
})

// Watch for internal state changes to emit update events
watch(isCollapsed, (newValue) => {
  emit('update:isCollapsed', newValue)
})

const hoveredItemIndex = ref<number | null>(null)
const showCollapseTooltip = ref(false)

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const toggleMobileMenu = () => {
  isMobileExpanded.value = !isMobileExpanded.value
  if (isMobileExpanded.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const handleItemClick = (item: NavigationItem, index: number) => {
  if (item.onClick) {
    item.onClick()
  }
  emit('itemClick', { item, index })
  if (isMobile.value) {
    isMobileExpanded.value = false
    document.body.style.overflow = ''
  }
}

const handleItemHover = (index: number, isHovered: boolean) => {
  hoveredItemIndex.value = isHovered ? index : null
}

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Base styles */
.sidenav {
  width: 280px;
  display: flex;
  flex-direction: column;
  background-color: var(--color-surface);
  transition: width 0.3s ease;
  flex-shrink: 0;
  padding: 16px;
  justify-content: space-between;
  z-index: 1000;
  background-color: var(--bg-clickable-hover-inverse);
  backdrop-filter: blur(128px);
  border-radius: 8px;
  overflow: visible;
  height: calc(100vh - 32px);
}

.sidenav--collapsed {
  width: 68px;
}

/* Mobile styles */
.sidenav--mobile {
  width: calc(100% - 32px);
  position: fixed;
  top: 0;
  left: 0;
  height: auto;
  border-radius: 8;
  padding: 0;
  margin: 16px;

}

.sidenav--mobile .sidenav__content {
  flex-direction: column;
  width: 100%;
}

.sidenav--mobile .sidenav__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  position: relative;
  z-index: 1;
}

.sidenav--mobile-expanded {
  height: 100vh;
}

.sidenav--mobile-expanded .sidenav__scrollable {
  height: calc(100vh - 64px);
  overflow-y: visible;
  display: block;
  padding: 16px;
}

.sidenav--mobile:not(.sidenav--mobile-expanded) .sidenav__scrollable {
  display: none;
}

.sidenav__mobile-toggle {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
}

.sidenav__scrollable {
  flex: 1;

}

/* Header */
.sidenav__header {
  padding: var(--spacing-md);
}

.sidenav__logo {
  height: 32px;
  display: flex;
  align-items: center;
}

.sidenav--collapsed .sidenav__logo-placeholder {
  width: 32px;
}

/* Menu */
.sidenav__menu {
  list-style: none;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Navigation items */
.nav-item, .sidenav__toggle {
  position: relative;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  min-width: 36px;
  color: var(--fg-text-defined);
  width: 100%;
}

.nav-item:hover {
  background-color: var(--bg-clickable-hover);
  color: var(--fg-text-strong);
}

.nav-item__content {
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.15s ease;
}

.nav-item__icon {
  flex-shrink: 0;
}

.nav-item__label {
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: opacity 0.2s ease;
  margin: 0px !important;
}

/* Collapsed state */
.sidenav--collapsed .nav-item__content {
  justify-content: center;
  padding: var(--spacing-sm) 0;
}

.sidenav--collapsed .nav-item__label {
  width: 0;
  opacity: 0;
  display: none;
}

.sidenav--collapsed .nav-item__badge {
  position: absolute;
  top: 10px;
  right: 10px;
}

/* Footer */
.sidenav__footer {
  padding: var(--spacing-md);
}

.sidenav--collapsed .sidenav__footer {
  display: flex;
  justify-content: center;
}

/* Toggle button */
.sidenav__toggle {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  color: var(--text-secondary);
  position: relative;
}

.sidenav__toggle:hover {
  color: var(--text-primary);
  background-color: var(--bg-clickable-hover);
}

.sidenav--collapsed .sidenav__toggle {
  justify-content: center;
}

.nav-item__tooltip {
  position: absolute;
  left: 48px;
  top: 50%;
  transform: translateY(-50%);
}
</style> 