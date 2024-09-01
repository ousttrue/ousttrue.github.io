import { defineConfig } from "vite";
import Inspect from 'vite-plugin-inspect'
import Develop from './mydev-vite-plugin';

// https://vitejs.dev/config/
const config = defineConfig({
  plugins: [Develop(), Inspect()],
});

export default config;
