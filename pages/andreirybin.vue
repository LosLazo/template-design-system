<template>
  <div class="page">
    <!-- Main Content -->
    <main class="main-content">
      <!-- Hero Text -->
      <h1 class="hero-text display-md color-strong">
        IMPACTFUL DESIGN FOR<br/>
        HIGH-END BRANDS
      </h1>
    </main>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  width: 100%;
  padding: var(--space-huge);
  background-color: var(--bg-elevation-base);
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
}

.hero-text {
  margin-bottom: var(--space-huge);
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-huge);
  padding: var(--space-medium) 0;
  border-top: 1px solid var(--fg-border-subtle);
  border-bottom: 1px solid var(--fg-border-subtle);
}

.nav-left,
.nav-center {
  flex: 1;
}

.nav-right {
  flex: 2;
  display: flex;
  gap: var(--space-large);
  justify-content: flex-end;
}

.nav-right a {
  text-decoration: none;
  text-transform: uppercase;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-medium);
  margin-top: auto;
  margin-bottom: var(--space-huge);
}

.image-card {
  aspect-ratio: 4/3;
  overflow: hidden;
  background-color: var(--bg-elevation-layer-01);
  border-radius: 0; /* Override Card component's default border-radius */
}

.grid-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
}

.footer {
  margin-top: auto;
  text-align: right;
}

/* Hover effects */
.nav-right a:hover {
  color: var(--fg-text-soft);
}

.image-card:hover .grid-image {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}
</style>

<script setup>
import Card from '../components/Card.vue'
import Image from '../components/Image.vue'
</script> 