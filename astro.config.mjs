// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  site: 'https://freestyler-rmg.github.io/bang-for-your-chug',
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [vue()],
});
