import React from 'react';
import type { MarkdownData } from '../mymd-vite-plugin.ts';
import { Node } from "mdast";
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

export async function markdownParser(src: string): Promise<Node> {
  const parsed = parseMarkdown.parse(src);
  const mdastRoot = await parseMarkdown.run(parsed);
  return mdastRoot;
}

export function MarkdownRenderer(props: { node: Node }) {
  return NodesRenderer({ nodes: props.node.children });
}

function NodesRenderer(props) {
  const nodes = props.nodes;
  return nodes.map((node, index) => {
    switch (node.type) {
      case "text": {
        return <TextNode key={index} node={node} />;
      }
      case "paragraph": {
        return <ParagraphNode key={index} node={node} />;
      }
      default: {
        return <div>{`unknown: ${node.type} => ${JSON.stringify(node)}`}</div>
        // throw new Error(`f${node}`);
      }
    }
  });
}

const TextNode: React.FC<{ node: RootContentMap["text"] }> = ({ node }) => {
  return node.value;
};

const ParagraphNode: React.FC<{ node: RootContentMap["paragraph"] }> = ({ node }) => {
  return (
    <p>
      <NodesRenderer nodes={node.children} />
    </p>
  );
};

export function Markdown(props: MarkdownProps) {
  const { path, post } = props;

  return (<>
    <div>{post.frontmatter.title}</div>
    <div>{post.content}</div>
  </>);
}
