+++
title = "lua の DebugAdapter を書いてみた"
date = 2021-07-13
tags = ["lua", "dap"]
+++


nvim の nvim-dap で lua をデバッグするべく自分で書いてみた。
手頃なのが見つからなかったので。

<https://github.com/ousttrue/my_nvim/blob/master/luada.lua>

<https://microsoft.github.io/debug-adapter-protocol/> の自前実装。

`request` のうち `initialize`, `launch`, `setBreakpoints`, `configurationDone`, `threads`, `stackTrace`, `scopes`, `variables`, `continue`, `next` を実装した。
`event` のうち `initialized`, `exited`, `stopped(breakpoint, step)` を実装した。

これで最低限の breakpoint を設定して止める、ステップ実行、変数表示までできた。

ログレベルを設定して

```lua
require('dap').set_log_level('trace')
```

nvim の `:lua print(vim.fn.stdpath "cache")` に配置される `dap.log` を観察したらだいたいできた。

nvim-dap の設定は以下。

```lua
local dap = require("dap")

local luada = vim.api.nvim_get_var("my_nvim_root") .. "/luada.lua"

-- luada adapter を登録
dap.adapters.luada = {
	-- debug用のスクリプトを lua で実行し、標準入出力で DAP 通信(JSON-RPC)を開始する
	type = "executable",
	command = vim.api.nvim_get_var("my_nvim_root") .. "/neovim/.deps/usr/bin/luajit.exe",
	args = { luada },
}
-- filetype lua のときに luada を使用する。launch の引数
dap.configurations.lua = {
	{
		name = "lua debug adapter",
		type = "luada",
		request = "launch",
		program = "${fileDirname}\\${file}",
		args = { "a", "b", "c" },
	},
}
```

```
+---------+    DAP       +--------------------+
| nvim dap|------->stdin |luajit.exe luada.lua|
|         |<-------stdout|                    |
+---------+              +--------------------+
                                              +==> loadscript(target_lua_script)
```

入出力を DAP で占有してしまうので、それでも大丈夫なスクリプトしかデバッグできない。
(print 関数は、stderr に出力するように退避したので、`dap.log` には出る)

素の standalone の lua interpreter で簡単にできる範囲で実装する方針。

## はまりポイント
### Windows 版 は、`io.stdout` で `CR` が `CRLF` に変換されるのを回避できない。

```c++
setmode(_fileno(stdout),_O_BINARY);
```

を lua で呼び出す手段が無い。

```
Content-Leght: 123\n\n
```

と出力して変換されるのに任せることにした。

### debug.sethook 内で coroutine.yield できない

<https://stackoverflow.com/questions/54858455/lua-debug-hooks-seems-to-prevent-the-coroutine-from-working>

breakpoint 等によるスクリプト中断を `coroutine.yield` で実装しようとしたのだけど断念した。
(yield すると `suspend` にならずに `dead` になる)

<https://github.com/tomblind/local-lua-debugger-vscode> は、coroutine で実装しているような気がするのだが・・・。

yield する代わりに main.loop をネストさせてそこで通信待機させることにした、

### launch で開始すると早すぎる

これは、 `nvim-dap` の実装の問題のような気がするが、
capabilities に以下を設定して、 `configurationDone` リクエストで自開始する。

```lua
supportsConfigurationDoneRequest = true,
```

## ToDo

luada リポジトリを作って vscode 拡張としてリリースする。

