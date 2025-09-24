import { SORTED_POSTS } from "./pages";
import { type MarkdownData } from "../mymd-vite-plugin.ts";
import Title from "./Title.tsx";
import type { Frontmatter } from "../mymd-vite-plugin.ts";
import {
  Node,
  Parent,
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

function TextNode({ node }: { node: Text }) {
  return node.value;
}

function ParagraphNode({ node }: { node: Paragraph }) {
  return (
    <p>
      {node.children.map((child, i) => (
        <NodeRenderer key={i} node={child} />
      ))}
    </p>
  );
}

function LinkNode({ node }: { node: Link }) {
  // @ts-ignore
  return (
    <a href={node.url}>
      {node.children.map((child, i) => (
        <NodeRenderer key={i} node={child} />
      ))}
    </a>
  );
}

function ListNode({ node }: { node: List }) {
  return (
    <ul>
      {node.children.map((child, i) => (
        <NodeRenderer key={i} node={child} />
      ))}
    </ul>
  );
}

function ListItemNode({ node }: { node: ListItem }) {
  if (node.checked !== null) {
    return (
      <li>
        <input type="checkbox" checked={node.checked} disabled={true} />
        {node.children.map((child, i) => (
          <NodeRenderer key={i} node={child} />
        ))}
      </li>
    );
  } else {
    return (
      <li>
        {node.children.map((child, i) => (
          <NodeRenderer key={i} node={child} />
        ))}
      </li>
    );
  }
}

function HeadingNode({ node }: { node: Heading }) {
  return (
    <h2>
      {node.children.map((child, i) => (
        <NodeRenderer key={i} node={child} />
      ))}
    </h2>
  );
}

function InlineCodeNode({ node }: { node: InlineCode }) {
  return <span className="inline">{node.value}</span>;
}

function CodeNode({ node }: { node: Code }) {
  // @ts-ignore
  return <div dangerouslySetInnerHTML={{ __html: node.html }} />;
}

function TableNode({ node }: { node: Table }) {
  return (
    <table>
      <thead>
        <tr>
          {node.children[0].children.map((cell, x) => (
            <th>
              {cell.children.map((inline, y) => (
                <NodeRenderer key={y} node={inline} />
              ))}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {node.children.splice(1).map((row, i) => (
          <tr key={i}>
            {row.children.map((cell, x) => (
              <td>
                {cell.children.map((inline, y) => (
                  <NodeRenderer key={y} node={inline} />
                ))}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function MsgNode({ node }: { node: Parent }) {
  return (
    <div className="msg note">
      <span>📝</span>
      {node.children.map((child, i) => (
        <NodeRenderer key={i} node={child} />
      ))}
    </div>
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
    case "delete": {
      return (
        <s>
          {(node as any).children.map((child, i) => (
            <NodeRenderer key={i} node={child} />
          ))}
        </s>
      );
    }
    case "msg": {
      return <MsgNode node={node as any} />;
    }
    default: {
      return (
        <div className="unknown">{`unknown: ${node.type} => ${JSON.stringify(node)}`}</div>
      );
      // throw new Error(`f${node}`);
    }
  }
}

function Before({ index }: { index: number }) {
  const post = SORTED_POSTS[index];
  if (post) {
    return <Title path={post[0]} frontmatter={post[1].frontmatter} />;
  }
}

function After({ index }: { index: number }) {
  const post = SORTED_POSTS[index];
  if (post) {
    return <Title path={post[0]} frontmatter={post[1].frontmatter} />;
  }
}

export default function Markdown({
  path,
  frontmatter,
  node,
}: {
  path: string;
  frontmatter: Frontmatter;
  node: Root;
}) {
  const i = SORTED_POSTS.findIndex(([key, post]) => key == path);

  return (
    <article>
      <Title path={path} frontmatter={frontmatter} className="item" />
      <section>
        <RootNode node={node} />
      </section>
      <div className="before_after">
        <Before index={i + 1} />
        <After index={i - 1} />
      </div>
    </article>
  );
}
