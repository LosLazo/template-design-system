<template>
  <div class="minimal-layout">
    <header class="minimal-header">
      <div class="logo-container">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0001 9.49006C15.1077 12.636 12.6361 15.1076 9.49015 16C12.6361 16.8924 15.1077 19.364 16.0001 22.5099C16.8925 19.364 19.3641 16.8924 22.51 16C19.3641 15.1076 16.8925 12.636 16.0001 9.49006Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M17.4545 1.45455H14.5455V4.36364H17.4545V1.45455ZM13.0909 0V5.81818H18.9091V0H13.0909Z" fill="#030303"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M30.5455 14.5455H27.6364V17.4545H30.5455V14.5455ZM26.1818 13.0909V18.9091H32V13.0909H26.1818Z" fill="#030303"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.36364 14.5455H1.45455V17.4545H4.36364V14.5455ZM0 13.0909V18.9091H5.81818V13.0909H0Z" fill="#030303"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M17.4545 27.6364H14.5455V30.5455H17.4545V27.6364ZM13.0909 26.1818V32H18.9091V26.1818H13.0909Z" fill="#030303"/>
        </svg>
        <span class="title-md">glimmer</span>
      </div>
    </header>
    
    <main class="minimal-main grid-area">
      <slot />
    </main>
    
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from '~/composables/patterns/Footer.vue'
</script>

<style>
.minimal-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  background-color: var(--bg-elevation-base);
}

.minimal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-subtle-1);
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo-svg {
  width: 32px;
  height: 32px;
  fill: var(--fg-object-solid-1000);
}

.minimal-main {
  flex: 1;
  padding: 32px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
</style> 