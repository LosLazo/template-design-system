<template>
  <NuxtLayout name="default">
    <Breadcrumb />
    <div class="hero-section">
      <h1 style="max-width: 20ch;">Exploring the future of AI in design systems</h1>
    </div>
    <div class="intro-block">
      <p class="readtime">6 minute read</p>
      <p class="body-lg">In the ever-evolving landscape of design and development, I've crafted a design system that serves as a universal toolkit, transcending the boundaries of specific brands or platforms. Imagine a designer stepping into a new project.</p>
    </div>
    <Image backgroundColor="#32261F" alt="Image" class="col-12" />
    <div class="body-md color-defined storyblock">
      <p>In the ever-evolving landscape of design and development, I've crafted a design system that serves as a universal toolkit, transcending the boundaries of specific brands or platforms. Imagine a designer stepping into a new project, greeted not by the daunting task of starting from scratch, but by a system that welcomes them with open arms, ready to adapt and mold itself to their unique vision. This agnostic system is like a chameleon, effortlessly blending into any brand's identity while maintaining its own integrity and quality.</p>
      <p>In the ever-evolving landscape of design and development, I've crafted a design system that serves as a universal toolkit, transcending the boundaries of specific brands or platforms. Imagine a designer stepping into a new project, greeted not by the daunting task of starting from scratch, but by a system that welcomes them with open arms, ready to adapt and mold itself to their unique vision. This agnostic system is like a chameleon, effortlessly blending into any brand's identity while maintaining its own integrity and quality.</p>
      <Image backgroundColor="#32261F" alt="Image" class="col-12" />
      <p>In the ever-evolving landscape of design and development, I've crafted a design system that serves as a universal toolkit, transcending the boundaries of specific brands or platforms. Imagine a designer stepping into a new project, greeted not by the daunting task of starting from scratch, but by a system that welcomes them with open arms, ready to adapt and mold itself to their unique vision. This agnostic system is like a chameleon, effortlessly blending into any brand's identity while maintaining its own integrity and quality.</p>
      <p>In the ever-evolving landscape of design and development, I've crafted a design system that serves as a universal toolkit, transcending the boundaries of specific brands or platforms. Imagine a designer stepping into a new project, greeted not by the daunting task of starting from scratch, but by a system that welcomes them with open arms, ready to adapt and mold itself to their unique vision. This agnostic system is like a chameleon, effortlessly blending into any brand's identity while maintaining its own integrity and quality.</p>
      <div class="author-block">
      <Avatar shape="squircle" size="48" src="https://images.unsplash.com/photo-1570158268183-d296b2892211?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Author" />
      <div>
        <p class="color-strong" style="margin-top: 0px;">Name Surname</p>
        <p class="color-soft" style="margin-top: 0px;">Title</p>
      </div>
    </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
 import Image from '~/composables/components/Image.vue'
 import Avatar from '~/composables/components/Avatar.vue'
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