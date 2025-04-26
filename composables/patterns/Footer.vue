<template>
  <footer class="footer grid-area">
    <div class="footer__container col-12">
      <div class="logo-container">
        <svg width="240" height="240" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-footer-svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0001 9.49006C15.1077 12.636 12.6361 15.1076 9.49015 16C12.6361 16.8924 15.1077 19.364 16.0001 22.5099C16.8925 19.364 19.3641 16.8924 22.51 16C19.3641 15.1076 16.8925 12.636 16.0001 9.49006Z" fill="var(--ei-color-fg-object-strong-inverse)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.4545 1.45455H14.5455V4.36364H17.4545V1.45455ZM13.0909 0V5.81818H18.9091V0H13.0909Z" fill="var(--ei-color-fg-object-strong-inverse)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M30.5455 14.5455H27.6364V17.4545H30.5455V14.5455ZM26.1818 13.0909V18.9091H32V13.0909H26.1818Z" fill="var(--ei-color-fg-object-strong-inverse)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.36364 14.5455H1.45455V17.4545H4.36364V14.5455ZM0 13.0909V18.9091H5.81818V13.0909H0Z" fill="var(--ei-color-fg-object-strong-inverse)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.4545 27.6364H14.5455V30.5455H17.4545V27.6364ZM13.0909 26.1818V32H18.9091V26.1818H13.0909Z" fill="var(--ei-color-fg-object-strong-inverse)"/>
                </svg>
      </div>
      <div class="footer__legal">
        <span class="footer__copyright body-xs">© {{ currentYear }} Your Company. All rights reserved.</span>
        <div class="footer__legal-links">
          <a href="#" class="footer__legal-link body-xs">Privacy Policy</a>
          <a href="#" class="footer__legal-link body-xs">Terms of Service</a>
          <a href="#" class="footer__legal-link body-xs">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Get current year for copyright
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 70vh;
  z-index: -100;
  padding: var(--ei-dimension-space-medium) var(--ei-dimension-space-medium);
  background-color: var(--ei-color-bg-elevation-background–inverse);
  color: var(--ei-color-fg-text-soft);
  border-top: 1px solid var(--ei-color-fg-border-disabled);
  box-sizing: border-box;
  align-content: end;
}

.footer__container {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}

.footer__legal {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--ei-dimension-space-small);
}

.footer__copyright {
  color: var(--ei-color-fg-text-soft-inverse);
}

.footer__legal-links {
  display: flex;
  flex-direction: row;
  gap: var(--ei-dimension-space-small);
} 

.footer__legal-link {
  text-decoration: none;
  color: var(--ei-color-fg-text-soft-inverse);
  transition: color 0.2s ease;
}

.footer__legal-link:hover {
  color: var(--ei-color-fg-text-soft-inverse);
}

.logo-footer-svg {
  min-width: 100px;
  min-height: 100px;
  width: 100px;
  height: 100px;
  margin-bottom: 16vh;
  fill: var(--ei-color-fg-text-strong-inverse);
}

@media (max-width: 600px) {
  .footer__legal {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style> 