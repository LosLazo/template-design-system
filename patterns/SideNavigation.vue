<template>
  <div class="sidenav" :class="{ 'sidenav--collapsed': isCollapsed }">
    
    <div class="sidenav__content">
      <div class="sidenav__header">
          <slot name="logo"></slot>
      </div>
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
            v-if="isCollapsed" 
            :text="item.label"
            position="right"
            :visible="hoveredItemIndex === index"
            class="nav-item__tooltip"
          />
        </div>
      </ul>
    </div>
    
    <div class="sidenav__footer">
      <slot name="footer"></slot>
      <div 
        class="sidenav__toggle" 
        @click="toggleCollapse"
        @mouseenter="showCollapseTooltip = true"
        @mouseleave="showCollapseTooltip = false"
      >
        <Icon :name="isCollapsed ? 'chevron-right' : 'chevron-left'" :size="20" />
        <span v-if="!isCollapsed" class="body-sm">Collapse</span>
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
import { ref, watch } from 'vue'
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

const handleItemClick = (item: NavigationItem, index: number) => {
  if (item.onClick) {
    item.onClick()
  }
  emit('itemClick', { item, index })
}

const handleItemHover = (index: number, isHovered: boolean) => {
  hoveredItemIndex.value = isHovered ? index : null
}
</script>

<style scoped>
/* Base styles */
.sidenav {
  width: 280px;
  display: flex;
  flex-direction: column;
  position: sticky;
  background-color: var(--color-surface);
  transition: width 0.3s ease;
  flex-shrink: 0;
  padding: 16px;
  justify-content: space-between;
  z-index: 10;
  background-color: var(--bg-clickable-hover-inverse);
  backdrop-filter: blur(128px);
  border-radius: 8px;
  overflow: visible;
}

.sidenav--collapsed {
  width: 60px;
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
}

/* Navigation items */
.nav-item {
  position: relative;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  min-width: 36px;
}

.nav-item:hover {
  background-color: var(--bg-clickable-hover);
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
  overflow: hidden;
  text-overflow: ellipsis;
  transition: opacity 0.2s ease;
}

.nav-item__badge {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-accent);
}

/* Active state */
.nav-item--active .nav-item__content,
.nav-item--active .nav-item__icon {
  color: var(--color-primary);
  font-weight: var(--font-weight-bold);
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