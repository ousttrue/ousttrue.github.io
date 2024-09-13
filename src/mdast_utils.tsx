import type { MarkdownData } from '../mymd-vite-plugin.ts';
import {
  Node, Parent, Root, Code
} from "mdast";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import { codeToHtml } from 'shiki'

const parseMarkdown = remark()
  .use(remarkFrontmatter)
  .use(remarkGfm);
export type MarkdownProps = {
  path: string,
  post: MarkdownData,
  // mdast: Node,
};

export async function markdownParser(src: string): Promise<Root> {
  const parsed = parseMarkdown.parse(src);
  const mdastRoot = await parseMarkdown.run(parsed);
  // @ts-ignore
  return mdastRoot;
}

export function isParent(node: Node): node is Parent {
  return node !== null &&
    typeof node === "object" &&
    node.hasOwnProperty('children');
}

export async function markdownModifyAsync(node: Node): Promise<void> {
  if (isParent(node)) {
    for (const child of node.children) {
      await markdownModifyAsync(child);
    }
  }
  else {
    switch (node.type) {

      case 'code':
        {
          // shiki
          const typed = node as Code;
          let lang = typed.lang || '';
          if (lang.startsWith("title=")) {
            lang = '';
          }
          if (lang.includes('/')) {
            lang = '';
          }
          if (lang.includes('.')) {
            lang = '';
          }
          const html = await codeToHtml(typed.value, {
            lang,
            theme: 'min-dark'
          });
          // @ts-ignore
          node.html = html;

          break;
        }
    }
  }
}

