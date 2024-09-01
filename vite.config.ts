import { defineConfig } from "vite";
import Inspect from 'vite-plugin-inspect'
import Develop from './mydev-vite-plugin';
import Markdown from './mymd-vite-plugin';

// https://vitejs.dev/config/
const config = defineConfig({
  plugins: [
    Develop(),
    Markdown(),
    Inspect(),
  ],
});

export default config;
