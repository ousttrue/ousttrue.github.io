/** @type {import('tailwindcss').Config} */
export const config = {
  content: [
    'node_modules/daisyui/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{astro,html,svelte,vue,js,ts,jsx,tsx}',
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Poppins"', "sans-serif"],
      }
    }
  },
  daisyui: {
    themes: [
      "light",
    ]
  }
}
