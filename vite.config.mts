import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy'


export default defineConfig({
  plugins: [
    sveltekit(),
    viteStaticCopy({
      structured: true,
      targets: [
        {
          src: './posts/**/*.jpg',
          dest: './',
        },
      ],
    }),
  ],
  server: {
    fs: {
      // https://stackoverflow.com/questions/74902697/error-the-request-url-is-outside-of-vite-serving-allow-list-after-git-init
      allow: [
        // search up for workspace root
        searchForWorkspaceRoot(process.cwd()),
        // your custom rules
        '/posts',
      ],
    },
  },
});
