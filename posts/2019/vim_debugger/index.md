+++
date = 2019-04-27T19:00:26+09:00
tags = ['vim', 'dap']
title = 'vim で DebugAdapterProtocol する'
+++


vimで `breakpoint` を設置してステップ実行できるようなデバッガを調べた。

# vim 上のデバッガ
## lldb.nvim

* https://github.com/dbgx/lldb.nvim

## vim-vebugger

* https://github.com/idanarye/vim-vebugger

なんか動きそうなのだが、 `vimproc` を使っていたので動かせなかった
kaoriya 版の Vim を使うなどしてみたがよくわからず。

## pyclewn 

* https://github.com/Mistobaan/pyclewn

gdb と pdb のvimフロントエンド？

## pubd

pythonのpdb.

* https://github.com/inducer/pudb

## vim-breakpts 

vim スクリプト用？

* https://github.com/albfan/vim-breakpts

## vimspector

* https://github.com/puremourning/vimspector

VSCodeの `DebugAdapterProtocol` を使うものらしい。

> While Language Server Protocol is well known, the Debug Adapter Protocol is less well known, but achieves a similar goal: language agnostic API abstracting debuggers from clients.

動かし方よくわからず。

# DebugAdapterProtocol

* [DebugAdapterProtocol](https://code.visualstudio.com/blogs/2018/08/07/debug-adapter-protocol-website)
    * [旧サイト・リポジトリ](https://github.com/Microsoft/vscode-debugadapter-node)

読む。

> The "deep understanding of a language" is surfaced by the Language Server Protocol (LSP) and the "debugging support" by the Debug Adapter Protocol (DAP).

```
editor <=> adapter <=> gdb
              ||
              ++=====> pdb
```

adapterでラップして同じに見えるようにする。

adapterの起動設定は、 `.vscode/launch.json` にというわけか。

> The Debug Adapter Protocol is not tied to VS Code and can be used as the foundation for a generic debugger UI in other development tools.

新サイトで仕様を公開していくで、って書いてあるね。

* 新サイト https://microsoft.github.io/debug-adapter-protocol/
    * 新リポジトリ https://github.com/Microsoft/debug-adapter-protocol

読む。

* https://microsoft.github.io/debug-adapter-protocol/overview

> single session mode: in this mode, the development tool starts a debug adapter as a standalone process and communicates with it through stdin and stdout.

> multi session mode: in this mode, the development tool does not start the debug adapter but assumes that it is already running and that it listens on a specific port for connections attempts.

## DAPの仕様

* https://microsoft.github.io/debug-adapter-protocol/specification

## DAPの実装

* https://microsoft.github.io/debug-adapter-protocol/implementors/adapters/

ネイティブコンパイルするタイプは言語ごとではなく、ネイティブコンパイルの様式ごとに違うものになる。例えば、 `vc` , `gcc` , `llvm` のように。

となるとVMタイプのものは、 `.Net`, `Mono`, `java` といった分類になるのだろうか。
`C#`, `F#` が両方デバッグできたりしそうではある。

インタープリター型はそれぞれの言語ごとになる。

あとは、リモートデバッグの事情を調べる。

### native debug

c++やd, rustなんかのnativeコードを出力するものをまとめて面倒見れるという理解であったいるのかな。ビルド形式とデバッグビルドに付加される情報のフォーマットに対応してデバッガを選択する必要があると。

* https://github.com/Microsoft/vscode-cpptools

LLVM

* https://github.com/vadimcn/vscode-lldb

### .Net

> Mono debugging is not supported.

ILは互換性があるにしても、VMのデバッグインタフェースは互換性が無いということなのかな。

* https://github.com/OmniSharp/omnisharp-vscode

### Mono

* https://github.com/Microsoft/vscode-mono-debug

### Unity

* https://github.com/Unity-Technologies/vscode-unity-debug

UnityEditorにアタッチできるらしい。
Unity版のMonoにアタッチできるということかしら。

### lua / ravi

* https://github.com/dibyendumajumdar/ravi-vscode-debugger

こんなのあるのか・・・

### powershell

* https://github.com/PowerShell/vscode-powershell

### python

* https://github.com/Microsoft/vscode-python

# vimspectorの実装

* https://github.com/puremourning/vimspector

読む。

`.\install_gadget.py`

を実行することで、 `VSCode` の `extension` を `download` する。
`extension` に、 `DAP` が含まれているのでこれを使う。


`autoload/vimspector.vim`

```vim
function! vimspector#Launch() abort
  py3 _vimspector_session.Start()
endfunction
```

`python3/vimspector/debug_session.py`

```py
class DebugSession:
  def Start():
    pass

```

`vim.bindeval` を使っているので、 `vim8` 専用。
`nvim` では回避する必要がある。

`.vimspector.json` 

```json
{
    "adapters": {
    },
    "configurations": {
    }
}
```

の `configurations` からデバッグセッションの起動方法を取得して、
デバッグアダプターを `vim` の `job` か `channel` 経由で起動する。
`configurations` が `.vscode/launch.json` に相当するようだ。
`adapters` は、インストールされている `DebugAdapter` のリスト。

`call vimspector#Launch()` `simple_python - launch` `/Users/ousttrue` と入力することでjobが、アダプター開始するところまでできた。
しかし、アダプターがすぐに死んでいる様子。

アダプターを手動起動してみる。

`node .\.vscode\extensions\ms-python.python-2019.4.11987\out\client\debugger\debugAdapter\main.js`

`.vimspector.json` に書いてあるのとバージョンが違う。
`file not found` か。

`path` をなおしたら動いた😃

```
-          "$HOME/.vscode/extensions/ms-python.python-2018.4.0/out/client/debugger/Main.js"
+          "$HOME/.vscode/extensions/ms-python.python-2019.4.11987/out/client/debugger/debugAdapter/Main.js"
```

`neovim` の `rplugin` での構成を考えてみようか。

# python3 で Adapter を起動してみる

`AdapterAdapter` というか `AdapterBridge` という感じになりそうだけど、
`vim` で込み入った実装をするのは手に余るので、可能な限り `python` で事を進めよう。
pythonでprotocl実験。

https://github.com/ousttrue/daplauncher

* http://pydev.blogspot.com/2018/05/howto-launch-and-debug-in-vscode-using.html
* https://vscode-docs.readthedocs.io/en/stable/extensions/example-debuggers/
* https://vscode-docs.readthedocs.io/en/stable/extensionAPI/api-debugging/

launchRequestの後で固まると思ったら、サイトに記述されていないパラメーターがあった。
`console` どこに書いてあるのか・・・

https://github.com/Microsoft/vscode-debugadapter-node/blob/master/debugProtocol.json

https://github.com/Microsoft/vscode-python/issues/3762

わかった。

https://github.com/Microsoft/vscode-go/issues/219

vscodeの `.vscode/launch.json` の起動設定を `launch` の引数に合体するのだ。

https://code.visualstudio.com/Docs/editor/debugging#_launchjson-attributes

書いとけよー。
