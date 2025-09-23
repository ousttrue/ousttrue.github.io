---
title: remark memo

date: 2025-09-23
tags: [markdown]
---

## remark

よく使う組み合わせが remark.parse から rehype.stringify ぽいが、
rehype.stringify を使わずに React から手作りで HTML 出力する例についてメモする。

### remark.parse

markdown 文字列 を parse して mdast.Root を得る。

```ts
import { Node, Parent, Root, Code } from "mdast";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";

const parseMarkdown = remark().use(remarkFrontmatter).use(remarkGfm);

export async function markdownParser(src: string): Promise<Root> {
  const parsed = parseMarkdown.parse(src);
  const mdastRoot = await parseMarkdown.run(parsed);
  // @ts-ignore
  return mdastRoot;
}
```

### render

mdast.Root から AST に再帰的に潜りながら React 形式で Html を出力する。

```tsx
import {
  Node,
  Root,
  Code,
  Text,
  Paragraph,
  InlineCode,
  Link,
  List,
  ListItem,
  Heading,
  Table,
  TableRow,
  TableCell,
} from "mdast";

function RootNode({ node }: { node: Root }) {
  return (
    <p>
      {node.children.map((child, i) => (
        <NodeRenderer key={i} node={child} />
      ))}
    </p>
  );
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
      return <CodeNode node={node as Code} />;
    }
    case "table": {
      return <TableNode node={node as Table} />;
    }
    // case "tableRow": {
    //   return <TableRowNode node={node as TableRow} />;
    // }
    // case "tableCell": {
    //   return <TableCellNode node={node as TableCell} />;
    // }
    default: {
      return (
        <div className="unknown">{`unknown: ${node.type} => ${JSON.stringify(node)}`}</div>
      );
      // throw new Error(`f${node}`);
    }
  }
}
```

### markdown 文法拡張

- @2021 [unified を使って Markdown を拡張する](https://zenn.dev/januswel/articles/745787422d425b01e0c1)
- @2023 [Markdown を型付きオレオレ AST に変換する | giraphme/blog](https://giraph.me/articles/unified-with-ts/)

むしろ、下の記事だった。

- @2023 [react-markdown をやめて remark から自力でレンダリングするようにした話 | stin's Blog](https://blog.stin.ink/articles/replace-react-markdown-with-remark)

わりとさくっと admonition できた。
