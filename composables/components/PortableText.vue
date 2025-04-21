<template>
  <div class="portable-text">
    <template v-for="(block, i) in value" :key="i">
      <component
        :is="getBlockComponent(block)"
        :block="block"
        :node="block"
      />
    </template>
  </div>
</template>

<script setup>
import { defineProps, h } from 'vue'

const props = defineProps({
  value: {
    type: Array,
    required: true
  }
})

const getBlockComponent = (block) => {
  const style = block.style || 'normal'
  
  if (block._type === 'block') {
    switch (style) {
      case 'h1':
        return { render: () => h('h1', {}, [block.children.map(child => child.text).join('')]) }
      case 'h2':
        return { render: () => h('h2', {}, [block.children.map(child => child.text).join('')]) }
      case 'h3':
        return { render: () => h('h3', {}, [block.children.map(child => child.text).join('')]) }
      case 'h4':
        return { render: () => h('h4', {}, [block.children.map(child => child.text).join('')]) }
      case 'blockquote':
        return { render: () => h('blockquote', {}, [block.children.map(child => child.text).join('')]) }
      default:
        return { render: () => h('p', {}, [block.children.map(child => child.text).join('')]) }
    }
  }
  
  // For other block types, just render a div with JSON for now
  return {
    render: () => h('pre', {}, [JSON.stringify(block, null, 2)])
  }
}
</script>

<style>
.portable-text > * {
  margin-bottom: 1rem;
}
</style> 