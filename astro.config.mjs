import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

import partytown from '@astrojs/partytown';

export default defineConfig({
  site: 'https://vdesignu.com',
  vite: {
    plugins: [tailwindcss()]
  },
  prefetch: true,
  integrations: [
    react(),
    sitemap(),
    mdx(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
});