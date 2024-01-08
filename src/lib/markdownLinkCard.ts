import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeSlug from "rehype-slug";
import rehypeToc from "rehype-toc";
import rehypePrettyCode from "rehype-pretty-code";
// https://ssssota.github.io/svelte-exmarkdown/
// import Markdown from "svelte-exmarkdown";
// import type { Plugin } from "svelte-exmarkdown/types";

import rehypeStringify from "rehype-stringify";
import { remarkLinkCard } from './remark-link-card';
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
// import rlc from 'remark-link-card';
import type { ExtLink } from './remark-link-card';
import { fromHtml } from 'hast-util-from-html'
import "$lib/markdown.css";


function toLinkCard(meta: {
  url: string;
  title: string;
  description: string;
  og: string | undefined;
  icon: string | undefined;
}): string {
  if (meta.og) {
    return `
<a href="${meta.url}" class="not-prose mb" target="_blank" rel="noreferrer">
  <div
    class="w-full flex justify-around bg-white rounded-md border mb-4"
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
  else {
    return `
<a href="${meta.url}" class="not-prose mb" target="_blank" rel="noreferrer">
  <div
    class="w-full flex justify-around bg-white rounded-md border mb-4"
  >
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
}


function extLinkHandler(_h: any, node: ExtLink) {
  return fromHtml(toLinkCard(node.meta), { fragment: true })
}


export async function renderMarkdown(md: string): Promise<{ html: string, toc: string }> {

  const processor = unified()
    // mdast
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkLinkCard)
    // .use(rlc)
    // .use(remarkRehype, { allowDangerousHtml: true }) // mdast → hast
    // .use(rehypeStringify, { allowDangerousHtml: true }) // hast → html
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

  const tree = await processor.run(processor.parse(md));

  // split tree
  const tocTree = {
    type: 'root',
    children: [tree.children.shift()],
  };

  const html = processor.stringify(tree);
  const toc = processor.stringify(tocTree);

  return { html, toc };
}
