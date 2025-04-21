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
  },
  nitro: {
    // Optimize file watching to reduce the number of open files
    watchOptions: {
      ignoreInitial: true,
      ignored: ['**/node_modules/**', '**/.git/**']
    }
  },
  // Add Sanity client as a build dependency
  build: {
    transpile: ['@sanity/client']
  },
  // Set up runtime config for Sanity
  runtimeConfig: {
    // Server-only private keys
    sanityToken: process.env.SANITY_TOKEN,
    
    // Keys that are exposed to the client
    public: {
      sanity: {
        projectId: process.env.SANITY_PROJECT_ID || 'your-project-id',
        dataset: process.env.SANITY_DATASET || 'production',
        apiVersion: process.env.SANITY_API_VERSION || '2023-05-03',
        useCdn: process.env.SANITY_USE_CDN !== 'false'
      }
    }
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 1000,
        ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**', '**/.nuxt/**', '**/.output/**']
      }
    }
  }
})