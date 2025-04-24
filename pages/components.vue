<template>
  <NuxtLayout name="default">
    <Breadcrumb />
    <div class="hero-section">
      <h1 class="supertype-sm" style="max-width: 20ch;">Components</h1>
    </div> 
    <Tabs 
      v-model="activeTab"
      :items="tabItems"
    />
    <div class="grid">
      <template v-if="activeTab === 'avatar'">
        <Card 
          imageSrc="https://images.unsplash.com/photo-1570158268183-d296b2892211?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Avatar"
          imageAspectRatio="1x1"
          imageOrientation="portrait"
          class="split-4"
        />
      </template>
      <template v-else-if="activeTab === 'badge'">
        <Card 
          imageSrc="https://images.unsplash.com/photo-1570158268183-d296b2892211?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Badge"
          imageAspectRatio="1x1"
          imageOrientation="portrait"
          class="split-4"
        />
      </template>
      <template v-else-if="activeTab === 'banner'">
        <Card 
          imageSrc="https://images.unsplash.com/photo-1570158268183-d296b2892211?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Banner"
          imageAspectRatio="1x1"
          imageOrientation="portrait"
          class="split-4"
        />
      </template>
      <template v-else-if="activeTab === 'breadcrumb'">
        <Card 
          imageSrc="https://images.unsplash.com/photo-1570158268183-d296b2892211?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Breadcrumb"
          imageAspectRatio="1x1"
          imageOrientation="portrait"
          class="split-4"
        />
      </template>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('avatar');
const tabItems = [
  { id: 'avatar', label: 'Avatar' },
  { id: 'badge', label: 'Badge' },
  { id: 'banner', label: 'Banner' },
  { id: 'breadcrumb', label: 'Breadcrumb' }
];
</script>

<style scoped>
.hero-section {
  padding: 0px 0px 128px 0px;
  align-items: start;
  justify-content: start;
  gap: var(--space-large);
  width: 100%;
}

.storyblock{
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 740px;
  gap: var(--space-large);
  padding: var(--space-large) 0px;
}

.intro-block{
  display: flex;
  flex-direction: column;
  gap: var(--space-small);
  width: 100%;
  padding-top: 32px;
  padding-bottom: 64px;
  border-top: 1px solid var(--fg-border-disabled);
  position: relative;
}

.readtime{
  color: var(--fg-text-soft);
  position: absolute;
  left: 0;
  top: 32px;
}

.intro-block .body-lg {
  max-width: 740px;
  order: 1;
}

.author-block{
  color: var(--fg-text-soft);
  display: flex;
  flex-direction: row;
  gap: var(--space-small);
  align-items: start;
  justify-self: start;
  margin-top: 64px;
}

.body-sm-loud {
  margin: 64px 0px 16px 0px;
}

.two-column-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-small);
  width: 100%;
  padding-bottom: 64px;
  position: relative;
}
.three-col-block {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 1fr;
  gap: var(--space-small);
  width: 100%;
  padding-top: 32px;
  padding-bottom: 64px;
  position: relative;
}

.three-col-block > * {
  min-height: 300px;
}

.project-card-wrapper {
  height: 100%;
  min-height: 300px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

@media (max-width: 768px) {
  .readtime {
    position: static;
    order: 2;
    margin-top: var(--space-small);
  }
  
  .intro-block {
    padding-left: var(--space-small);
    padding-right: var(--space-small);
  }
}
</style> 