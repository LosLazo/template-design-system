<template>
  <NuxtLayout name="default">
    <Breadcrumb />
    <div class="hero-section">
      <h1 style="max-width: 20ch;">{{ content.title }}</h1>
    </div>
    <div class="intro-block">
      <p class="readtime" v-if="content.readTime">{{ content.readTime }}</p>
      <p class="body-lg">{{ content.intro }}</p>
    </div>
    <Image 
      v-if="content.mainImage" 
      :src="content.mainImage.url" 
      :backgroundColor="content.mainImage.backgroundColor || '#32261F'" 
      :alt="content.mainImage.alt || 'Image'" 
      class="col-12" 
    />
    <div class="body-md color-defined storyblock">
      <!-- Render content body based on Portable Text or HTML content -->
      <div v-if="content.bodyHtml" v-html="content.bodyHtml"></div>
      <template v-else-if="content.bodyText">
        <p v-for="(paragraph, index) in content.bodyText" :key="index">{{ paragraph }}</p>
      </template>

      <!-- Author section if available -->
      <div v-if="content.author" class="author-block">
        <Avatar 
          shape="squircle" 
          size="48" 
          :src="content.author.image?.url" 
          :alt="content.author.name" 
        />
        <div>
          <p class="color-strong" style="margin-top: 0px;">{{ content.author.name }}</p>
          <p class="color-soft" style="margin-top: 0px;">{{ content.author.title }}</p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import Breadcrumb from '~/composables/components/Breadcrumb.vue';
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
  align-items: center;
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