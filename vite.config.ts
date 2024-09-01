import { defineConfig } from "vite";
import { pluginDevelop } from './mydev-vite-plugin';

// https://vitejs.dev/config/
const config = defineConfig({
  plugins: [pluginDevelop()],
});

export default config;
