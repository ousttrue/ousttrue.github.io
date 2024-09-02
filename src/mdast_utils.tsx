import assert from 'node:assert'
import React from 'react';
import type { MarkdownData, Frontmatter } from '../mymd-vite-plugin.ts';
import { Node, Parent, Root } from "mdast";
import { RootContent, RootContentMap, PhrasingContent } from "mdast";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import DateFormat from './DateFormat.tsx';
import Title from './Title.tsx';

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

function TextNode({ node }: { node: RootContentMap["text"] }) {
  return node.value;
};

function ParagraphNode({ node }: { node: RootContentMap["paragraph"] }) {
  return (
    <p>
      {node.children.map((child, i) => <NodeRenderer key={i} node={child} />)}
    </p>
  );
};

function LinkNode({ node }: { node: RootContentMap["link"] }) {
  // @ts-ignore
  return (<a href={node.url}>
    {node.children.map((child, i) => <NodeRenderer key={i} node={child} />)}
  </a>);
}

function ListNode({ node }: { node: RootContentMap["list"] }) {
  return (<ul>
    {node.children.map((child, i) => <li key={i}><NodeRenderer node={child} /></li>)}
  </ul>)
}

function ListItemNode({ node }: { node: RootContentMap["listItem"] }) {
  return (<li>
    {node.children.map((child, i) => <li key={i}><NodeRenderer node={child} /></li>)}
  </li>)
}

function HeadingNode({ node }: { node: RootContentMap["heading"] }) {
  return (<h2>
    {node.children.map((child, i) => <NodeRenderer key={i} node={child} />)}
  </h2>);
}

function InlineCodeNode({ node }: { node: RootContentMap["inlineCode"] }) {
  return (<span className="inline">
    {node.value}
  </span>);
}

function CodeNode({ node }: { node: RootContentMap["code"] }) {
  return (<code><pre>
    {node.value}
  </pre></code>);
}

export function NodeRenderer({ node }: { node: Node }) {
  switch (node.type) {
    case "text": {
      // @ts-ignore
      return <TextNode node={node} />;
    }
    case "paragraph": {
      // @ts-ignore
      return <ParagraphNode node={node} />;
    }
    case "link": {
      // @ts-ignore
      return <LinkNode node={node} />;
    }
    case "list": {
      // @ts-ignore
      return <ListNode node={node} />;
    }
    case "listItem": {
      // @ts-ignore
      return <ListItemNode node={node} />;
    }
    case "heading": {
      // @ts-ignore
      return <HeadingNode node={node} />;
    }
    case "inlineCode": {
      // @ts-ignore
      return <InlineCodeNode node={node} />;
    }
    case "code": {
      // @ts-ignore
      return <CodeNode node={node} />
    }
    default: {
      return <div className="unknown">{`unknown: ${node.type} => ${JSON.stringify(node)}`}</div>
      // throw new Error(`f${node}`);
    }
  }
}

export function Markdown({ path, frontmatter, node }: { path: string, frontmatter: Frontmatter, node: Root }) {

  return (
    <article>
      <Title path={path} frontmatter={frontmatter} />
      <section>
        {node.children.map((child, i) => <NodeRenderer key={i} node={child} />)}
      </section>
    </article>
  );

}
