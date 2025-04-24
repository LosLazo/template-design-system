<template>
  <div 
    class="divider" 
    :class="[
      `divider--${orientation}`,
      `divider--color-${color}`
    ]"
    :style="marginStyle"
  ></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

/**
 * @component Divider
 * @description A versatile divider component for visual separation of content.
 * Supports both horizontal and vertical orientations with various color strengths.
 * @example
 * <Divider />
 * <Divider orientation="vertical" color="strong" margin="16" />
 */

interface Props {
  /**
   * The orientation of the divider
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * The color strength of the divider
   * @default 'defined'
   */
  color?: 'strong' | 'defined' | 'soft' | 'subtle' | 'discrete' | 'disabled';
  
  /**
   * Margin around the divider in pixels or CSS value
   * @default 'var(--space-medium)'
   */
  margin?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'horizontal',
  color: 'defined',
  margin: 'var(--space-medium)'
});

const marginStyle = computed(() => {
  const margin = typeof props.margin === 'number' 
    ? `${props.margin}px` 
    : props.margin;
  
  if (props.orientation === 'horizontal') {
    return {
      marginTop: margin,
      marginBottom: margin
    };
  } else {
    return {
      marginLeft: margin,
      marginRight: margin
    };
  }
});
</script>

<style scoped>
.divider {
  --divider-color: var(--fg-border-defined);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Orientation styles */
.divider--horizontal {
  width: 100%;
  height: 1px;
  background-color: var(--divider-color);
}

.divider--vertical {
  width: 1px;
  height: 100%;
  background-color: var(--divider-color);
}

/* Color variants */
.divider--color-strong {
  --divider-color: var(--fg-border-strong);
}

.divider--color-defined {
  --divider-color: var(--fg-border-defined);
}

.divider--color-soft {
  --divider-color: var(--fg-border-soft);
}

.divider--color-subtle {
  --divider-color: var(--fg-border-subtle);
}

.divider--color-discrete {
  --divider-color: var(--fg-border-discrete, rgba(0, 0, 0, 0.05));
}

.divider--color-disabled {
  --divider-color: var(--fg-border-disabled);
}
</style> 