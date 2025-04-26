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
        <Divider color="discrete" margin="var(--ei-dimension-space-medium)" />
        <ul class="sidenav__menu">
          <div 
            v-for="(item, index) in items" 
            :key="index" 
            class="nav-item"
            :class="{ 
              'nav-item--active': item.active,
              'nav-item--expanded': expandedItemIndex === index && !isCollapsed 
            }"
          >
            <div 
              class="nav-item__content"
              @click="handleItemClick(item, index)"
              @mouseenter="handleItemHover(index, true)"
              @mouseleave="handleItemHover(index, false)"
            >
              <Icon 
                v-if="item.icon" 
                :name="item.icon" 
                :size="20" 
                class="nav-item__icon" 
              />
              <span class="nav-item__label body-sm">{{ item.label }}</span>
              <Icon 
                v-if="item.children && item.children.length > 0 && !isCollapsed" 
                :name="expandedItemIndex === index ? 'chevron-up' : 'chevron-down'" 
                :size="16" 
                class="nav-item__dropdown-icon"
                @click.stop="toggleExpandItem(index)"
              />
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
            
            <!-- Child items -->
            <div 
              v-if="item.children && item.children.length > 0 && expandedItemIndex === index && !isCollapsed" 
              class="nav-item__children"
            >
              <div 
                v-for="(child, childIndex) in item.children" 
                :key="`${index}-${childIndex}`"
                class="nav-item__child"
                @click.stop="handleChildItemClick(item, child, index, childIndex)"
              >
                <span class="nav-item__child-label body-sm">{{ child.label }}</span>
              </div>
            </div>
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
import Tooltip from '~/composables/components/Tooltip.vue'
import Divider from '~/composables/components/Divider.vue'
import Icon from '~/composables/components/Icon.vue'

interface ChildNavigationItem {
  label: string
  link?: string
  internal?: boolean
}

interface NavigationItem {
  label: string
  icon?: string
  active?: boolean
  badge?: boolean
  onClick?: () => void
  link?: string
  internal?: boolean
  children?: ChildNavigationItem[]
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
const expandedItemIndex = ref<number | null>(null)

// Watch for prop changes to update internal state
watch(() => props.isCollapsed, (newValue) => {
  isCollapsed.value = newValue
  
  // Close any expanded items when collapsing
  if (newValue) {
    expandedItemIndex.value = null
  }
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

const toggleExpandItem = (index: number) => {
  if (expandedItemIndex.value === index) {
    expandedItemIndex.value = null
  } else {
    expandedItemIndex.value = index
  }
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
  // Only handle the click if there are no children, or we're in collapsed mode
  if (!item.children || item.children.length === 0 || isCollapsed.value) {
    if (item.onClick) {
      item.onClick()
    }
    emit('itemClick', { item, index })
    if (isMobile.value) {
      isMobileExpanded.value = false
      document.body.style.overflow = ''
    }
  } else if (!isCollapsed.value) {
    // If it has children and we're not collapsed, toggle the expansion
    toggleExpandItem(index)
  }
}

const handleChildItemClick = (
  parentItem: NavigationItem, 
  childItem: ChildNavigationItem, 
  parentIndex: number, 
  childIndex: number
) => {
  emit('itemClick', { 
    item: childItem, 
    parentItem, 
    index: parentIndex,
    childIndex,
    isChild: true 
  })
  
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
  background-color: var(--ei-color-surface);
  transition: width 0.3s ease;
  flex-shrink: 0;
  padding: 16px;
  justify-content: space-between;
  z-index: 1000;
  background-color: var(--ei-color-bg-clickable-hover-inverse);
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
  overflow-y: auto;
}

/* Header */
.sidenav__header {
  padding: var(--ei-spacing-md);
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
  margin: 0;
}

/* Navigation items */
.nav-item {
  position: relative;
  margin-bottom: 4px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.nav-item__content {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 4px;
  gap: 12px;
  width: 100%;
}

.nav-item__content:hover {
  background-color: var(--ei-color-bg-clickable-hover);
}

.nav-item--active .nav-item__content {
  background-color: var(--ei-color-bg-clickable-active);
}

.nav-item__icon {
  min-width: 20px;
}

.nav-item__label {
  display: flex;
  align-items: center;
  flex: 1;
  margin: 0px;
}

.sidenav--collapsed .nav-item__label {
  display: none;
}

.nav-item__badge {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--ei-color-fg-accent-emphasis);
}

.sidenav--collapsed .nav-item__content {
  justify-content: center;
  padding: 8px;
}

/* Footer and toggle button */
.sidenav__footer {
  margin-top: 16px;
}

.sidenav__toggle {
  display: flex;
  align-items: center;
  justify-content: start;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  gap: 8px;
}

.sidenav__toggle:hover {
  background-color: var(--ei-color-bg-clickable-hover);
}

.sidenav--collapsed .sidenav__toggle {
  padding: 8px;
}

.nav-item__dropdown-icon {
  margin-left: auto;
}

/* Child items */
.nav-item__children {
  background-color: var(--ei-color-bg-clickable-hover-inverse);
  margin-left: 24px;
  margin-top: 4px;
  border-radius: 4px;
  overflow: hidden;
}

.nav-item__child {
  padding: 4px 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-radius: 4px;
}

.nav-item__child:hover {
  background-color: var(--ei-color-bg-clickable-hover);
}

.nav-item__child-label {
  display: block;
  color: var(--ei-color-fg-object-muted);
}
</style> 