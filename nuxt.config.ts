// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  ssr: true,

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
    // can be overridden by NUXT_.... environment variable
    // apiSecret: '',
    public: {
      // Can be overridden by NUXT_PUBLIC_..... environment variables
      mapboxApi: '',
      // Default: focus on NL
      mapCenterLng: '5.3878',
      mapCenterLat: '52.1561',
      mapZoom: '6.7',
      mapMinZoom: '6.5',
    },
  },

  experimental: {
    componentIslands: true,
  },

  nitro: {
    preset: 'static',
    // static: process.env.NODE_ENV !== 'development',
    prerender: {
      // So it does not fail when pages are not found (404)
      failOnError: false,
    },
  },

  image: {
    // provider: 'ipxStatic',
    // provider: 'ipx',
  },
})
