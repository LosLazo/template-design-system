<template>
  <div class="badge" :class="{ 'badge--dot': isDot }">
    <span v-if="!isDot" class="badge__content body-xs-loud color-strong-inverse">
      {{ formattedValue }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * @component Badge
 * @description Displays a small numerical value or indicator that can be used for notifications, counts, or status indicators.
 * The badge can be displayed as a number with optional maximum value or as a simple dot.
 * 
 * @example <Badge value="5" />
 * @example <Badge value="100" max="99" />
 * @example <Badge isDot />
 * @example <Badge value="NEW" />
 */

/**
 * Badge component props
 * @typedef {Object} BadgeProps
 */
const props = defineProps({
  /**
   * Content to be displayed inside the badge
   * @type {Number|String}
   * @default ''
   */
  value: {
    type: [Number, String],
    default: ''
  },
  /**
   * Maximum value to show before adding a '+' suffix
   * If the value exceeds this number, it will display as "{max}+"
   * @type {Number}
   * @default 99
   */
  max: {
    type: Number,
    default: 99
  },
  /**
   * Whether to display as a small dot without content
   * When true, the badge appears as a simple colored dot indicator
   * @type {Boolean}
   * @default false
   */
  isDot: {
    type: Boolean,
    default: false
  }
})

/**
 * Formats the badge value based on the max prop
 * @returns {String|Number} Formatted value with '+' suffix if it exceeds the max
 */
const formattedValue = computed(() => {
  if (typeof props.value === 'number') {
    return props.value > props.max ? `${props.max}+` : props.value
  }
  return props.value
})
</script>

<style>
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 8px;
  background-color: var(--ei-color-bg-clickable-danger-danger);
  border-radius: 4px;
  font-size: var(--ei-dimension-unit-12);
  font-weight: var(--ei-typography-weight-composed);
  border-radius: 4px;
}

.badge--dot {
  width: 8px;
  height: 8px;
  min-width: unset;
  padding: 0;
}

.badge__content {
  line-height: 1;
}
</style> 