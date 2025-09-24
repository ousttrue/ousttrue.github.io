---
title: remark の 実装は micromark

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

~~わりとさくっと admonition できた。~~
いや、できていない。admonition block の中に他のノードが入ったりすると対応できない。
transform じゃなくて parser plugin の方がよさそう。
inlineTokenizer じゃなくて blockTokenizer な気がする。

## 難航

js 作業がいつもどおり泥沼化。
ちょっと深くなると、ドキュメントとかblog例を見ても歯が立たない。
typescript で型まではわかるのだが、interface で切られて editor の jump で実装まで行くことができないからだ。
実装見ればすぐ分かるものを調べて解決しようとして、無限に検索しつつ進まないという状態に陥る。
たまたまそのものずばりのコードを github で探り当てることができた場合とかしかうまくいかない。
vscode の debugger をアタッチするとかすればすぐわかるので、そうするべき。
remark とか vite とかで毎回同じようなはまり方するのは、これが原因だ。

- https://marketplace.visualstudio.com/items?itemName=oven.bun-vscode
- [最高の TypeScript 開発環境を最速で作っていくよ 2025 秋](https://zenn.dev/somnicattus/articles/3c1f3756aec24a)

remark のドキュメントや plugin の作り方を検索するのはやめて、
[シンプルなプラグイン](https://vivliostyle.github.io/vivliostyle_doc/ja/vivliostyle-user-group-vol2/spring-raining/index.html)
にアタッチして動作を探る路線に変更。

ドキュメントじゃなくてコード読むべきで、
その助けとして debugger にアタッチする。

## 頓挫

うまくいかなかったが、分かったことをメモする。
まず、

- @2023 [Markdown を型付きオレオレ AST に変換する | giraphme/blog](https://giraph.me/articles/unified-with-ts/)

> 2020年ごろに Remark のパーサー（micromark）が仕様変更したことによって一部のプラグインが使用できなく

とあるのだが、

[Remark で広げる Markdown の世界](https://vivliostyle.github.io/vivliostyle_doc/ja/vivliostyle-user-group-vol2/spring-raining/index.html)

の以下の部分が変わっていて互換性が無い。

```js
function rubyAttacher() {
  const { Parser } = this;
  if (!Parser) {
    return;
  }
  const { inlineTokenizers, inlineMethods } = Parser.prototype;
  rubyTokenizer.locator = rubyLocator;
  inlineTokenizers.ruby = rubyTokenizer;
  inlineMethods.splice(inlineMethods.indexOf("text"), 0, "ruby");
}
```

今は、

https://github.com/lumen-notes/lumen/blob/main/src/remark-plugins/tag.ts

```js
/**
 * Remark plugin
 * Reference: https://github.com/remarkjs/remark-gfm/blob/main/index.js
 */
export function remarkTag(): ReturnType<Plugin<[], Root>> {
  // @ts-ignore I'm not sure how to type `this`
  const data = this.data()

  add("micromarkExtensions", tag())
  add("fromMarkdownExtensions", tagFromMarkdown())

  function add(field: string, value: unknown) {
    const list = data[field] ? data[field] : (data[field] = [])
    list.push(value)
  }
}
```

のようなスタイルに変わっている。
`this` が違う。

micromarkExtensions により micoromark の parser をカスタマイズし、
fromMarkdownExtensions におり micromarの 結果を mdast に乗せ換えるポイ。

https://github.com/remarkjs/remark/blob/main/packages/remark-parse/lib/index.js

## micromark の tokenizer

admonition に近いものとして codefence のソース。

https://github.com/micromark/micromark/blob/main/packages/micromark-core-commonmark/dev/lib/code-fenced.js

なのだけど、admonition は中に普通の markdown がまるっとネストするので、
`block 要素で他の要素がネストする` という類似する文法が既存でないぽい。

なので parser を拡張するのは筋が悪く、難易度が高いぽい。
parser(tokenizer) じゃなくて transformer で mdast を操作するのが現実的なのではないか。

## micromark-extension-directive だった

https://github.com/micromark/micromark-extension-directive

すなわち

https://github.com/remarkjs/remark-directive

使用例

https://github.com/mouse484/blog/commit/27f1148a3607f8ed30e0080c255b4d9aaab2e38d
