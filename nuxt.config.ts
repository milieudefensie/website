// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  ssr: true,

  modules: [
    '@nuxt/image',
    ['unplugin-icons/nuxt', { scale: 1.5 }],
    // '@nuxt/scripts', FIX NEEDED: [error] [ nuxi ] Nuxt Build Error: [vite]: Rollup failed to resolve import "unenv/runtime/mock/noop" from "/opt/buildhome/repo/node_modules/.pnpm/@nuxt+scripts@0.10.5_@types+youtube@0.1.0_@unhead+vue@1.11.20_typescript@5.8.2/node_modules/@nuxt/scripts/dist/runtime/validation/mock.js"
    '@pinia/nuxt',
    '@nuxtjs/storybook',
  ],
  devtools: { enabled: true },

  vite: {
    plugins: [tailwindcss()],
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    // can be overridden by NUXT_.... environment variable
    hubspotSecret: '',
    datoSecret: '',
    makeGa4Secret: '',
    cslSecret: '',
    public: {
      // Can be overridden by NUXT_PUBLIC_..... environment variables
      organisationName: 'Campaign Website',
      organisationSlogan: 'This is an awesome website',
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
    prerender: {
      // So it does not fail when pages are not found (404)
      failOnError: false,
    },
  },

  app: {},
})
