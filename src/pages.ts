const pages = import.meta.glob(
  '/src/pages/**/*.(tsx|md)',
  {
    import: 'default',
    eager: true
  }
);
const ROOT = '/src/pages';

export const Pages = Object.fromEntries(
  Object.entries(pages).map(([k, v]) => [k.substring(ROOT.length), v]));

