---
date: 2022-04-04
tags:
- python
- ptk
title: prompt-toolkit の fullscreen アプリケーション
---

# prompt-toolkit の fullscreen アプリケーション

## Buffer

しばらく試行錯誤していたのだがやっと使い方が分かってきた。
`Window` + `BufferControl` が基本形で edit する場合向け。
`Window` + `FormatedTextControl` が readonly の装飾済みのテキストに向いていそう。

Lexer で基本的な装飾を施して、Preprocess でフォーカスやホバーのUI的な装飾をするという使い分けがよさそう。
`FormattedTextControl` の場合は初期化時にスタイル適用済みのテキストを渡してしまう。
## example

https://github.com/prompt-toolkit の、

* https://github.com/prompt-toolkit/pyvim
* https://github.com/prompt-toolkit/pymux
* https://github.com/prompt-toolkit/pyterm

が `prompt-toolkit2` のままになっているのだが、
ちょっと手直しすることで、 `prompt-toolkit3` で動作させることができた。


`ptterm` の `prompt-toolkit3` 化に PR を送ってみた。
主に `pipe` 周りの非同期入力を `asyncio` に適合させてやることで動く。
https://github.com/prompt-toolkit/ptterm/pull/9


`pymux` も `fork` しない `standalone` 引き数付きならば `Windows` + `prompt-toolkit3` でも動かすことができた。

prompt-toolkit3 では積極的に `asyncio` を活用していくのがよさそう。

## prompt-toolkit で任意のエスケープシーケンスを入れる

prompt-toolkit で `sixel` 画像を表示させたい。
UIControl が UIContent を生成していて、このとき styled text のデータ構造に対して特殊なスタイル `[ZeroWidthEscape]` を指定することでエスケープシーケンスを直接出力できることがわかった。諸々の調整が必要になるが、ここに `sixel` のシーケンスを入れることで表示できる。
処理順の癖に対応するために、
画像の高さ分の改行を `sixel` のエスケープシーケンスに先行させる必要があった。
`prompt-toolkit` + `wezterm` 固有の問題かもしれない。

## Windows/Linux 共用で console アプリを動かす

`prompt-toolkit3` でかなりできそう。
フレームワークの構成を理解するまでとっつきが悪いのだが、
`pypager`, `pyvim`, `ptterm`, `pymux` を研究してやっとわかってきた。

`nerdfont` で賑やかしを入れて、 `sixel` で画像表示ができるおもちゃを企画している。

- vim ぽい lsp/dap の実験アプリ
- w3m ぽい ブラウザ
- tmux ぽいやつ
- ranger ぽいやつ

