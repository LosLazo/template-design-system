<script setup lang="ts">
/**
 * @component SegmentedControls
 * @description A component that provides a set of mutually exclusive options, similar to radio buttons but with a cohesive, button-like appearance.
 * Commonly used for switching between views or toggling related options.
 * @example
 * <SegmentedControls
 *   v-model="selectedOption"
 *   :items="[
 *     { id: 'day', label: 'Day' },
 *     { id: 'week', label: 'Week' },
 *     { id: 'month', label: 'Month', disabled: true }
 *   ]"
 *   size="default"
 * />
 */

interface Props {
  /**
   * The selected value, should match an item's id
   */
  modelValue: string | number;
  
  /**
   * Array of items to display as segments
   */
  items: Array<{
    /**
     * Unique identifier for the segment
     */
    id: string | number;
    
    /**
     * Display text for the segment
     */
    label: string;
    
    /**
     * Whether the segment is disabled
     */
    disabled?: boolean;
  }>;
  
  /**
   * Size of the segmented controls
   * @default 'default'
   */
  size?: 'small' | 'default';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'default'
});

/**
 * Define emitted events
 */
const emit = defineEmits<{
  /**
   * Emitted when the selected segment changes
   * @param value - The id of the selected segment
   */
  'update:modelValue': [value: string | number];
}>();

/**
 * Select a segment by its id
 * @param id - The id of the segment to select
 */
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
  background-color: var(--ei-color-bg-elements-200);
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
  color: var(--ei-color-fg-text-soft);
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
  color: var(--ei-color-fg-text-soft);
}

.segmented-controls__item--active {
  color: var(--ei-color-fg-text-strong);
  background-color: var(--ei-color-bg-elevation-base);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.segmented-controls__item--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style> 