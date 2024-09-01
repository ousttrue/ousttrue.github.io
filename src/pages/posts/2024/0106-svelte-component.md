---
title: "svelte の コンポーネント"
date: 2024-01-06
tags: ["ssg", "svelte"]
---

tag をグループ分けできるように仕組みを構築中。
サイドバーに木を作るべく弄くりまわしていたところ、
ちょっと `svelte` 力が上がった。

# 再帰コンポーネント

木なので。
`svelte:self` でできる。

https://svelte.dev/repl/347b37e18b5d4a65bbacfd097536db02?version=4.2.8

# 複数 slot

sidebar と main で2つ slot したかった。
名前つき slot でできる。

https://svelte.dev/repl/abc6ecc5953c4c77af402185a2219df4?version=4.2.8

# 微妙に更新されない

コンポーネントが破棄されずに再利用されるのが原因ぽい。

https://github.com/sveltejs/kit/issues/4895

インタラクティブなものを作っているつもりでなくても、必要な場合があることがわかった。
`[...slug]` で slug のみが変わるときにコンポーネントの再利用が起きた場合に必要ぽい。
木の選択状態を反映する `Component` で必要だった。
`svelte` のサイトが妙に速いのは通常のリンクに見えるところでも、なんか仕込みがあるぽいことが察っせられる。

次のメッセージが時々出るのも気になる。

```
src/routes/tags/[tag]/+page.server.ts: Accessing `params.posts` in a promise handler after `load(...)` has returned will not cause the function to re-run when the param changes
```
# TODO:

木の開閉。


