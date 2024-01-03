---
title: "linkcard やってみる"
date: 2024-01-03
tags: ["ssg", "svelte"]
---

markdown 記事内の外部リンクをカード表示するのをやってみる。

# meta 情報の取得

https://www.haxibami.net/blog/posts/blog-renewal

mdast の ノード置き換えできた🙏

# Svelte で LinkCard

https://zenn.dev/dl10yr/articles/b49e70fe595c14

tailwind を参考に svelte 化 🙏

# meta と card を連結

remark の async を server 側で完結するため、
`+page.server.ts:load` で markdown の html 化を済ませている。
確か `rehype-pretty-code` が processSync できなかったため。
svelte で以下のように markdown から rendering HTML rendering 済みのテキストを貼りつける方式です。

```html
{@html data.md}
```

https://zenn.dev/januswel/articles/745787422d425b01e0c1

mdast から hast へ変換する際に、
LinkCard として完成させよう。

```ts
import { fromHtml } from 'hast-util-from-html'

function toLinkCard(meta: {
  url: string;
  title: string;
  description: string;
  og: string | undefined;
  icon: string | undefined;
}): string {
  return `
<a href="${meta.url}" class="not-prose" target="_blank" rel="noreferrer">
  <div
    class="w-full flex justify-around bg-white rounded-md p-3 border"
  >
    <div class="w-1/2">
      <img src="${meta.og}" alt="${meta.title}" class="max-h-20 m-auto" />
    </div>
    <div class="flex flex-col justify-start px-1 ml-3">
      <div class="text-sm font-bold text-black whitespace-pre-wrap">
        ${meta.title}
      </div>
      <div class="text-gray-400 text-xs whitespace-pre-wrap">
        ${meta.description}
      </div>
    </div>
  </div>
</a>
`;
}

function extLinkHandler(_h: any, node: ExtLink) {
  return fromHtml(toLinkCard(node.meta), { fragment: true })
}

async function renderMarkdown(md: string) {

  const toHtml = unified()
    // mdast
    .use(remarkParse)
    .use(remarkLinkCard)
    .use(remarkGfm)
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
  const vfile = await toHtml.process(md);
  return vfile.value;
}
```

fromHtml でできちゃった。
`svelte` 出番無し。

画像位置とか調整はまだだが、なんか今風のサイトっぽくなった感じがするなー。

# TODO

せっかくなので LinkCard を svelte component 化したい

参考

https://github.com/ssssota/svelte-exmarkdown

