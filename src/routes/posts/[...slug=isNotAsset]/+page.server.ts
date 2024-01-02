import type { PageServerLoad } from './$types';
import { getPosts } from '$lib/getPosts';

// https://ssssota.github.io/svelte-exmarkdown/
// import Markdown from "svelte-exmarkdown";
import type { Plugin } from "svelte-exmarkdown/types";
import "$lib/markdown.css";

import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import rehypeSlug from "rehype-slug";
import rehypeToc from "rehype-toc";
import rehypePrettyCode from "rehype-pretty-code";


async function renderMarkdown(md: string) {

  const toHtml = unified()
    // mdast
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
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
