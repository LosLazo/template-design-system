<template>
  <div 
    class="slider" 
    :class="{ 'slider--dragging': isDragging }"
    ref="sliderEl"
  >
    <div 
      class="slider__rail" 
      ref="railEl"
      @mousedown="startDrag"
      @touchstart="startDrag"
    >
      <div 
        class="slider__filler" 
        :style="{ width: `${percentage}%` }"
      >
        <div 
          class="slider__line" 
          :style="{ width: '100%' }"
        ></div>
      </div>
      <div 
        class="slider__grabber" 
        :style="{ left: `${percentage}%` }"
        @mousedown.stop="startDrag"
        @touchstart.stop="startDrag"
      >
        <div class="slider__thumb">
          <div class="slider__circle"></div>
        </div>
        <div class="slider__tooltip" :class="{ 'slider__tooltip--visible': isDragging }">
          <span class="slider__tooltip-text">{{ displayValue }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

/**
 * @component Slider
 * @description An interactive slider component for selecting a value within a range.
 * Features a draggable thumb, visual track/rail, and tooltip showing the current value.
 * @example
 * <Slider v-model="volume" :min="0" :max="100" :step="5" />
 */

interface SliderProps {
  /**
   * Current value of the slider
   */
  modelValue: number;
  
  /**
   * Minimum allowed value
   * @default 0
   */
  min?: number;
  
  /**
   * Maximum allowed value
   * @default 100
   */
  max?: number;
  
  /**
   * Step increment value
   * @default 1
   */
  step?: number;
  
  /**
   * Whether the slider is disabled
   * @default false
   */
  disabled?: boolean;
}

const props = withDefaults(defineProps<SliderProps>(), {
  min: 0,
  max: 100,
  step: 1,
  disabled: false
});

/**
 * Define emitted events
 */
const emit = defineEmits<{
  /**
   * Emitted continuously as the slider value changes
   * @param value - The current slider value
   */
  'update:modelValue': [value: number];
  
  /**
   * Emitted when the user stops dragging the slider
   * @param value - The final slider value after drag ends
   */
  'change': [value: number];
}>();

/**
 * Whether the slider is currently being dragged
 * @private
 */
const isDragging = ref(false);

/**
 * Reference to the slider root element
 * @private
 */
const sliderEl = ref<HTMLElement | null>(null);

/**
 * Reference to the slider rail element
 * @private
 */
const railEl = ref<HTMLElement | null>(null);

/**
 * Calculated percentage (0-100) based on current value
 * @private
 */
const percentage = computed(() => {
  return ((props.modelValue - props.min) / (props.max - props.min)) * 100;
});

/**
 * Rounded display value for the tooltip
 * @private
 */
const displayValue = computed(() => {
  return Math.round(props.modelValue);
});

/**
 * Start dragging the slider
 * @param event - Mouse or touch event
 * @private
 */
const startDrag = (event: MouseEvent | TouchEvent) => {
  if (props.disabled) return;
  
  event.preventDefault();
  isDragging.value = true;
  
  // Set value based on initial click position
  updateValueFromEvent(event);
  
  // Add event listeners for dragging
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('touchmove', onDrag, { passive: false });
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('touchend', stopDrag);
};

/**
 * Update slider value based on current pointer position
 * @param event - Mouse or touch event
 * @private
 */
const updateValueFromEvent = (event: MouseEvent | TouchEvent) => {
  if (!railEl.value) return;
  
  const rect = railEl.value.getBoundingClientRect();
  
  let clientX: number;
  if ('clientX' in event) {
    clientX = event.clientX;
  } else {
    clientX = event.touches[0].clientX;
  }
  
  // Calculate position relative to rail width
  let position = (clientX - rect.left) / rect.width;
  position = Math.max(0, Math.min(position, 1));
  
  // Convert position to value based on min/max/step
  const newValue = props.min + position * (props.max - props.min);
  const steppedValue = Math.round(newValue / props.step) * props.step;
  const clampedValue = Math.max(props.min, Math.min(props.max, steppedValue));
  
  emit('update:modelValue', clampedValue);
};

/**
 * Handle drag movement
 * @param event - Mouse or touch event
 * @private
 */
const onDrag = (event: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return;
  
  // Prevent scrolling during touch drag
  if ('touches' in event) {
    event.preventDefault();
  }
  
  updateValueFromEvent(event);
};

/**
 * Stop dragging and clean up event listeners
 * @private
 */
const stopDrag = () => {
  if (!isDragging.value) return;
  
  isDragging.value = false;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('touchmove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('touchend', stopDrag);
  
  emit('change', props.modelValue);
};

onUnmounted(() => {
  // Clean up any remaining event listeners
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('touchmove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('touchend', stopDrag);
});
</script>

<style>
.slider {
  position: relative;
  width: 100%;
  height: 20px;
  cursor: pointer;
  touch-action: none;
}

.slider__rail {
  position: relative;
  width: 100%;
  height: 4px;
  background-color: rgba(26, 26, 26, 0.1);
  border-radius: 4px;
}

.slider__filler {
  position: relative;
  height: 100%;
  width: 0;
  overflow: visible;
  display: flex;
  align-items: center;
}

.slider__line {
  height: 100%;
  background-color: var(--ei-color-fg-object-transparent-strong, #111111);
  border-radius: 4px;
}

.slider__grabber {
  position: absolute;
  top: -7px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.slider__thumb {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slider__circle {
  width: 14px;
  height: 14px;
  background-color: var(--ei-color-permanent-white, #FFFFFF);
  border: 1px solid var(--ei-color-fg-object-transparent-strong, #111111);
  border-radius: 50%;
  box-sizing: border-box;
  transition: transform 0.1s ease;
}

.slider--dragging .slider__circle {
  transform: scale(1.05);
  border-width: 1.5px;
}

.slider__tooltip {
  position: absolute;
  top: -40px;
  background-color: var(--ei-color-fg-object-solid-1000, #101010);
  border-radius: 4px;
  padding: 8px 12px;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.2s ease, transform 0.2s ease;
  pointer-events: none;
  white-space: nowrap;
}

.slider__tooltip::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -5px;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid var(--ei-color-fg-object-solid-1000, #101010);
}

.slider__tooltip--visible {
  opacity: 1;
  transform: translateY(0);
}

.slider__tooltip-text {
  color: var(--ei-color-permanent-white, #FFFFFF);
  font-family: var(--ei-typography-text);
  font-size: 12px;
  line-height: 1.3em;
}
</style> 