const ROOT = '/src/pages';
const pages = import.meta.glob(
  '/src/pages/**/*.tsx',
  {
    import: 'default',
    eager: true
  }
);
const posts = import.meta.glob(
  '/src/pages/**/*.md',
  {
    import: 'default',
    eager: true
  }
);

export const Pages = Object.fromEntries(
  Object.entries(pages).map(([k, v]) => [k.substring(ROOT.length, k.length - 4) + ".html", v]));
export const Posts = Object.fromEntries(
  Object.entries(posts).map(([k, v]) => [k.substring(ROOT.length, k.length - 3) + ".html", v]));

