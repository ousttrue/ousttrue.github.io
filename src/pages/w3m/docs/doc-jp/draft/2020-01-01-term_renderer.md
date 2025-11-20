---
title: termrenderer
date: 2000-01-01
tags: [w3m]
unlisted: true
---

いったん色とかアンダーライン/太字などの装飾をすべて削除する予定。
そうして termcap/terminfo 依存を削除する。

さらにデータ構造も単純な utf-8 文字列でシンプル化する。
cell 毎に enum の flags で属性を管理しない。
html からテキストグリッドへのレイアウトとテーブル罫線は残したい。

テキストグリッドは、msvc との共用化も見据えて
[FTXUI](https://github.com/ArthurSonzogni/FTXUI)を使用予定。

