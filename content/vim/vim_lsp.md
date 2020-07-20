---
Title: vim で LSP
Published: 2019-04-20T01:32:35+09:00
Tags: ['vim', 'lsp']
---

## vim lsp client

vimのlspクライアント。

### vim-lsp

* https://github.com/prabirshrestha/vim-lsp

#### vim-lsp解読

plugin/lsp.vim

```vim
if g:lsp_auto_enable
    augroup lsp_auto_enable
        autocmd!
        autocmd VimEnter * call lsp#enable()
    augroup END
endif
```

autoload/lsp.vim

```vim
function! lsp#enable() abort
    call s:register_events()
endfunction

function! s:register_events() abort
    call s:on_text_document_did_open()
endfunction

function! s:on_text_document_did_open() abort
endfunction

" lspサーバの初期化をするぽい
" server_nameは 'pyls'など
function! s:ensure_flush(buf, server_name, cb) abort
endfunction

" lspサーバープロセスを起動して、stdin, stdout, stderrを接続する
function! s:lsp_start(opts) abort

    let l:lsp_id = lsp#client#start({
        \ 'cmd': l:cmd,
        \ 'on_stderr': function('s:on_stderr', [a:server_name]),
        \ 'on_exit': function('s:on_exit', [a:server_name]),
        \ 'on_notification': function('s:on_notification', [a:server_name]),
        \ 'on_request': function('s:on_request', [a:server_name]),
        \ })

endfunction
```

`autoload/lsp/client.vim`

```vim
function! s:lsp_start(opts) abort
    " async.vim ライブラリに移る
    let l:client_id = async#job#start(a:opts.cmd, {
        \ 'on_stdout': function('s:on_stdout'),
        \ 'on_stderr': function('s:on_stderr'),
        \ 'on_exit': function('s:on_exit'),
        \ })
endfunction

" stdout を on_notification と on_request に切り出す
function! s:on_stdout(id, data, event) abort
endfunction
```

* https://github.com/prabirshrestha/async.vim

`autoload/async/job.vim` ファイル一個だけだった。

`vim` と `nvim` の違いをラップしているぽい。

`vim` の `job_start` と `nvim` の `jobstart`。
なるほど。

#### vim-lspの動きを追う(dls)

[dls](https://github.com/d-language-server/dls) だと

ServerCapabilities 

に

definitionProvider

が入ってないな・・・

Requestにそもそも入っていないのでは

入れてみた。

```vim
        autocmd User lsp_setup call lsp#register_server({
                    \ 'name': 'd',
                    \ 'cmd': {server_info->['root_dls']},
                    "\ 'cmd': {server_info->['dub', 'run', '-q', 'serve-d']},
                    \ 'root_uri': {server_info->lsp#utils#path_to_uri(lsp#utils#find_nearest_parent_file_directory(lsp#utils#get_buffer_path(), 'dub.json'))},
                    \ 'whitelist': ['d'],
                    \ 'capabilities': {
                    \   'workspace': {
                    \       'applyEdit': v:true
                    \   },
                    \   'textDocument': { " これ
                    \       'definition': {
                    \         'dynamicRegistration': v:true
                    \     }
                    \   }
                    \ }
                    \ })
```

実際に通信するようになた。

```json
["--->", 3, "d", {"method": "textDocument/definition", "on_notification": "---funcref---", "params": {"textDocument": {"uri": "file:///home/ousttrue/work/d_hello/source/app.d"}, "position": {"character": 4, "line": 14}}}]
```

```json
["<---", 3, "d", {"response": {"id": 7, "jsonrpc": "2.0", "result": []}, "request": {"id": 7, "jsonrpc": "2.0", "method": "textDocument/definition", "params": {"textDocument": {"uri": "file:///home/ousttrue/work/d_hello/source/app.d"}, "position": {"character": 4, "line": 14}}}}]
```

エラーが `Definition not found` に変わって
確かに、 `result` の中身が空っぽなので `not found` とサーバーが応答している。

問題が `vim-lsp` から `dls` に移った。

### ale

* https://github.com/w0rp/ale

### LanguageClient

* https://github.com/autozimu/LanguageClient-neovim

一部が `rust` で実装されているぽい。

### vim-lsp

* https://www.kieranbamforth.me/blog/vim-lsp.html

### built-in

まだ、実装中？

## Language Server Protocol

* https://microsoft.github.io/language-server-protocol/specification

`version 3.x`

https://github.com/Microsoft/language-server-protocol/blob/master/versions/protocol-2-x.md

### 通信シーケンス

#### `<-- request1 initialize`
#### `--> response1`
#### `<-- notify initialized`
#### `<-- notify textDocument/didOpen`

```vim
autocmd FileType * call wf#lsp#setFileType()
```

#### `<-- notify textDocument/didChange`

#### `--> notify textDocument/publishDiagnostics`

#### `<-- request2 textDocument/documentHighlight`
#### `--> response2`

## log viewer

* https://github.com/Microsoft/language-server-protocol-inspector
    * https://microsoft.github.io/language-server-protocol/inspector/

* [VSCode 用 SystemVerilogの拡張を作る（#7）](https://qiita.com/Rockdoor/items/f5dca558bbc843d8f334)

* VSCodeでlsp を実行させて通信ログを出力
* 通信ログを見やすく表示

しかし、どうやってログを作るかよくわからん。
`vim-lsp` のログを改造して作ってみる。

## 各言語のサーバー

試してみたやつ。

### python

#### pyls

Linux, Windows 共に動いた。

### dlang

#### serve-d

うまくいかなかったので、調べている・・・

#### dls

うまくいかなかったので、調べている・・・

### c++

Linuxで動いた。

#### cquery

