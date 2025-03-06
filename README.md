# Milieudefensie campaign website

This repository contains the source code for a concept Milieudefensie campaign website.

## Tech stack

This campaign website is build using the [Jamstack](https://jamstack.org/) architecture.

Front-end:

- [Nuxt.js](https://nuxtjs.org/): Vue.js framework
  - SSG (Static Site Generation) for performance
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [DaisyUI](https://daisyui.com/) for Tailwind CSS components

Back-end:

- [Directus](https://directus.io/) as headless CMS
- [Windmill](https://www.windmill.dev/) for automation

Integrations:

- [PostHog](https://posthog.com/) for analytics

## Setup

Make sure to install dependencies:

```bash

# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm dev
```

## Production

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

## Deploy

Build command:

```bash
pnpm run generate
```

Build output directory: `.output/public`

Make sure to set the environment variables.

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
