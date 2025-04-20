<template>
  <NuxtLayout name="default">
    <div class="hero-section">
      <h1 class="headline-lg col-12" style="text-align: center;">Ask anything</h1>
      <Input 
        class="col-12"  
        placeholder="Should I use a modal or a side panel?" 
        suffix-icon="search" 
        id="search-input"
        v-model="searchQuery"
      />
    </div>
    <div class="grid">
      <ProjectCard
        title="Start designing"
        backgroundColor="#1E1E1E"
        aspectRatio="16x9"
        class="split-3"
      />
      <ProjectCard
        title="Start coding"
        backgroundColor="#1E1E1E"
        aspectRatio="16x9"
        class="split-3"
      />
      <ProjectCard
        title="For AI agents"
        backgroundColor="#1E1E1E"
        aspectRatio="16x9"
        class="split-3"
      />
    </div>
    <div class="grid">
      <Carousel title="News" :infinite="false" class="col-12">
          <ProjectCard
            v-for="(item, index) in carouselItems"
            :key="index"
            :title="item.title"
            :image="item.image"
            :backgroundColor="item.backgroundColor"
            :interactive="true"
            :aspectRatio="item.aspectRatio"
            :orientation="item.orientation"
            :link="item.link"
            class="carousel-item"
          />
      </Carousel>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref } from 'vue'
import ProjectCard from '~/components/ProjectCard.vue'
import Input from '~/components/Input.vue'

const searchQuery = ref("")

// Carousel items data
const carouselItems = ref([
  {
    title: 'Best Practices for designers',
    subtitle: 'Eco-Friendly',
    description: 'Learn about sustainable design practices for a better future.',
    backgroundColor: '#27ae60', // Green color
    aspectRatio: '16x9',
    orientation: 'landscape',
    link: '/article'
  },
  {
    title: 'Modern Architecture',
    subtitle: 'Contemporary Design',
    description: 'Explore the latest trends in modern architecture and design.',
    image: 'https://cdn.cosmos.so/7cd64f0c-9e0b-4e22-985a-fc464c560185?format=jpeg',
    aspectRatio: '4x5',
    orientation: 'portrait',
    link: '/article'
  },
  {
    title: 'Urban Living',
    subtitle: 'City Lifestyle',
    description: 'Discover the perfect balance of comfort and style in urban spaces.',
    backgroundColor: '#3498db', // Blue color
    aspectRatio: '4x3',
    orientation: 'landscape',
    link: '/article'
  },
  {
    title: 'Minimalist Design',
    subtitle: 'Less is More',
    description: 'Experience the beauty of simplicity in modern minimalist design.',
    image: 'https://cdn.cosmos.so/0c0eb690-73ce-4a3c-b2b6-68d3d9e9ece6?format=jpeg',
    aspectRatio: '1x1',
    orientation: 'landscape',
    link: '/article'
  },
  {
    title: 'Luxury Interiors',
    subtitle: 'Premium Design',
    description: 'Indulge in the finest luxury interior design concepts.',
    image: 'https://cdn.cosmos.so/0c0eb690-73ce-4a3c-b2b6-68d3d9e9ece6?format=jpeg',
    aspectRatio: '3x2',
    orientation: 'landscape',
    link: '/article'
  }
])
</script>

<style>
.hero-section {
  padding: 128px 0px 64px 0px;
  align-items: center;
  justify-content: center;
  gap: var(--space-large);
  display: flex;
  flex-direction: column;
}


</style> 