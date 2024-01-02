import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// https://kit.svelte.jp/docs/adapter-static
import adapter from '@sveltejs/adapter-static';

import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [
    preprocess({
      postcss: true
    }),
    mdsvex(mdsvexConfig),
    vitePreprocess(),
  ],

  kit: {
    adapter: adapter({
      fallback: '404.html'
    }),
    paths: {
      base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
    },
    prerender: {
      handleHttpError: () => {
        return
      }
    },
  }
};

export default config;
