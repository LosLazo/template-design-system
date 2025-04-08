<script setup lang="ts">
interface Props {
  modelValue: string | number;
  items: Array<{
    id: string | number;
    label: string;
    disabled?: boolean;
  }>;
  size?: 'small' | 'default';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'default'
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
}>();

const selectSegment = (id: string | number) => {
  if (props.items.find(item => item.id === id)?.disabled) return;
  emit('update:modelValue', id);
};
</script>

<template>
  <div
    :class="[
      'segmented-controls',
      `segmented-controls--${size}`
    ]"
    role="radiogroup"
  >
    <button
      v-for="item in items"
      :key="item.id"
      class="segmented-controls__item"
      :class="{
        'segmented-controls__item--active': modelValue === item.id,
        'segmented-controls__item--disabled': item.disabled
      }"
      role="radio"
      :aria-checked="modelValue === item.id"
      :disabled="item.disabled"
      @click="selectSegment(item.id)"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<style scoped>
.segmented-controls {
  display: inline-flex;
  padding: 2px;
  background-color: var(--bg-elements-200);
  border-radius: 8px;
}

.segmented-controls--small {
  border-radius: 6px;
}

.segmented-controls__item {
  position: relative;
  padding: 8px 16px;
  border: none;
  background: none;
  color: var(--fg-text-soft);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  z-index: 1;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.segmented-controls--small .segmented-controls__item {
  padding: 6px 12px;
  font-size: 13px;
  border-radius: 4px;
}

.segmented-controls__item:hover:not(.segmented-controls__item--disabled) {
  color: var(--fg-text-soft);
}

.segmented-controls__item--active {
  color: var(--fg-text-strong);
  background-color: var(--bg-elevation-base);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.segmented-controls__item--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style> 