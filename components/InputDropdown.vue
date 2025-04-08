<template>
  <div class="input-dropdown" :class="{ 'input-dropdown--expanded': isExpanded }">
    <Input
      :id="id"
      v-model="localValue"
      :label="label"
      :placeholder="placeholder"
      :size="size"
      :disabled="disabled"
      :error="error"
      :success="success"
      :prefixIcon="prefixIcon"
      suffixIcon="chevron-down"
      :class="{ 'input-dropdown__input--expanded': isExpanded }"
      @click="toggleDropdown"
      readonly
    />
    <div v-if="isExpanded" class="input-dropdown__menu">
      <Menu :items="items" @click="handleItemClick" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
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
  items: Array<{ label: string; value?: string }>
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'select': [item: { label: string; value?: string }]
}>()

const isExpanded = ref(false)
const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const toggleDropdown = () => {
  if (!props.disabled) {
    isExpanded.value = !isExpanded.value
  }
}

const handleItemClick = (item: { label: string; value?: string }) => {
  localValue.value = item.label
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
  width: 100%;
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