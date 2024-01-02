<script lang="ts">
  export let md: string;
  export let slug: string = null;

  // https://ssssota.github.io/svelte-exmarkdown/
  import Markdown from "svelte-exmarkdown";
  import type { Plugin } from "svelte-exmarkdown/types";
  import "$lib/markdown.css";

  import remarkGfm from "remark-gfm";
  import type unist from "unist";
  import rehypeSlug from "rehype-slug";
  import rehypeToc from "rehype-toc";
  import rehypeHighlight from "rehype-highlight";
  import "highlight.js/styles/github.css";

  // import path from "node:path";
  import { visit } from "unist-util-visit";

  import { getAssetSync } from "$lib/getAsset";

  function dirname(src: string) {
    const found = src.lastIndexOf("/");
    if (found == -1) {
      return "";
    }
    return src.substring(0, found);
  }

  const dir = slug ? dirname(slug) : "";
  // const dir = 'slug';
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
          node.properties.src =
            "data:image/png;base64," + buffer.toString("base64");
        },
      );
    }
    return (tree: unist.Node) => {
      transform(tree);
    };
  }

  const plugins: Plugin[] = [
    { remarkPlugin: [remarkGfm] },
    { rehypePlugin: [rehypeSlug] },
    { rehypePlugin: [rehypeToc] },
    { rehypePlugin: [rehypeHighlight] },
    // { rehypePlugin: [image64] },
  ];
  //     .use(rehypeSlug)
  //     .use(rehypeHighlight)

  // function getHtml(body: string, dir: string) {
  //
  //   const mkBody = unified()
  //     // mdast
  //     .use(remarkParse)
  //     .use(remarkGfm)
  //     // hast
  //     .use(remark2rehype)
  //     .use(rehypeSlug)
  //     .use(rehypeHighlight)
  //     .use(image64)
  //     .use(rehypeStringify);
  //   return mkBody.processSync(body).value;
  // }

  // function getToc(body: string) {
  //   function onlyToc() {
  //     function transform(tree: unist.Node) {
  //       visit(
  //         tree,
  //         (node) => node.type == "root",
  //         (node, i, parent) => {
  //           // console.log(node, i, parent);
  //           // const wrap = parseSelector("div.root");
  //           // wrap.children = [...node.children];
  //           node.children = [node.children[0]];
  //         },
  //       );
  //     }
  //     return (tree: unist.Node) => {
  //       transform(tree);
  //     };
  //   }
  //
  //   const mkToc = unified()
  //     // mdast
  //     .use(remarkParse)
  //     // hast
  //     .use(remark2rehype)
  //     .use(rehypeSlug)
  //     .use(rehypeToc, {})
  //     .use(onlyToc)
  //     .use(rehypeStringify);
  //   return mkToc.processSync(body).value;
  // }
</script>

<div class="markdown">
  <Markdown {md} {plugins} />
</div>
