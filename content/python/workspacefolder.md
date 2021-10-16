+++
date = 2019-04-19T05:34:33+09:00
tags = ['python', 'vim']
draft = true
title = 'WorkspaceFolder作成中'
+++


https://github.com/ousttrue/WorkspaceFolder

要件は、

* WindowsとLinuxで共用にできる
* 実行時に、親フォルダを遡って設定(プロジェクトルートに `Duck.toml` を配置する約束`)を探しに行く能力がある
* Task間の依存関係が記述できる 
* コマンド呼び出し時のパスを調整できる

こんなもん。

```vim
augroup MyAutoCmd
    autocmd BufWritePost *.md :!duck build
augroup END
```

としておいて保存時に呼ぶようにしてみた。

```toml
# Duck.toml
[generate]
cwd = 'build'
command = ['cmake', '..', '-G', 'Unix Makefiles']

[build]
depends = ['generate']
cwd = 'build'
command = ['make']
```

`duck build`

のように呼ぶ。

## vimのカレントフォルダ問題

親フォルダを遡って設定を探しに行くというのが重要です。例えば `vim` でサブフォルダのファイルを編集しているときに、親フォルダの `Makefile` でビルドしたい場合がある。このときに、`vim` のカレントフォルダを考慮するのが無理なのです。
そういうわけで `vim` では単純に `autocd` して、カレントフォルダを意識しないことにしました。
代わりにツール側で親フォルダに遡れるようにして、そのツールがプロジェクトのルートから指定のコマンドを呼び出すのです。

* make を呼ぶ
* cmake を呼ぶ
* dub を呼ぶ
* setup.py を呼ぶ
* MSBuild を呼ぶ

などのように、言語毎に専門のツールを呼ぶ補助的なツールです。

特定の `LSP` (D言語向けの `dls` ) がカレントフォルダをプロジェクトルートに移動してから起動しないといけないなどの癖があるようなので、その辺を吸収させるのも狙っている。

## WindowsでCMakeをどうやって見つけるのか

`unix` 的なシステムでは、`/usr/bin/cmake` であろうことが期待できるのだけど、
`Windows` ではそうはいかない。でも最近の `VisualStudio` がインストールされていれば、その中に `cmake` が入っている。だから `Program Files` から決め打ちで探してくるという方法があるのだけど、もう一歩進めて `VisualStudio` のインストールパスを `registry` から取ってくるという手法がある。しかし、たくさんのバージョンとエディションで少しずつ違うのでやってられない。で、これに対応するツールとして `vswhere` というツールがある。たぶん、[vcpkg](https://github.com/Microsoft/vcpkg)のために作られたのだと思うのだけど、これでインストールされている `VisualStudio` の情報を得ることができる。まだ、 `vswhere` をどうやって得るのか問題があるのだが、小さいので自分のプロジェクトに入れておくとか、ダウンロードするとか、 `VisualStudio` に入っているので決め打ちでパスを探すといったことになろうと思う。

要するに `vc` が入っている環境では、9割くらいの確率で `cmake` を発見できます。
`duck` にもこの機能を入れようとしている。

https://github.com/ChaosinaCan/pyvswhere

