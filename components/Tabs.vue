<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue';

interface Props {
  modelValue: string | number;
  items: Array<{
    id: string | number;
    label: string;
    disabled?: boolean;
  }>;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
}>();

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

// Update indicator position when active tab changes
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

// Initialize indicator position
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
  border-bottom: 1px solid var(--fg-border-disabled);
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
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: var(--fg-border-strong);
  transition: all 0.3s ease;
  z-index: 1;
}
</style> 