<template>
  <div class="menu">
    <div 
      v-for="(item, index) in items" 
      :key="index" 
      class="menu__item"
      :class="{ 'menu__item--selected': item.selected }"
      @click="$emit('click', item)"
    >
      <div class="menu__item-content">
        <span class="menu__item-label body-sm">{{ item.label }}</span>
        <Icon v-if="item.selected" name="check" :size="16" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  }
})

defineEmits(['click'])

const selectedVersion = ref('')

const handleVersionSelect = (item) => {
  selectedVersion.value = item.label
}
</script>

<style>
.menu {
  background-color: var(--bg-elevation-background–inverse);
  border-radius: var(--unit-8);
  overflow: hidden;
  color: var(--fg-text-soft-inverse);
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
  min-width: 200px;
  z-index: 1000;
}

.menu__item {
  border-radius: var(--unit-4);
  overflow: hidden;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.menu__item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  gap: var(--unit-16);
}

.menu__item:hover {
  color: var(--fg-text-strong-inverse);
  background-color: var(--bg-clickable-hover-inverse);
}

.menu__item--selected {
  background-color: var(--bg-elements-700);
  color: var(--fg-text-strong-inverse);
}
</style> 