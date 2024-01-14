import type { Config } from 'tailwindcss'

export default {
  content: [
    'node_modules/daisyui/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Poppins"', "sans-serif"],
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      "cupcake", "light",
    ]
  },
} satisfies Config
