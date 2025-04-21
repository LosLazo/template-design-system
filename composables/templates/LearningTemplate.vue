<template>
  <NuxtLayout name="default">
    <Breadcrumb />
    <div class="hero-section">
      <h1 class="headline-lg" style="max-width: 20ch;">{{ content.title || 'Learning' }}</h1>
    </div>
    <div class="intro-block">
      <p class="readtime" v-if="content.readTime">{{ content.readTime }}</p>
      <p class="body-lg">{{ content.intro }}</p>
    </div>
    
    <div class="content-block">
      <!-- Section for learning content, could include steps, videos, etc. -->
      <div v-if="content.bodyHtml" v-html="content.bodyHtml"></div>
      <template v-else-if="content.sections">
        <div v-for="(section, index) in content.sections" :key="index" class="learning-section">
          <h2 class="headline-sm">{{ section.title }}</h2>
          <p class="body-md">{{ section.content }}</p>
          
          <!-- Images for each section if available -->
          <Image 
            v-if="section.image" 
            :src="section.image.url" 
            :backgroundColor="section.image.backgroundColor || '#32261F'" 
            :alt="section.image.alt || 'Section image'" 
            class="col-12" 
          />
        </div>
      </template>
    </div>
  </NuxtLayout>
</template>

<script setup>
// Content prop is passed from the parent component
import Breadcrumb from '~/composables/components/Breadcrumb.vue';
const props = defineProps({
  content: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.hero-section {
  padding: 0px 0px 128px 0px;
  align-items: start;
  justify-content: start;
  gap: var(--space-large);
  width: 100%;
}

.intro-block {
  display: flex;
  flex-direction: column;
  gap: var(--space-small);
  width: 100%;
  padding-top: 32px;
  padding-bottom: 64px;
  border-top: 1px solid var(--fg-border-disabled);
  position: relative;
  align-items: center;
}

.readtime {
  color: var(--fg-text-soft);
  position: absolute;
  left: 0;
  top: 32px;
}

.intro-block .body-lg {
  max-width: 740px;
  order: 1;
}

.content-block {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 740px;
  margin: 0 auto;
  gap: var(--space-large);
  padding: var(--space-large) 0px;
}

.learning-section {
  margin-bottom: var(--space-large);
  display: flex;
  flex-direction: column;
  gap: var(--space-small);
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
  
  .content-block {
    padding-left: var(--space-small);
    padding-right: var(--space-small);
  }
}
</style> 