<template>
  <div class="badge" :class="{ 'badge--dot': isDot }">
    <span v-if="!isDot" class="badge__content body-xs-loud color-strong-inverse">
      {{ formattedValue }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: [Number, String],
    default: ''
  },
  max: {
    type: Number,
    default: 99
  },
  isDot: {
    type: Boolean,
    default: false
  }
})

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
  background-color: var(--bg-clickable-danger-danger);
  border-radius: 4px;
  font-size: var(--unit-12);
  font-weight: var(--font-weight-composed);
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