import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import expressiveCode from "astro-expressive-code";
import rehypeExternalLinks from "rehype-external-links";
import remarkDirective from "remark-directive";
import { h } from "hastscript";
import { visit } from "unist-util-visit";
import remarkLinkCard from "remark-link-card";

const remarkCustomDirective /*: Plugin<[], Root>*/ = () => {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === "textDirective" ||
        node.type === "leafDirective" ||
        node.type === "containerDirective"
      ) {
        const [name, ...n] = node.name.split(" ");
        let value = null;
        if (n.length > 0) {
          value = n.join(" ");
        } else {
          value = null;
        }
        // if (name === "message")
        console.log("name", name);

        node.attributes.class = `admonition admonition-info`;

        const data = node.data || (node.data = {});
        const tagName = node.type === "textDirective" ? "span" : "div";

        data.hName = tagName;

        data.hProperties = h(tagName, node.attributes).properties;
      }
    });
  };
};

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
  markdown: {
    remarkPlugins: [
      [
        remarkLinkCard,
        {
          // cache: true
        },
      ],
      remarkDirective,
      remarkCustomDirective,
    ],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          properties: { "data-external": " 🔗" },
        },
      ],
    ],
  },
});
