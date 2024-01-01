import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// https://kit.svelte.jp/docs/adapter-static
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

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
