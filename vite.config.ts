import { defineConfig, Plugin } from "vite";

// https://vitejs.dev/config/
const config = defineConfig({
  plugins: [pluginDevelop()],
});

function pluginDevelop(): Plugin {
  return {
    name: "mydev-vite-plugin",
  };
}

export default config;
