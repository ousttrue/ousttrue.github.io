+++
date = 2019-04-28T03:17:07+09:00
taxonomies.tags = ['vim', 'python']
title = 'vim の python plugin 関連'
+++

phthon2は使わないのでスルーで。

## vim組み込み

```python
import vim
```

### `PLUGIN_ROOT/python3` パス

モジュールとして自動で `import` されるぽい。
リロードは？
開発不便なのでは。

### py3file コマンド

`so%` などを経由してリロードできる。

### py3 コマンド

インポート済みの関数呼び出しなど短い処理にとどめた方がよいと思う。

## リモートプラグイン
`nvim` の機能で `msgpack-rpc` を通した別プロセスでの実行。

vim8 への移植版。 https://github.com/roxma/nvim-yarp

### `PLUGIN_ROOT/rplugin/python3`

```python
import neovim # msgpack-rpc で vim と通信する


@neovim.plugin
class RemotePlugin:

    def __init__(self, nvim):
        self.nvim = nvim

    @neovim.command('HogeCommand') # vimのコマンドとして実行可能になる
    def hogee(self):
        pass
```

## 比べてみると

`vim` もしくは `neovim` とやり取りする部分は、単体実行ができないような。
なるほど。

```
GUIやVIM
+--------+     これを単体で開発する
|vim     |     +--------------+
|もしくは|---->|使うモジュール|
|neovim  |     +--------------+
|をimport|
+--------+
```

## リモートプラグイン(GUI)

これは、`msgpack-rpc` を使うのだけど `GUI` から `nvim` を特定の作法で起動して `GUIイベントを受け取る` というものでちょっと違う。

