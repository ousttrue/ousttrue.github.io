---
title: "markdown と格闘"
date: 2023-12-31
tags: ["ssg", "svelte"]
---

post に TOC を付けようとして試行錯誤。
直接 remark と rehype した。
TOC を本文と離れたところ(sidebar) に出すべく弄っていたのだが、
最終的に2回 remark すればいいじゃん、となった。
slug が同じになるのが条件だが、同じになっている。
gatsby のときとか、markdown のオプション複雑でむずいなーと思っていたが、
直接触ってみればそうでもなかった。
remark / rehype がラップされることで解りにくくなっているかもしれない。

# 見出し
## Hoge
## Fuga

```html
<script lang="ts">
  // 抜粋

  // body
  const mkBody = unified()
    // mdast
    .use(remarkParse)
    // hast
    .use(remark2rehype)
    .use(rehypeSlug)
    .use(rehypeHighlight)
    .use(rehypeStringify);
  const body = mkBody.processSync(data.body).value;

  const mkToc = unified()
    // mdast
    .use(remarkParse)
    // hast
    .use(remark2rehype)
    .use(rehypeSlug)
    .use(rehypeToc, {})
    .use(onlyToc)
    .use(rehypeStringify);
  const toc = mkToc.processSync(data.body).value;

</script>

<div class="container">
  <div class="toc">
    <div class="markdown">
      {@html toc}
    </div>
  </div>
  <div class="body">
    <PostTitle post={data} />
    <div class="markdown">
      {@html body}
    </div>
  </div>
</div>
```
