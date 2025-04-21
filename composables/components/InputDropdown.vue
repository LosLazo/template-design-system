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

interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  size?: 'large' | 'medium' | 'small'
  disabled?: boolean
  error?: string
  success?: string
  prefixIcon?: string
  id: string
  items: Array<{ label: string; value?: string; selected?: boolean }>
  editable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  disabled: false,
  editable: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'select': [item: { label: string; value?: string }]
}>()

const isExpanded = ref(false)

const displayValue = computed(() => {
  return props.modelValue || props.placeholder || ''
})

const processedItems = computed(() => {
  return props.items.map(item => ({
    ...item,
    selected: item.label === props.modelValue
  }))
})

const toggleDropdown = () => {
  if (!props.disabled) {
    isExpanded.value = !isExpanded.value
  }
}

const handleInputChange = (value: string) => {
  if (props.editable) {
    emit('update:modelValue', value)
  }
}

const handleItemClick = (item: { label: string; value?: string }) => {
  emit('update:modelValue', item.label)
  emit('select', item)
  isExpanded.value = false
}

// Close dropdown when clicking outside
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
  margin-top: var(--space-tiny);
  z-index: 1000;
}

.input-dropdown__input--expanded .input__icon--suffix {
  transform: rotate(180deg);
  transition: transform 0.2s ease;
}
</style> 