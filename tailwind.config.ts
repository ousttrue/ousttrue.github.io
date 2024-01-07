import type { Config } from 'tailwindcss';
// import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { join } from 'node:path';

const config = {
  darkMode: 'class',
  content: [
    // 'node_modules/daisyui/dist/**/*.js',
    // 'node_modules/react-daisyui/dist/**/*.js',
    join(require.resolve(
      '@skeletonlabs/skeleton'),
      '../**/*.{html,js,svelte,ts}'
    ),
    "./src/**/*.{js,jsx,ts,tsx,svelte}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    typography,
    // daisyui,
    skeleton({
      themes: { preset: ["skeleton"] }
    }),
  ],
  // daisyui: {
  //   themes: ["retro"],
  // },
} satisfies Config;

export default config;
