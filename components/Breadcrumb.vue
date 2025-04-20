<template>
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol>
      <li v-for="(item, index) in parentItems" :key="index">
        <NuxtLink 
          :to="item.path" 
          class="body-sm"
        >
          {{ item.label }}
        </NuxtLink>
        <Icon v-if="index < parentItems.length - 1" name="chevron-right" :size="16" class="chevron" />
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const props = withDefaults(defineProps<{
  items?: BreadcrumbItem[];
}>(), {
  items: () => [
    { label: 'Home', path: '/' },
    { label: 'Articles', path: '/articles' },
    { label: 'Current Article', path: '#' }
  ]
});

// Compute parent items (all items except the last one)
const parentItems = computed(() => {
  return props.items.slice(0, props.items.length - 1);
});
</script>

<style scoped>
.breadcrumb {
  padding: var(--space-small) 0;
  width: 100%;
  padding: 30px 0px;
  z-index: 1000;
}

.breadcrumb ol {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
}

.breadcrumb li {
  display: flex;
  align-items: center;
}

.breadcrumb a {
  color: var(--fg-text-soft);
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.breadcrumb a.active {
  color: var(--fg-text-strong);
  pointer-events: none;
}

.chevron {
  margin: 0 var(--space-x-small);
  color: var(--fg-text-soft);
}
</style> 