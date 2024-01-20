---
title: remark-admonitions 動かない
date: 2024-01-20
tags: [markdown]
---

## `:::` 記法

`:::` 記法は sphinx-myst も github も qiita も zenn も入って、デファクトです。
注意書きを書くときとかに便利です。
あと、markdown の見出しは閉じタグが無いので、見出しを閉じて元のレベルで続きを書くということができません。
`:::` 記法は代用品に使えます。

## うちにも入れたい

astro で動くプラグインを探している。
astro 製の [starlight](https://starlight.astro.build/ja/getting-started/)  にあるのだから、
部品として公開してくれれば良いのだが見つからなかった。

ということで https://github.com/elviswolcott/remark-admonitions 。
どうも remark の API 変更で動かなくなってしまったぽい。

https://github.com/nf-core/website/blob/main/astro.config.mjs

では動いているぽい。`astro-3.6`。うちは `astro-4.1`。

https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins

を見ると、

> some plugins don’t work with recent versions of remark due to changes in its
> underlying parser (micromark).
> 👉 note: remark-directive is similar and up to date)

と書いてある。
でも、ちょっとシンタックスが違って `remark-admonitions` の方が好みなんよね。

2つ手段がある。

`remark-admonitions` を近代化するか、`remark-directive` を改造するか。

## remark-admonitions の近代化をやってみる

情報収集…

https://github.com/vivliostyle/vfm/issues/45

remark-13 (2020) からぽい？

https://github.com/remarkjs/remark/releases/tag/13.0.0

動くコードコピペよりは重くなりそうだ。
腰を据えてやますか…

### micromark Extension

```js
export interface Extension {
  document?: ConstructRecord | undefined
  contentInitial?: ConstructRecord | undefined
  flowInitial?: ConstructRecord | undefined
  flow?: ConstructRecord | undefined
  string?: ConstructRecord | undefined
  text?: ConstructRecord | undefined
  disable?: {null?: Array<string> | undefined} | undefined
  insideSpan?:
    | {null?: Array<Pick<Construct, 'resolveAll'>> | undefined}
    | undefined
  attentionMarkers?: {null?: Array<Code> | undefined} | undefined
}
```

実装例

- https://github.com/micromark/micromark-extension-gfm-strikethrough/blob/main/dev/lib/syntax.js
- https://github.com/micromark/micromark-extension-directive/blob/main/dev/lib/syntax.js

### vitest で test driven

```ts
import { expect, test } from "vitest";
import { fromMarkdown } from "mdast-util-from-markdown";

test("micromark", () => {
  const result = fromMarkdown("## Hello, *world*!");
  // console.log(result);
  expect(result.type).toEqual("root");
  expect(result.children[0].type).toEqual("heading");
});
```
