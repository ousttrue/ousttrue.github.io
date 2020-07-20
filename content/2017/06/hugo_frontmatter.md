---
Title: "hugoのfrontmatter"
Published: 2017-6-5
Tags: []
---

hugo newで新しく記事を作成した時のfrontmatterをカスタマイズするには。

とりあえず本家のドキュメントに目を通す。

https://gohugo.io/content/archetypes/

archetypes/default.md
にfrontmatterのみの記事を作ればよいらしい。
+++
tags = []
draft = true
+++

やってみた。
hugo newでfrontmatterがカスタマイズされることを確認できた。
