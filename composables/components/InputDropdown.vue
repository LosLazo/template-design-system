<template>
  <div class="input-dropdown" :class="{ 'input-dropdown--expanded': isExpanded }">
    <div 
      class="input-dropdown__control"
      @click="toggleDropdown"
    >
      <Input
        :id="id"
        :modelValue="displayValue"
        @update:modelValue="handleInputChange"
        :label="label"
        :placeholder="placeholder"
        :size="size"
        :disabled="disabled"
        :error="error"
        :success="success"
        :prefixIcon="prefixIcon"
        suffixIcon="chevron-down"
        :class="{ 'input-dropdown__input--expanded': isExpanded }"
        :readonly="!editable"
      />
    </div>
    <div v-if="isExpanded" class="input-dropdown__menu">
      <Menu :items="processedItems" @click="handleItemClick" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Input from './Input.vue'
import Menu from './Menu.vue'

/**
 * @component InputDropdown
 * @description An input component with dropdown menu functionality.
 * Combines the functionality of an input field with selectable options.
 * @example
 * <InputDropdown
 *   id="dropdown1"
 *   v-model="selectedOption"
 *   :items="[{label: 'Option 1'}, {label: 'Option 2'}]"
 *   label="Select an option"
 * />
 */

interface Props {
  /**
   * Current value of the input field
   */
  modelValue: string
  
  /**
   * Label text for the input field
   */
  label?: string
  
  /**
   * Placeholder text for the input field
   */
  placeholder?: string
  
  /**
   * Size of the input field
   * @default 'medium'
   */
  size?: 'large' | 'medium' | 'small'
  
  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean
  
  /**
   * Error message to display
   */
  error?: string
  
  /**
   * Success message to display
   */
  success?: string
  
  /**
   * Icon to display before the input text
   */
  prefixIcon?: string
  
  /**
   * Unique identifier for the input field
   */
  id: string
  
  /**
   * Array of items to display in the dropdown
   */
  items: Array<{ label: string; value?: string; selected?: boolean }>
  
  /**
   * Whether the input text can be edited manually
   * @default false
   */
  editable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  disabled: false,
  editable: false
})

/**
 * Define emitted events
 */
const emit = defineEmits<{
  /**
   * Emitted when the input value changes
   * @param value - The new input value
   */
  'update:modelValue': [value: string]
  
  /**
   * Emitted when an item is selected from the dropdown
   * @param item - The selected item object
   */
  'select': [item: { label: string; value?: string }]
}>()

/**
 * Whether the dropdown is currently expanded
 * @private
 */
const isExpanded = ref(false)

/**
 * The value to display in the input field
 * @private
 */
const displayValue = computed(() => {
  return props.modelValue || props.placeholder || ''
})

/**
 * Processed items with selected state
 * @private
 */
const processedItems = computed(() => {
  return props.items.map(item => ({
    ...item,
    selected: item.label === props.modelValue
  }))
})

/**
 * Toggle the dropdown expansion state
 */
const toggleDropdown = () => {
  if (!props.disabled) {
    isExpanded.value = !isExpanded.value
  }
}

/**
 * Handle input field value changes
 * @param value - The new input value
 */
const handleInputChange = (value: string) => {
  if (props.editable) {
    emit('update:modelValue', value)
  }
}

/**
 * Handle item selection from the dropdown
 * @param item - The selected item
 */
const handleItemClick = (item: { label: string; value?: string }) => {
  emit('update:modelValue', item.label)
  emit('select', item)
  isExpanded.value = false
}

/**
 * Close dropdown when clicking outside
 * @private
 */
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.input-dropdown')) {
    isExpanded.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style>
.input-dropdown {
  position: relative;
  width: fit-content;
}

.input-dropdown__control {
  cursor: pointer;
  width: 100%;
}

/* Make the input field look clickable even when readonly */
.input-dropdown__control input {
  cursor: pointer;
}

.input-dropdown__menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: var(--ei-dimension-space-tiny);
  z-index: 1000;
}

.input-dropdown__input--expanded .input__icon--suffix {
  transform: rotate(180deg);
  transition: transform 0.2s ease;
}
</style> 