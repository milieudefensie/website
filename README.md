# Milieudefensie campaign website

This repository contains the source code for a concept Milieudefensie campaign website.

## Features

**Page types:**

- Articles
- Events
- Groups

**Available components on pages:**
In Directus, you can add the following components to the content of a page:

- Formatted text (headings, bold, italic, links, ordened/unordened lists, blockquotes)
- Image
- Video (YouTube)
- Buttons
- Testimonials
- Countdown
- Steps
- Accordion
- Cards (one/two/three columns)
  - Custom cards
  - Event
  - Group
  - Campaign
- Event map
- Event list
- Group map
- Group list

**Components that are used on all pages:**

- Navigation
- Hero (with image or video, and optional form or button)
- Footer

**Optimized for conversions:**

- Super fast loading times(pagespeed score of 90+ on mobile and desktop, tested on homepage)
- Distractionless design with clear call-to-actions
- Multi-step forms, automatically prefilled with known data

## Local development

### Tech stack

This campaign website is build using the [Jamstack](https://jamstack.org/) architecture, which allows for fast iterations and innovation. All pages are statically generated at build time and served from a CDN.

**Front-end:**

- [Nuxt.js](https://nuxtjs.org/): Vue.js framework
  - SSG (Static Site Generation) for performance
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [DaisyUI](https://daisyui.com/) for Tailwind CSS components

**Back-end:**

- [Directus](https://directus.io/) as headless CMS
- [Windmill](https://www.windmill.dev/) for automation

**Integrations:**

- [PostHog](https://posthog.com/) for analytics and A/B testing

### Setup

Make sure to install dependencies using [pnpm](https://pnpm.io/):

```bash

# pnpm
pnpm install
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm dev
```

Make sure to set the environment variables as defined in `nuxt.config.js` by creating a `.env` file.

### Test production

Generate the static application for production:

```bash
# pnpm
pnpm generate
```

After generating, locally preview the static files:

```bash

# pnpm
pnpm preview
```

## Deploy publically

You can deploy to any static hosting provider, such as Cloudflare Pages, Netlify or Vercel. These tools can automatically build and deploy your site from the GitHub repository on every commit. By using multiple branches, you can deploy different versions of the site for testing or production.

Build command:

```bash
pnpm run generate
```

Build output directory: `.output/public`

Make sure to set the environment variables as defined in `nuxt.config.js`.

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
