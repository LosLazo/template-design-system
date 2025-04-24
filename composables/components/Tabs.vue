<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue';

/**
 * @component Tabs
 * @description A tabbed interface component that allows switching between different content sections.
 * Features an animated indicator that follows the selected tab.
 * 
 * @example <Tabs v-model="activeTab" :items="[{id: 'tab1', label: 'First Tab'}, {id: 'tab2', label: 'Second Tab'}]" />
 * @example <Tabs v-model="activeSection" :items="tabs" />
 * @example <Tabs v-model="view" :items="[{id: 1, label: 'Details'}, {id: 2, label: 'Reviews', disabled: true}]" />
 */

/**
 * Tab item interface
 * @typedef {Object} TabItem
 * @property {string|number} id - Unique identifier for the tab
 * @property {string} label - Display text for the tab
 * @property {boolean} [disabled] - Whether the tab is disabled
 */

/**
 * Tabs component props
 * @typedef {Object} TabsProps
 */
interface Props {
  /**
   * Currently selected tab ID (v-model)
   * @type {string|number}
   * @required
   */
  modelValue: string | number;
  
  /**
   * Array of tab items to display
   * @type {TabItem[]}
   * @required
   */
  items: Array<{
    id: string | number;
    label: string;
    disabled?: boolean;
  }>;
}

const props = defineProps<Props>();

/**
 * Events emitted by the Tabs component
 * @typedef {Object} TabsEmits
 * @property {Function} update:modelValue - Emitted when a tab is selected
 */
const emit = defineEmits<{
  'update:modelValue': [value: string | number];
}>();

/**
 * Selects a tab by its ID and emits the update event
 * Does nothing if the tab is disabled
 * @param {string|number} id - ID of the tab to select
 */
const selectTab = (id: string | number) => {
  if (props.items.find(item => item.id === id)?.disabled) return;
  emit('update:modelValue', id);
};

// Add refs for animation
const tabsRef = ref<HTMLElement | null>(null);
const activeTabRef = ref<HTMLElement | null>(null);
const indicatorStyle = ref({
  width: '0px',
  transform: 'translateX(0px)',
});

/**
 * Watch for changes to the selected tab and update the indicator position
 */
watch(() => props.modelValue, () => {
  nextTick(() => {
    const activeTab = tabsRef.value?.querySelector('.tabs__item--active') as HTMLElement;
    if (activeTab) {
      indicatorStyle.value = {
        width: `${activeTab.offsetWidth}px`,
        transform: `translateX(${activeTab.offsetLeft}px)`,
      };
    }
  });
});

/**
 * Initialize the indicator position when the component is mounted
 */
onMounted(() => {
  const activeTab = tabsRef.value?.querySelector('.tabs__item--active') as HTMLElement;
  if (activeTab) {
    indicatorStyle.value = {
      width: `${activeTab.offsetWidth}px`,
      transform: `translateX(${activeTab.offsetLeft}px)`,
    };
  }
});
</script>

<template>
  <div class="tabs" role="tablist" ref="tabsRef">
    <button
      v-for="item in items"
      :key="item.id"
      class="tabs__item"
      :class="{
        'tabs__item--active': modelValue === item.id,
        'tabs__item--disabled': item.disabled
      }"
      role="tab"
      :aria-selected="modelValue === item.id"
      :disabled="item.disabled"
      @click="selectTab(item.id)"
    >
      {{ item.label }}
    </button>
    <div class="tabs__indicator" :style="indicatorStyle" />
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: var(--space-medium);
  border-bottom: 1px solid var(--fg-border-discrete);
  position: relative;
}

.tabs__item {
  padding: 8px 16px;
  border: none;
  background: none;
  color: var(--fg-text-soft);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  margin-bottom: -1px;
  border-radius: 8px;
}

.tabs__item:hover:not(.tabs__item--disabled) {
  color: var(--fg-text-strong);
}

.tabs__item--active {
  color: var(--fg-text-strong);
}

.tabs__item--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.tabs__indicator {
  position: absolute;
  bottom: -1px;
  left: 0;
  height: 1px;
  background-color: var(--fg-border-strong);
  transition: all 0.3s ease;
  z-index: 1;
}
</style> 