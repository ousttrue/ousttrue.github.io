---
title: "toc 分離"
date: 2024-01-05
tags: ["ssg", "markdown"]
---

# 木を分ける

https://unifiedjs.com/explore/package/unified/

から process が、parse, run, stringify の3ステップであることを把握。
parse, run まで実行して hast を toc と body に分割することを思いついた。
できた👇

```ts
async function renderMarkdown(md: string)
  : Promise<{ html: string, toc: string }> {

  const processor = unified()
    // mdast
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkLinkCard)
    .use(remarkRehype, {
      handlers: {
        extlink: extLinkHandler
      }
    })
    // rehype
    .use(rehypeSlug)
    .use(rehypeToc)
    .use(rehypePrettyCode)
    .use(rehypeStringify)
    ;

  const tree = await processor.run(processor.parse(md));

  // split tree
  const tocTree = {
    type: 'root',
    children: [tree.children.shift()],
  };

  const html = processor.stringify(tree);
  const toc = processor.stringify(tocTree);

  return { html, toc };
}
```

# 普通に 2箇所に分けて描画

```html

<div class="body">
  {@html data.html}
</div>

<div class="toc">
  {@html data.toc}
</div>
```

これで css で小細工を弄する必要が無くなりました。
左にグローバルなサイドバー、右にローカルなサイドバーを配置する計画なので toc を右サイドバーに入れやすくしました。

