import { glob } from 'glob';
import fs from 'node:fs';
import type { Plugin, Transformer } from "unified";
import { visit } from "unist-util-visit";
import type { Paragraph, Link, Literal } from "mdast";
import type { Node, Parent } from "unist";
import type { VFileCompatible } from "vfile";
import remarkGfm from "remark-gfm";

import { isParent, isLink, isParagraph } from "./routes/posts/[...slug=isNotAsset]/mdast-util-node-is";
import { metaDataCache } from './routes/posts/[...slug=isNotAsset]/metaDataCache';
import type { MetaData } from './routes/posts/[...slug=isNotAsset]/metaDataCache';
// import { isExtLink } from './routes/posts/[...slug=isNotAsset]/remark-link-card';

import remarkStringify from "remark-stringify";
import remarkParse from "remark-parse";
import { unified } from "unified";
import fetchSiteMetadata from "fetch-site-metadata";

const excludes = [
  'https://github.com/ousttrue/',
  'https://gist.github.com/',
  'https://qiita.com/ousttrue/',
  'https://zenn.dev/ousttrue/',
  'https://pypi.python.org/pypi/ptvsd',
  'https://docs.github.com/ja',
  'https://gohugo.io/',
  'http:',
  'https://forum.unity3d.com/threads',
];


function isExtLink(node: unknown): node is Paragraph {
  if (!isParagraph(node)) {
    return false;
  }

  const { children } = node;
  if (children.length != 1) {
    return false;
  }
  const singleChild = children[0];

  if (
    !(
      isLink(singleChild) &&
      singleChild.children[0].type == "text" &&
      singleChild.url.startsWith("http")
    )
  ) {
    return false;
  }

  return true;
}

function getExtLinks(mdPath: string): string[] {

  const urlList: string[] = [];
  const getLinkCard: Plugin = function extLinkTrans(): Transformer {
    return (tree: Node, _file: VFileCompatible) => {
      function visitor(
        node: Paragraph,
        index: number,
        parent: Parent | undefined
      ) {
        // if (!parent) {
        //   return;
        // }

        if (!isParent(parent)) {
          return;
        }

        if (parent.type === "listItem") {
          return;
        }

        const child = node.children[0] as Link;
        urlList.push(child.url);
      }

      visit(tree, isExtLink, visitor);
    };
  };
  const md = fs.readFileSync(mdPath, { encoding: 'utf-8' });
  unified()
    // mdast
    .use(remarkParse)
    .use(remarkGfm)
    .use(getLinkCard)
    .use(remarkStringify)
    .processSync(md)
    ;

  // console.log(urlList);
  return urlList;
}

async function main(): Promise<{ [key: string]: MetaData }> {
  const newMap: { [key: string]: MetaData } = {};
  for (const _f of glob.globSync('posts/**/*.md')) {
    const f = _f.replaceAll('\\', '/');
    // const f = "posts/2024/0103-linkcard.md"
    const links = getExtLinks(f);
    for (const link of links) {
      if (excludes.some(x => link.startsWith(x))) {
        // console.log(`skip: ${link}`);
        continue;
      }
      const cache = metaDataCache[link];
      if (cache) {
        // console.log(`cache ${link}`);
        newMap[link] = cache;
      }
      else {
        console.log(`get ${link} ...`);
        try {
          const data = await fetchSiteMetadata(link)
          const metaData = {
            url: link,
            title: data.title ?? "(No title)",
            description: data.description ?? "",
            og: data.image?.src?.startsWith("https") ? data.image?.src : undefined,
            icon: data.icon?.startsWith("https") ? data.icon : undefined,
          };
          console.log(metaData);
          newMap[link] = metaData;
        }
        catch (err) {
          console.warn(err);
        }
      }
    }

  }
  return newMap;
}

function writeMap(map: Object) {
  fs.writeFileSync('./src/routes/posts/[...slug=isNotAsset]/metaDataCache.ts', `
export type MetaData = {
  url: string;
  title: string;
  description: string;
  og: string | undefined;
  icon: string | undefined;
};

export const metaDataCache: { [key: string]: MetaData } = ${JSON.stringify(map, null, 2)};`);
}

const newMap = await main();
// console.log(newMap);
writeMap(newMap);

