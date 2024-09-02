import assert from 'node:assert'
import React from 'react';
import type { MarkdownData, Frontmatter } from '../mymd-vite-plugin.ts';
import { Node, Parent, Root } from "mdast";
import { RootContent, RootContentMap, PhrasingContent } from "mdast";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";

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

const TextNode: React.FC<{ node: RootContentMap["text"] }> = ({ node }) => {
  return node.value;
};

const ParagraphNode: React.FC<{ node: RootContentMap["paragraph"] }> = ({ node }) => {
  return (
    <p>
      <NodesRenderer node={node} />
    </p>
  );
};

export function NodesRenderer({ node }: { node: Parent }) {
  return node.children.map((child, index) => {
    switch (child.type) {
      case "text": {
        return <TextNode key={index} node={child} />;
      }
      case "paragraph": {
        return <ParagraphNode key={index} node={child} />;
      }
      default: {
        return <p>{`unknown: ${child.type} => ${JSON.stringify(child)}`}</p>
        // throw new Error(`f${child}`);
      }
    }
  });
}

export function Markdown({ frontmatter, node }: { frontmatter: Frontmatter, node: Root }) {

  return (<>
    <h1>{frontmatter.title}</h1>
    <b>{frontmatter.date.toString()}</b>
    <NodesRenderer node={node} />
  </>);

}
