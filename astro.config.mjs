import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import expressiveCode from "astro-expressive-code";

/** @type {import('astro-expressive-code').AstroExpressiveCodeOptions} */
import icon from "astro-icon";
const astroExpressiveCodeOptions = {
  // You can set configuration options here
  themes: ["dracula", "github-light"],
  styleOverrides: {
    // You can also override styles
    borderRadius: "0.5rem",
    frames: {
      shadowColor: "#124",
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: "https://ousttrue.github.io",
  integrations: [
    expressiveCode(astroExpressiveCodeOptions),
    mdx(),
    sitemap(),
    icon({
      include: {
        mdi: ["*"], // (Default) Loads entire Material Design Icon set
        devicon: ["*"],
      },
    }),
    tailwind(),
  ],
});
