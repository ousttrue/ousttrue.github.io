import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwind from "@astrojs/tailwind";

import remarkCodeBlock from "./src/lib/remark-code-block";

// https://astro.build/config
export default defineConfig({
  site: 'https://ousttrue.github.io',
  integrations: [mdx(), sitemap(), tailwind(),],
  markdown: {
    gfm: true,
    // syntaxHighlight: false,
    // remarkPlugins: [remarkCodeBlock],
  }
});
