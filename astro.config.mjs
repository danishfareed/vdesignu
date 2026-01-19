import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://vdesignu.com',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [react(), sitemap(), mdx()]
});