---
title: "UI toolkit Skeleton"
date: 2024-01-07
tags: ["ssg", "svelte"]
---

https://www.skeleton.dev/

- https://www.skeleton.dev/components/app-shell
- https://www.skeleton.dev/components/tree-views

が良さそう。
導入。
DaisyUi と入れ替え作業。

# tree-views

既存で`<ul>` が nest する再帰的な component を組んでいたのだけど、
`<ul> => <TreeView>`, `<li> => <TreeViewItem>` と置き換えるだけで動いちゃった。
Node を開閉できるようになった。

TODO:

- node の選択状態(tree と node の中の anchor が別々に動いている)

