<script setup lang="ts">
interface Props {
  modelValue: boolean;
  disabled?: boolean;
  size?: 'small' | 'default';
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  size: 'default',
  label: ''
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const toggle = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue);
  }
};
</script>

<template>
  <label
    :class="[
      'checkbox',
      `checkbox--${size}`,
      {
        'checkbox--disabled': disabled
      }
    ]"
  >
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="toggle"
      class="checkbox__input"
    />
    <span class="checkbox__box">
      <svg
        v-if="modelValue"
        class="checkbox__check"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 6L9 17L4 12"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <span v-if="label" class="checkbox__label">{{ label }}</span>
  </label>
</template>

<style scoped>
.checkbox {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--space-small);
  cursor: pointer;
  user-select: none;
}

.checkbox--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.checkbox__input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkbox__box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 1px solid var(--fg-border-defined);
  border-radius: 4px;
  background-color: var(--bg-elements-100);
  transition: all 0.2s ease;
}

.checkbox--small .checkbox__box {
  width: 20px;
  height: 20px;
}

.checkbox__input:focus-visible + .checkbox__box {
  border-color: var(--fg-border-clickable-focus);
  box-shadow: 0 0 0 2px var(--fg-border-clickable-focus);
}

.checkbox__input:checked + .checkbox__box {
  background-color: var(--bg-clickable-primary-default);
  border-color: var(--bg-clickable-primary-default);
}

.checkbox__input:not(:disabled):hover + .checkbox__box {
  background-color: var(--bg-clickable-hover);
}

.checkbox__input:not(:disabled):active + .checkbox__box {
  background-color: var(--bg-clickable-pressed);
}

.checkbox__check {
  width: 16px;
  height: 16px;
  color: var(--fg-text-strong-inverse);
}

.checkbox--small .checkbox__check {
  width: 14px;
  height: 14px;
}

.checkbox__label {
  font-size: var(--units-font-size-300);
  line-height: var(--units-line-height-300);
  color: var(--fg-text-strong);
}

.checkbox--disabled .checkbox__label {
  color: var(--fg-text-soft);
}
</style> 