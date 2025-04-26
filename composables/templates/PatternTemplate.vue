<template>
  <NuxtLayout name="default">
    <Breadcrumb />
    <div class="hero-section">
      <h1 class="headline-lg" style="max-width: 20ch;">{{ content.title || 'Pattern' }}</h1>
    </div>
    <div class="intro-block">
      <p class="body-lg">{{ content.intro }}</p>
    </div>
    
    <div v-if="content.examples && content.examples.length" class="grid">
      <h2 class="headline-sm col-12">Examples</h2>
      <div v-for="(example, index) in content.examples" :key="index" class="example-block col-12">
        <h3 class="title-md">{{ example.title }}</h3>
        <p class="body-md">{{ example.description }}</p>
        <Image 
          v-if="example.image" 
          :src="example.image.url" 
          :backgroundColor="example.image.backgroundColor || '#32261F'" 
          :alt="example.image.alt || 'Example image'" 
          class="col-12" 
        />
      </div>
    </div>
    
    <div class="content-block">
      <!-- Pattern documentation content -->
      <div v-if="content.bodyHtml" v-html="content.bodyHtml"></div>
      <template v-else-if="content.sections">
        <div v-for="(section, index) in content.sections" :key="index" class="pattern-section">
          <h2 class="headline-sm">{{ section.title }}</h2>
          <p class="body-md">{{ section.content }}</p>
        </div>
      </template>
      
      <!-- Guidelines section if available -->
      <div v-if="content.guidelines" class="guidelines-section">
        <h2 class="headline-sm">Guidelines</h2>
        <ul class="guidelines-list">
          <li v-for="(guideline, index) in content.guidelines" :key="index" class="body-md">
            {{ guideline.text }}
          </li>
        </ul>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
// Content prop is passed from the parent component
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
  gap: var(--ei-dimension-space-large);
  width: 100%;
}

.intro-block {
  display: flex;
  flex-direction: column;
  gap: var(--ei-dimension-space-small);
  width: 100%;
  padding-top: 32px;
  padding-bottom: 64px;
  border-top: 1px solid var(--ei-color-fg-border-disabled);
  position: relative;
  align-items: center;
}

.intro-block .body-lg {
  max-width: 740px;
}

.content-block {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 740px;
  margin: 0 auto;
  gap: var(--ei-dimension-space-large);
  padding: var(--ei-dimension-space-large) 0px;
}

.example-block {
  margin-bottom: var(--ei-dimension-space-large);
  padding: var(--ei-dimension-space-medium);
  border: 1px solid var(--ei-color-fg-border-disabled);
  border-radius: var(--ei-dimension-radius-medium);
}

.pattern-section {
  margin-bottom: var(--ei-dimension-space-large);
  display: flex;
  flex-direction: column;
  gap: var(--ei-dimension-space-small);
}

.guidelines-section {
  margin-top: var(--ei-dimension-space-xlarge);
}

.guidelines-list {
  list-style-type: disc;
  padding-left: 20px;
}

.guidelines-list li {
  margin-bottom: var(--ei-dimension-space-small);
}

@media (max-width: 768px) {
  .intro-block,
  .content-block {
    padding-left: var(--ei-dimension-space-small);
    padding-right: var(--ei-dimension-space-small);
  }
}
</style> 