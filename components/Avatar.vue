<template>
  <div 
    class="avatar" 
    :class="{ 
      'avatar--fallback': !src,
      'avatar--squircle': shape === 'squircle',
      'avatar--circle': shape === 'circle'
    }"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <img v-if="src" :src="src" :alt="alt" class="avatar__image">
    <div v-else class="avatar__fallback">
      <Icon name="user" :size="Math.floor(size * 0.6)" />
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
  },
  size: {
    type: Number,
    default: 40
  },
  shape: {
    type: String,
    default: 'circle',
    validator: (value) => ['circle', 'squircle'].includes(value)
  }
})
</script>

<style>
.avatar {
  overflow: hidden;
  background-color: var(--bg-elements-100);
}

.avatar--circle {
  border-radius: 50%;
}

.avatar--squircle {
  border-radius: 8px;
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