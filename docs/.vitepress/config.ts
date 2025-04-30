import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Campaign website',
  description: 'Open source campaign website for activists',
  ignoreDeadLinks: true,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local',
    },
    nav: [
      { text: 'Strategy', link: '/strategy/' },
      { text: 'Storybook', link: '' },
    ],

    sidebar: [
      {
        text: 'Getting started',
        items: [{ text: 'Introduction', link: '/introduction' }],
      },
      {
        text: 'Strategy',
        items: [
          { text: 'Website strategy', link: '/strategy/' },
          { text: 'Primary signup form', link: '/strategy/signup' },
          { text: 'Events', link: '/strategy/events' },
          { text: 'Local groups', link: '/strategy/local-groups' },
          { text: 'Training & support', link: '/strategy/training-support' },
          { text: 'Dashboard', link: '/strategy/dashboard' },
        ],
      },
      {
        text: 'Components',
        items: [
          { text: 'Storybook', link: '/' },
          {
            text: 'GitHub folder',
            link: 'https://github.com/milieudefensie/website/tree/main/components',
          },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/milieudefensie/website' },
    ],
  },
})
