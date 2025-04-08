<template>
  <div class="menu">
    <div v-for="(item, index) in items" :key="index" class="menu__item">
      <div class="menu__item-content">
        <span class="menu__item-label body-sm">{{ item.label }}</span>
        <Icon name="maximize" :size="20" />
      </div>
    </div>
  </div>
</template>

<script setup>

defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  }
})
</script>

<style>
.menu {
  background-color: var(--bg-elevation-background–inverse);
  border-radius: var(--unit-8);
  overflow: hidden;
  color: var(--fg-text-soft-inverse);
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
  min-width: 200px;
}

.menu__item {
  border-bottom: 1px solid var(--border-default);
  border-radius: var(--unit-4);
  overflow: hidden;
}

.menu__item:last-child {
  border-bottom: none;
}

.menu__item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  gap: var(--unit-16);
}

.menu__item:hover {
  color: var(--fg-text-strong-inverse);
  background-color: var(--bg-elements-800);
}
</style> 