import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwind from "@astrojs/tailwind";

import remarkCodeBlock from "./src/lib/remark-code-block";
import rehypePrettyCode from "rehype-pretty-code";
const prettyCodeOptions = {
  theme: "solarized-dark",
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [
        {
          type: "text",
          value: " ",
        },
      ];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["word"];
  },
  tokensMap: {},
};
// https://astro.build/config
export default defineConfig({
  site: 'https://ousttrue.github.io',
  integrations: [mdx(), sitemap(), tailwind(),],
  markdown: {
    gfm: true,
    // remarkPlugins: [remarkCodeBlock],
    extendDefaultPlugins: true,
    syntaxHighlight: false,
    rehypePlugins: [[rehypePrettyCode, {}]],
  }
});
