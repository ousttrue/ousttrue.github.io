import assert from 'node:assert'
import React from 'react';
import type { MarkdownData, Frontmatter } from '../mymd-vite-plugin.ts';
import {
  Node, Parent, Root,
  Code, Text, Paragraph, InlineCode, Link, List, ListItem,
  Heading,
} from "mdast";
import { RootContent, RootContentMap, PhrasingContent } from "mdast";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import DateFormat from './DateFormat.tsx';
import Title from './Title.tsx';
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

function RootNode({ node }: { node: Root }) {
  return (
    <p>
      {node.children.map((child, i) => <NodeRenderer key={i} node={child} />)}
    </p>
  );
};

function TextNode({ node }: { node: Text }) {
  return node.value;
};

function ParagraphNode({ node }: { node: Paragraph }) {
  return (
    <p>
      {node.children.map((child, i) => <NodeRenderer key={i} node={child} />)}
    </p>
  );
};

function LinkNode({ node }: { node: Link }) {
  // @ts-ignore
  return (<a href={node.url}>
    {node.children.map((child, i) => <NodeRenderer key={i} node={child} />)}
  </a>);
}

function ListNode({ node }: { node: List }) {
  return (<ul>
    {node.children.map((child, i) => <li key={i}><NodeRenderer node={child} /></li>)}
  </ul>)
}

function ListItemNode({ node }: { node: ListItem }) {
  return (<li>
    {node.children.map((child, i) => <li key={i}><NodeRenderer node={child} /></li>)}
  </li>)
}

function HeadingNode({ node }: { node: Heading }) {
  return (<h2>
    {node.children.map((child, i) => <NodeRenderer key={i} node={child} />)}
  </h2>);
}

function InlineCodeNode({ node }: { node: InlineCode }) {
  return (<span className="inline">
    {node.value}
  </span>);
}

function CodeNode({ node }: { node: Code }) {
  // @ts-ignore
  return <div dangerouslySetInnerHTML={{ __html: node.html }} />
}

export function NodeRenderer({ node }: { node: Node }) {
  switch (node.type) {
    case "text": {
      return <TextNode node={node as Text} />;
    }
    case "paragraph": {
      return <ParagraphNode node={node as Paragraph} />;
    }
    case "link": {
      return <LinkNode node={node as Link} />;
    }
    case "list": {
      return <ListNode node={node as List} />;
    }
    case "listItem": {
      return <ListItemNode node={node as ListItem} />;
    }
    case "heading": {
      return <HeadingNode node={node as Heading} />;
    }
    case "inlineCode": {
      return <InlineCodeNode node={node as InlineCode} />;
    }
    case "code": {
      return <CodeNode node={node as Code} />
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
        <RootNode node={node} />
      </section>
    </article>
  );

}
