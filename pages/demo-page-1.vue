<template>
  <div class="architecture-page">
    <!-- Header -->
    <header class="arch-header">
      <div class="arch-header__left">
        <span class="headline-sm">BLANK</span>
      </div>
      <nav class="arch-header__nav body-sm color-soft">
        <a href="#">Projects</a>
        <a href="#">Our systems</a>
        <a href="#">Careers</a>
        <a href="#">About us</a>
        <a href="#">Contacts</a>
      </nav>
      <div class="arch-header__right body-sm color-soft">
        <span>Search</span>
        <span>Feedback</span>
        <span>RU / EN</span>
      </div>
    </header>

    <!-- Hero Image -->
    <section class="hero-banner">
      <Image 
        src="https://images.unsplash.com/photo-1519758398860-50d3a5c4f540?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
        alt="Modern urban development"
        class="hero-banner__image"
      />
    </section>

    <!-- Project Gallery -->
    <section class="project-gallery">
      <h2 class="body-sm color-soft">Recent projects -></h2>
      <div class="project-grid-complex">
        <!-- Projects will be dynamically generated or listed here -->
        <div class="project-item" v-for="(project, index) in projects" :key="index" :style="{ gridArea: project.gridArea }">
          <Image :src="project.image" :alt="project.title" class="project-item__image"/>
          <div class="project-item__info">
            <h3 class="body-md">{{ project.title }}</h3>
            <p class="body-sm color-soft">{{ project.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services-section">
      <div class="services-list">
        <h3 class="headline-md">Architecture</h3>
        <h3 class="headline-md color-strong">Engineering</h3>
        <h3 class="headline-md">Interiors</h3>
        <h3 class="headline-md">Wayfinding and Brand</h3>
        <h3 class="headline-md">Structural Engineering</h3>
        <h3 class="headline-md">Landscaping</h3>
        <h3 class="headline-md">BIM Management</h3>
        <h3 class="headline-md">Product Design</h3>
      </div>
      <div class="services-image">
         <Image src="https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="Modern building exterior"/>
      </div>
    </section>

    <!-- Opportunity Section -->
    <section class="opportunity-section">
      <div class="opportunity-content">
        <h3 class="headline-sm">Opportunity Awaits.</h3>
        <p class="body-md color-soft">We are an equal opportunities employer and always interested to meet new people who know our work and are interested in our approach.</p>
      </div>
      <div class="opportunity-images">
        <Image src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="Office interior 1"/>
        <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="Office interior 2"/>
        <Image src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="Office interior 3"/>
      </div>
    </section>

    <!-- Footer -->
    <footer class="arch-footer">
      <div class="footer-column">
        <span class="body-xs color-soft">Place, Moscow</span>
        <span class="body-xs">New Arbat Avenue 24, 15 Jul 1962</span>
        <span class="body-xs">Floor 5</span>
      </div>
       <div class="footer-column">
        <span class="body-xs color-soft">Place, Saint Petersburg</span>
        <span class="body-xs">Shore of Moika river, bld 1, lit A</span>
        <span class="body-xs">Floor 1</span>
      </div>
      <div class="footer-column">
        <span class="body-xs color-soft">Commercial enquiries</span>
        <span class="body-xs">info@blank.com</span>
        <span class="body-xs">Media Kit (press@blank.com)</span>
        <span class="body-xs">+7(495) XXX XX XX</span>
      </div>
       <div class="footer-column">
        <span class="body-xs color-soft">Follow us</span>
        <span class="body-xs">Telegram</span>
      </div>
      <div class="footer-logo">
        <div class="logo-circle">AB</div>
      </div>
    </footer>
     <div class="copyright body-xs color-soft">
       © 2024 Blank. All Rights Reserved. 
       <span class="right-align">Website development by Cosmos</span>
     </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Image from '../components/Image.vue' // Assuming Image component exists

const projects = ref([
  {
    title: 'Ecopark.',
    description: 'Rest in harmony with nature',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    gridArea: '1 / 1 / 2 / 2'
  },
  {
    title: 'Radisson Blu 5*.',
    description: 'Harmonious and unique',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    gridArea: '1 / 2 / 3 / 3' // Spans 2 rows
  },
  {
    title: 'Clubhouse Obydensky N° 1.',
    description: 'Modern continuation of Ostozhenka’s architectural code',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
     gridArea: '1 / 3 / 2 / 4'
  },
   {
    title: 'Seliger City.',
    description: 'Multifunctional residential complex',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    gridArea: '2 / 1 / 4 / 2' // Spans 2 rows
  },
  {
    title: 'Telegraph.',
    description: 'Trendy, relevant, progressive',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    gridArea: '3 / 2 / 4 / 3'
  },
  {
    title: 'Kuzminki Mall.',
    description: 'Shopping center in the heart of a park',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    gridArea: '2 / 3 / 3 / 4'
  },
  {
    title: 'Stanislavsky Factory.',
    description: 'Modern multifunctional complex',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    gridArea: '3 / 3 / 4 / 4'
  }
]);
</script>

<style>
.architecture-page {
  background-color: var(--bg-elevation-base);
  color: var(--fg-text-strong);
  padding: var(--space-medium) var(--space-large);
  max-width: 1600px; /* Adjust max-width as needed */
  margin: 0 auto;
}

/* Header Styles */
.arch-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-medium) 0;
  margin-bottom: var(--space-medium);
  border-bottom: 1px solid var(--fg-border-disabled);
}

.arch-header__left span {
  font-weight: bold; /* Assuming logo/brand name is bold */
}

.arch-header__nav,
.arch-header__right {
  display: flex;
  gap: var(--space-medium);
}

.arch-header__nav a,
.arch-header__right span {
  text-decoration: none;
  color: var(--fg-text-soft);
  transition: color 0.2s ease;
}

.arch-header__nav a:hover {
  color: var(--fg-text-strong);
}

/* Hero Banner Styles */
.hero-banner {
  width: 100%;
  height: 60vh; /* Adjust height as needed */
  margin-bottom: var(--space-huge);
}

.hero-banner__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Project Gallery Styles */
.project-gallery {
  margin-bottom: var(--space-huge);
}

.project-gallery h2 {
  margin-bottom: var(--space-large);
}

.project-grid-complex {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columns */
  grid-template-rows: auto; /* Adjust based on content */
  gap: var(--space-large);
  align-items: start; /* Align items to the start of their grid area */
}

.project-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-small);
}

.project-item__image {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3; /* Maintain aspect ratio, adjust as needed */
  object-fit: cover;
  display: block; /* Remove extra space below image */
}

/* Services Section Styles */
.services-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-huge);
  margin-bottom: var(--space-huge);
  align-items: center;
}

.services-list h3 {
  margin-bottom: var(--space-small);
  line-height: 1.2; /* Adjust line-height */
  color: var(--fg-text-soft); /* Default color */
}

.services-list .color-strong {
    color: var(--fg-text-strong); /* Highlighted service */
}

.services-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

/* Opportunity Section Styles */
.opportunity-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-huge);
  margin-bottom: var(--space-huge);
  align-items: center;
}

.opportunity-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-medium);
}

.opportunity-images {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-medium);
}

.opportunity-images img {
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1; /* Square images */
  object-fit: cover;
}

/* Footer Styles */
.arch-footer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* Responsive columns */
  gap: var(--space-large);
  padding: var(--space-large) 0;
  border-top: 1px solid var(--fg-border-disabled);
  margin-bottom: var(--space-small);
  align-items: start;
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: var(--space-tiny);
}

.footer-logo {
  display: flex;
  justify-content: flex-end; /* Align logo to the right */
  align-items: flex-end; /* Align logo to the bottom */
  grid-column: -2 / -1; /* Position in the last column area */
}

.logo-circle {
  width: 60px; /* Adjust size as needed */
  height: 60px;
  border: 1px solid var(--fg-text-strong);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-size-large); /* Adjust font size */
}

.copyright {
    display: flex;
    justify-content: space-between;
    padding-bottom: var(--space-medium);
}

.right-align {
    margin-left: auto;
}

</style> 