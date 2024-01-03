import type { PageServerLoad } from './$types';
import { getPosts } from '$lib/getPosts';

// https://ssssota.github.io/svelte-exmarkdown/
// import Markdown from "svelte-exmarkdown";
// import type { Plugin } from "svelte-exmarkdown/types";
import "$lib/markdown.css";

import rehypeStringify from "rehype-stringify";
import { remarkLinkCard } from './remark-link-card';
import type { ExtLink } from './remark-link-card';
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
// import rlc from 'remark-link-card';
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeSlug from "rehype-slug";
import rehypeToc from "rehype-toc";
import rehypePrettyCode from "rehype-pretty-code";
import { fromHtml } from 'hast-util-from-html'


function toLinkCard(meta: {
  url: string;
  title: string;
  description: string;
  og: string | undefined;
  icon: string | undefined;
}): string {
  return `
<a href="${meta.url}" class="not-prose border" target="_blank" rel="noreferrer">
  <div
    class="w-full flex justify-around bg-white rounded-md border"
  >
    <div class="w-2/5">
      <img src="${meta.og}" alt="${meta.title}" class="max-h-30 m-auto" />
    </div>
    <div class="w-3/5 flex flex-col justify-start">
      <div class="text-sm font-bold text-black p-2">
        ${meta.title}
      </div>
      <div class="text-gray-400 text-xs px-2">
        ${meta.description}
      </div>
    </div>
  </div>
</a>
`;
}


function extLinkHandler(_h: any, node: ExtLink) {
  return fromHtml(toLinkCard(node.meta), { fragment: true })
}


async function renderMarkdown(md: string) {

  const toHtml = unified()
    // mdast
    .use(remarkParse)
    .use(remarkLinkCard)
    // .use(rlc)
    // .use(remarkRehype, { allowDangerousHtml: true }) // mdast → hast
    // .use(rehypeStringify, { allowDangerousHtml: true }) // hast → html
    .use(remarkGfm)
    .use(remarkRehype, {
      handlers: {
        extlink: extLinkHandler
      }
    })
    // rehype
    .use(rehypeSlug)
    .use(rehypeToc)
    .use(rehypePrettyCode)
    .use(rehypeStringify)
    ;
  const vfile = await toHtml.process(md);
  return vfile.value;
}

export const load: PageServerLoad = async ({ params }) => {
  const { posts } = await getPosts();
  const post = posts.find((post) => post.slug === params.slug);
  if (!post) {
    console.log(posts.map(x => x.slug), params);
    throw new Error('not post');
  }

  // render
  post.html = await renderMarkdown(post.body);

  return post;
}
