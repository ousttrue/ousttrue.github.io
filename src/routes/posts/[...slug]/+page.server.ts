import { getPosts, getAssetSync } from '$lib/getPosts';
import path from 'node:path';
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { parseSelector } from "hast-util-parse-selector";

import type unist from "unist";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import remarkToc from "remark-toc";
import remark2rehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeToc from "rehype-toc";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import "highlight.js/styles/github.css";

function getHtml(body: string, dir: string) {
  function image64() {
    function transform(tree: unist.Node) {
      visit(
        tree,
        (node) => node.tagName == "img",
        (node, i, parent) => {
          const { buffer, contentType } = getAssetSync(
            `${dir}/${node.properties.src}`,
          );
          console.log(contentType, node);
          node.properties.src = "data:image/png;base64," + buffer.toString('base64');
        },
      );
    }
    return (tree: unist.Node) => {
      transform(tree);
    };
  }

  const mkBody = unified()
    // mdast
    .use(remarkParse)
    .use(remarkGfm)
    // hast
    .use(remark2rehype)
    .use(rehypeSlug)
    .use(rehypeHighlight)
    .use(image64)
    .use(rehypeStringify);
  return mkBody.processSync(body).value;
}

function getToc(body: string) {
  function onlyToc() {
    function transform(tree: unist.Node) {
      visit(
        tree,
        (node) => node.type == "root",
        (node, i, parent) => {
          // console.log(node, i, parent);
          // const wrap = parseSelector("div.root");
          // wrap.children = [...node.children];
          node.children = [node.children[0]];
        },
      );
    }
    return (tree: unist.Node) => {
      transform(tree);
    };
  }

  const mkToc = unified()
    // mdast
    .use(remarkParse)
    // hast
    .use(remark2rehype)
    .use(rehypeSlug)
    .use(rehypeToc, {})
    .use(onlyToc)
    .use(rehypeStringify);
  return mkToc.processSync(body).value;
}

// @ts-ignore
export async function load({ params }) {
  const ext = path.extname(params.slug).toLowerCase();
  switch (ext) {
    case '.jpg':
      {
        // return await getAsset(params.slug);
        return {};
      }
    default:
      {
        // { slug: '2021/imgui_docking_api' }
        const { posts } = await getPosts();
        const post = posts.find((post) => post.slug === params.slug);

        post.html = getHtml(post.body, path.dirname(post.slug));
        post.toc = getToc(post.body);

        return post;
      }
  }
}
