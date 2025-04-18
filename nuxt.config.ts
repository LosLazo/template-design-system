// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [
    '~/styles/css/global.css',
    '~/styles/css/primitives.css',
    '~/styles/css/usage-light.css',
    '~/styles/css/usage-dark.css',
    '~/styles/css/grid.css'
  ],
  modules: ['@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: '',
    fallback: 'light',
    preference: 'system',
    dataValue: 'theme',
    storageKey: 'nuxt-color-mode'
  },
  postcss: {
    plugins: {
      'autoprefixer': {},
      'postcss-nested': {}
    }
  }
})