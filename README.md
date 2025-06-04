# Milieudefensie campaign website

This repository contains the source code for experiments of the Milieudefensie campaign website.

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
