"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5071],{2866:function(e,n,t){t.r(n),t.d(n,{default:function(){return o}});var l=t(1151),r=t(7294);function c(e){const n=Object.assign({h2:"h2",p:"p",h3:"h3",ul:"ul",li:"li",h4:"h4",pre:"pre",code:"code",a:"a"},(0,l.ah)(),e.components);return r.createElement(r.Fragment,null,r.createElement(n.h2,null,"vim lsp client"),"\n",r.createElement(n.p,null,"vimのlspクライアント。"),"\n",r.createElement(n.h3,null,"vim-lsp"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"https://github.com/prabirshrestha/vim-lsp"),"\n"),"\n",r.createElement(n.h4,null,"vim-lsp解読"),"\n",r.createElement(n.p,null,"plugin/lsp.vim"),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-vim"},"if g:lsp_auto_enable\n    augroup lsp_auto_enable\n        autocmd!\n        autocmd VimEnter * call lsp#enable()\n    augroup END\nendif\n")),"\n",r.createElement(n.p,null,"autoload/lsp.vim"),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-vim"},"function! lsp#enable() abort\n    call s:register_events()\nendfunction\n\nfunction! s:register_events() abort\n    call s:on_text_document_did_open()\nendfunction\n\nfunction! s:on_text_document_did_open() abort\nendfunction\n\n\" lspサーバの初期化をするぽい\n\" server_nameは 'pyls'など\nfunction! s:ensure_flush(buf, server_name, cb) abort\nendfunction\n\n\" lspサーバープロセスを起動して、stdin, stdout, stderrを接続する\nfunction! s:lsp_start(opts) abort\n\n    let l:lsp_id = lsp#client#start({\n        \\ 'cmd': l:cmd,\n        \\ 'on_stderr': function('s:on_stderr', [a:server_name]),\n        \\ 'on_exit': function('s:on_exit', [a:server_name]),\n        \\ 'on_notification': function('s:on_notification', [a:server_name]),\n        \\ 'on_request': function('s:on_request', [a:server_name]),\n        \\ })\n\nendfunction\n")),"\n",r.createElement(n.p,null,r.createElement(n.code,null,"autoload/lsp/client.vim")),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-vim"},"function! s:lsp_start(opts) abort\n    \" async.vim ライブラリに移る\n    let l:client_id = async#job#start(a:opts.cmd, {\n        \\ 'on_stdout': function('s:on_stdout'),\n        \\ 'on_stderr': function('s:on_stderr'),\n        \\ 'on_exit': function('s:on_exit'),\n        \\ })\nendfunction\n\n\" stdout を on_notification と on_request に切り出す\nfunction! s:on_stdout(id, data, event) abort\nendfunction\n")),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"https://github.com/prabirshrestha/async.vim"),"\n"),"\n",r.createElement(n.p,null,r.createElement(n.code,null,"autoload/async/job.vim")," ファイル一個だけだった。"),"\n",r.createElement(n.p,null,r.createElement(n.code,null,"vim")," と ",r.createElement(n.code,null,"nvim")," の違いをラップしているぽい。"),"\n",r.createElement(n.p,null,r.createElement(n.code,null,"vim")," の ",r.createElement(n.code,null,"job_start")," と ",r.createElement(n.code,null,"nvim")," の ",r.createElement(n.code,null,"jobstart"),"。\nなるほど。"),"\n",r.createElement(n.h4,null,"vim-lspの動きを追う(dls)"),"\n",r.createElement(n.p,null,r.createElement(n.a,{href:"https://github.com/d-language-server/dls"},"dls")," だと"),"\n",r.createElement(n.p,null,"ServerCapabilities"),"\n",r.createElement(n.p,null,"に"),"\n",r.createElement(n.p,null,"definitionProvider"),"\n",r.createElement(n.p,null,"が入ってないな・・・"),"\n",r.createElement(n.p,null,"Requestにそもそも入っていないのでは"),"\n",r.createElement(n.p,null,"入れてみた。"),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-vim"},"        autocmd User lsp_setup call lsp#register_server({\n                    \\ 'name': 'd',\n                    \\ 'cmd': {server_info->['root_dls']},\n                    \"\\ 'cmd': {server_info->['dub', 'run', '-q', 'serve-d']},\n                    \\ 'root_uri': {server_info->lsp#utils#path_to_uri(lsp#utils#find_nearest_parent_file_directory(lsp#utils#get_buffer_path(), 'dub.json'))},\n                    \\ 'whitelist': ['d'],\n                    \\ 'capabilities': {\n                    \\   'workspace': {\n                    \\       'applyEdit': v:true\n                    \\   },\n                    \\   'textDocument': { \" これ\n                    \\       'definition': {\n                    \\         'dynamicRegistration': v:true\n                    \\     }\n                    \\   }\n                    \\ }\n                    \\ })\n")),"\n",r.createElement(n.p,null,"実際に通信するようになた。"),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-json"},'["---\x3e", 3, "d", {"method": "textDocument/definition", "on_notification": "---funcref---", "params": {"textDocument": {"uri": "file:///home/ousttrue/work/d_hello/source/app.d"}, "position": {"character": 4, "line": 14}}}]\n')),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-json"},'["<---", 3, "d", {"response": {"id": 7, "jsonrpc": "2.0", "result": []}, "request": {"id": 7, "jsonrpc": "2.0", "method": "textDocument/definition", "params": {"textDocument": {"uri": "file:///home/ousttrue/work/d_hello/source/app.d"}, "position": {"character": 4, "line": 14}}}}]\n')),"\n",r.createElement(n.p,null,"エラーが ",r.createElement(n.code,null,"Definition not found")," に変わって\n確かに、 ",r.createElement(n.code,null,"result")," の中身が空っぽなので ",r.createElement(n.code,null,"not found")," とサーバーが応答している。"),"\n",r.createElement(n.p,null,"問題が ",r.createElement(n.code,null,"vim-lsp")," から ",r.createElement(n.code,null,"dls")," に移った。"),"\n",r.createElement(n.h3,null,"ale"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"https://github.com/w0rp/ale"),"\n"),"\n",r.createElement(n.h3,null,"LanguageClient"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"https://github.com/autozimu/LanguageClient-neovim"),"\n"),"\n",r.createElement(n.p,null,"一部が ",r.createElement(n.code,null,"rust")," で実装されているぽい。"),"\n",r.createElement(n.h3,null,"vim-lsp"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"https://www.kieranbamforth.me/blog/vim-lsp.html"),"\n"),"\n",r.createElement(n.h3,null,"built-in"),"\n",r.createElement(n.p,null,"まだ、実装中？"),"\n",r.createElement(n.h2,null,"Language Server Protocol"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"https://microsoft.github.io/language-server-protocol/specification"),"\n"),"\n",r.createElement(n.p,null,r.createElement(n.code,null,"version 3.x")),"\n",r.createElement(n.p,null,"https://github.com/Microsoft/language-server-protocol/blob/master/versions/protocol-2-x.md"),"\n",r.createElement(n.h3,null,"通信シーケンス"),"\n",r.createElement(n.h4,null,r.createElement(n.code,null,"<-- request1 initialize")),"\n",r.createElement(n.h4,null,r.createElement(n.code,null,"--\x3e response1")),"\n",r.createElement(n.h4,null,r.createElement(n.code,null,"<-- notify initialized")),"\n",r.createElement(n.h4,null,r.createElement(n.code,null,"<-- notify textDocument/didOpen")),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-vim"},"autocmd FileType * call wf#lsp#setFileType()\n")),"\n",r.createElement(n.h4,null,r.createElement(n.code,null,"<-- notify textDocument/didChange")),"\n",r.createElement(n.h4,null,r.createElement(n.code,null,"--\x3e notify textDocument/publishDiagnostics")),"\n",r.createElement(n.h4,null,r.createElement(n.code,null,"<-- request2 textDocument/documentHighlight")),"\n",r.createElement(n.h4,null,r.createElement(n.code,null,"--\x3e response2")),"\n",r.createElement(n.h2,null,"log viewer"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"\n",r.createElement(n.p,null,"https://github.com/Microsoft/language-server-protocol-inspector"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"https://microsoft.github.io/language-server-protocol/inspector/"),"\n"),"\n"),"\n",r.createElement(n.li,null,"\n",r.createElement(n.p,null,r.createElement(n.a,{href:"https://qiita.com/Rockdoor/items/f5dca558bbc843d8f334"},"VSCode 用 SystemVerilogの拡張を作る（#7）")),"\n"),"\n",r.createElement(n.li,null,"\n",r.createElement(n.p,null,"VSCodeでlsp を実行させて通信ログを出力"),"\n"),"\n",r.createElement(n.li,null,"\n",r.createElement(n.p,null,"通信ログを見やすく表示"),"\n"),"\n"),"\n",r.createElement(n.p,null,"しかし、どうやってログを作るかよくわからん。\n",r.createElement(n.code,null,"vim-lsp")," のログを改造して作ってみる。"),"\n",r.createElement(n.h2,null,"各言語のサーバー"),"\n",r.createElement(n.p,null,"試してみたやつ。"),"\n",r.createElement(n.h3,null,"python"),"\n",r.createElement(n.h4,null,"pyls"),"\n",r.createElement(n.p,null,"Linux, Windows 共に動いた。"),"\n",r.createElement(n.h3,null,"dlang"),"\n",r.createElement(n.h4,null,"serve-d"),"\n",r.createElement(n.p,null,"うまくいかなかったので、調べている・・・"),"\n",r.createElement(n.h4,null,"dls"),"\n",r.createElement(n.p,null,"うまくいかなかったので、調べている・・・"),"\n",r.createElement(n.h3,null,"c++"),"\n",r.createElement(n.p,null,"Linuxで動いた。"),"\n",r.createElement(n.h4,null,"cquery"))}var a=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?r.createElement(n,e,r.createElement(c,e)):c(e)};t(8678);function u(e){let{data:n,children:t}=e;return r.createElement(r.Fragment,null,r.createElement("h1",null,n.mdx.frontmatter.title),r.createElement(l.Zo,null,t))}function o(e){return r.createElement(u,e,r.createElement(a,e))}},8678:function(e,n,t){t(7294)},1151:function(e,n,t){t.d(n,{Zo:function(){return u},ah:function(){return c}});var l=t(7294);const r=l.createContext({});function c(e){const n=l.useContext(r);return l.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const a={};function u({components:e,children:n,disableParentContext:t}){let u;return u=t?"function"==typeof e?e({}):e||a:c(e),l.createElement(r.Provider,{value:u},n)}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2019-vim-lsp-md-d7a2f65f008b75b0af9c.js.map