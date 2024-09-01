import React from 'react';
const ROOT = '/src/pages';

export type Post = {
  title: string,
  body: string,
};

export type Props = { posts: { [key: string]: Post } };

const pages = import.meta.glob<(props: Props) => React.ReactNode>(
  '/src/pages/**/*.tsx',
  {
    import: 'default',
    eager: true
  }
);

const posts = import.meta.glob<Post>(
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

export const Pages = Object.fromEntries(
  Object.entries(pages).map(([k, v]) => [fixPath(k, '.tsx'), v]));
export const Posts = Object.fromEntries(
  Object.entries(posts).map(([k, v]) => [fixPath(k, '.md'), v]));

