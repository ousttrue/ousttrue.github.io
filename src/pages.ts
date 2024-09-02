import React from 'react';
import type { Frontmatter, MarkdownData } from '../mymd-vite-plugin.ts';
const ROOT = '/src/pages';

export type Props = { posts: { [key: string]: MarkdownData } };

const pages = import.meta.glob<(props: Props) => React.ReactNode>(
  '/src/pages/**/*.tsx',
  {
    import: 'default',
    eager: true
  }
);

const posts = import.meta.glob<MarkdownData>(
  '/src/pages/**/*.md',
  {
    import: 'default',
    eager: true
  }
);

// from /src/pages
// .xxx replace to '.html'
function fixPath(key: string, ext: string) {
  return key.substring(ROOT.length, key.length - ext.length) + ".html";
}

function fixDate(v: MarkdownData) {
  const { frontmatter, content } = v;
  const d = new Date();
  d.setTime(Date.parse(frontmatter.date));
  return { content, frontmatter: { ...frontmatter, date: d } };
}

export const Pages = Object.fromEntries(
  Object.entries(pages).map(([k, v]) => [fixPath(k, '.tsx'), v]));
export const Posts = Object.fromEntries(
  Object.entries(posts).map(([k, v]) => [fixPath(k, '.md'), fixDate(v)]));

