// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  modules: [
    '@nuxt/image',
    ['unplugin-icons/nuxt', { scale: 1.5 }],
    '@nuxt/scripts',
  ],
  devtools: { enabled: true },

  vite: {
    plugins: [tailwindcss()],
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    // apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
    public: {
      mapboxApi: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
      mapCenterLng: '',
      mapCenterLat: '',
      mapZoom: '',
      mapMinZoom: '',
    },
  },
})
