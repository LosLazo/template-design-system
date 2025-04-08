<template>
  <div class="avatar" :class="{ 'avatar--fallback': !src }">
    <img v-if="src" :src="src" :alt="alt" class="avatar__image">
    <div v-else class="avatar__fallback">
      <Icon name="user" />
    </div>
  </div>
</template>

<script setup>
import Icon from './Icon.vue'

defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: 'User avatar'
  }
})
</script>

<style>
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background-color: var(--bg-elements-100);
}

.avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar__fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--content-secondary);
}
</style> 