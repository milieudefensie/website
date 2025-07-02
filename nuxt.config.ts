// Nuxt config docs: https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  // Server side rendering:
  // - https://nuxt.com/docs/getting-started/deployment#static-hosting
  // - https://nuxt.com/docs/getting-started/prerendering
  ssr: true,

  modules: [
    // Docs: https://image.nuxt.com/
    '@nuxt/image',

    // Docs: https://github.com/unplugin/unplugin-icons
    ['unplugin-icons/nuxt', { scale: 1.5 }],

    // Docs: https://scripts.nuxt.com/
    '@nuxt/scripts',

    // Docs: https://pinia.vuejs.org/ssr/nuxt.html
    '@pinia/nuxt',

    // Docs: https://storybook.nuxtjs.org/
    '@nuxtjs/storybook',

    // Docs: https://i18n.nuxtjs.org/
    '@nuxtjs/i18n',
  ],

  // Docs: https://devtools.nuxt.com/
  devtools: { enabled: true },
  devServer: {
    cors: {
      origin: '*',
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  css: ['~/assets/css/main.css'],

  i18n: {
    defaultLocale: 'nl',
    locales: [
      {
        code: 'en',
        name: 'English',
        // file: 'en.json'
      },
      {
        code: 'nl',
        name: 'Nederlands',
        // file: 'nl.json'
      },
    ],
    customRoutes: 'config',
    pages: {
      events: {
        en: '/events',
        nl: '/agenda',
      },
      groups: {
        en: '/groups',
        nl: '/groepen',
      },
      movement: {
        en: '/movement',
        nl: '/beweging',
      },
      'event-eventSlug': {
        en: '/event/[eventSlug]',
        nl: '/agenda/[eventSlug]',
      },
    },
  },

  // Environment variables (overwrite the below values using an .env file, see .example.env)
  runtimeConfig: {
    // These secret environment variables can be overridden by NUXT_XYZ... in .env file
    hubspotSecret: '',
    datoSecret: '',
    cslSecret: '',

    // These public be overridden by NUXT_PUBLIC_XYZ... in .env file
    public: {
      organisationName: 'Campaign Website',
      organisationSlogan: 'This is an awesome website',
      mapboxApi: '',

      directusServer: 'http://localhost:8055', // Change to your Directus server URL

      // Default: focus on NL
      mapCenterLng: '5.3878',
      mapCenterLat: '52.1561',
      mapZoom: '6.7',
      mapMinZoom: '6.5',
    },
  },

  experimental: {
    // Docs: https://nuxt.com/docs/api/components/nuxt-island
    componentIslands: true,

    // Docs: https://nuxt.com/docs/getting-started/transitions#view-transitions-api-experimental
    // viewTransition: true,
  },

  nitro: {
    preset: 'static',
    prerender: {
      // So it does not fail when pages are not found (404)
      failOnError: false,

      // Docs: https://nuxt.com/docs/getting-started/prerendering#crawl-based-pre-rendering
      crawlLinks: true,
      routes: [
        '/api/getContacts',
        '/api/getEvents',
        '/api/getGroups',
        '/api/getAnalytics',
      ],
    },
  },
})
