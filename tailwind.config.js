/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
const config = {
  content: [
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
    "./src/**/*.{js,jsx,ts,tsx,svelte}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: ["retro"],
  },
}
export default config;
