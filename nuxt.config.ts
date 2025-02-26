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
})