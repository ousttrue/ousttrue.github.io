import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from "@astrojs/vercel/serverless";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://astro.build/config
export default defineConfig({
    site: 'https://ousttrue.github.io',
    // output: 'server',
    // adapter: vercel(),
    integrations: [mdx(),
    svelte(), tailwind({
        config: {
            applyBaseStyles: false
        }
    }), sitemap()],
    vite: {
        plugins: [],
        resolve: {
            alias: {
                '$': path.resolve(__dirname, './src')
            }
        },
        optimizeDeps: {
            allowNodeBuiltins: true
        }
    },
});
