import { defineConfig } from 'histoire'
import { HstSvelte } from '@histoire/plugin-svelte'

export default defineConfig({
  plugins: [
    HstSvelte(),
  ],
  tree: {
    file: 'path',
  },
  vite: {
    base: '/histoire/'
  },
  setupFile: '/src/histoire-setup.ts',
})
