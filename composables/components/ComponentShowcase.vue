<template>
  <div class="component-showcase">
    <h2 class="component-showcase__title body-sm color-soft">{{ title }}</h2>
    <div class="component-showcase__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<style>
.component-showcase {
  display: flex;
  gap: var(--space-large);
  align-items: flex-start;
  width: 80vw;
  padding: var(--space-large) 0;
  border-top: 1px solid var(--fg-border-discrete);
}

.component-showcase__title {
  min-width: 400px;
  position: absolute;
}

.component-showcase__content {
  flex: 1;
  min-height: 300px;
  width: 100%;
  /* border: 1px solid var(--neutral-solid-200); */
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
</style> 