<template>
  <footer class="footer grid-area">
    <div class="footer__container col-12">
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
  height: 100vh;
  z-index: -100;
  padding: var(--space-medium) var(--space-medium);
  background-color: var(--bg-elevation-background–inverse);
  color: var(--fg-text-soft);
  border-top: 1px solid var(--fg-border-disabled);
  box-sizing: border-box;
  align-content: end;
}

.footer__container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer__legal {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-small);
}

.footer__copyright {
  color: var(--fg-text-soft-inverse);
}

.footer__legal-links {
  display: flex;
  flex-direction: row;
  gap: var(--space-small);
} 

.footer__legal-link {
  text-decoration: none;
  color: var(--fg-text-soft-inverse);
  transition: color 0.2s ease;
}

.footer__legal-link:hover {
  color: var(--fg-text-soft-inverse);
}

@media (max-width: 600px) {
  .footer__legal {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style> 