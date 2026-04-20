import path from "node:path";
import React from "react";
import type { Frontmatter, MarkdownData } from "../mymd-vite-plugin.ts";
const ROOT = "/src/pages";

export type Props = { posts: { [key: string]: MarkdownData } };

const pages = import.meta.glob<(props: Props) => React.ReactNode>(
  "/src/pages/**/*.tsx",
  {
    import: "default",
    eager: true,
  },
);

const posts = import.meta.glob<MarkdownData>("/src/pages/**/*.md", {
  import: "default",
  eager: true,
});

function toHtml(stem: string): string {
  if (stem.endsWith("/index")) {
    return stem + ".html";
  } else if (stem.endsWith("/")) {
    return stem + "index.html";
  } else {
    return stem + "/index.html";
  }
}

// from /src/pages
// .xxx replace to '.html'
function fixPath(key: string, ext: string) {
  const stem = key.substring(ROOT.length, key.length - ext.length);
  return toHtml(stem);
}

function fixDate(v: MarkdownData) {
  const { frontmatter, content } = v;
  const d = new Date();
  if (typeof frontmatter.date === "string") {
    d.setTime(Date.parse(frontmatter.date));
  }
  return { content, frontmatter: { ...frontmatter, date: d } };
}

export const PAGES = Object.fromEntries(
  Object.entries(pages).map(([k, v]) => [fixPath(k, ".tsx"), v]),
);
export const POSTS = Object.fromEntries(
  Object.entries(posts).map(([k, v]) => [fixPath(k, ".md"), fixDate(v)]),
);

export const SORTED_POSTS = Object.entries(POSTS).toSorted((a, b) =>
  a[1].frontmatter.date < b[1].frontmatter.date ? 1 : -1,
);

const dirs: { [key: string]: string[] } = {};

function push_dir(stem: string) {
  const parent = path.dirname(stem);
  const html = toHtml(stem);
  const parent_html = toHtml(parent);
  if (!(parent_html in dirs)) {
    dirs[parent_html] = [];
  }
  if (dirs[parent_html].indexOf(html) == -1) {
    // console.log(`${stem} => ${parent}`);
    dirs[parent_html].push(html);
  }

  if (parent != "/") {
    push_dir(parent);
  }
}

for (const [key, _] of SORTED_POSTS) {
  // /path/to/index.html
  const ext = ".md";
  let stem = path.dirname(key);
  push_dir(stem);
}
export const DIRS = dirs;

export const TAGS: Set<string> = (function () {
  const tags = new Set<string>();
  for (const [_, post] of SORTED_POSTS) {
    if (post.frontmatter.tags) {
      for (const tag of post.frontmatter.tags) {
        tags.add(tag);
      }
    }
  }
  return tags;
})();

export const COPYDATA = import.meta.glob("/src/pages/**/*.jpg", {
  import: "default",
  eager: true,
});
