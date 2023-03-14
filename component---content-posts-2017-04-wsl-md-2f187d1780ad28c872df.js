"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4528],{525:function(n,e,t){t.r(e);var i=t(1151),o=t(7294);function s(n){const e=Object.assign({p:"p",pre:"pre",code:"code"},(0,i.ah)(),n.components);return o.createElement(o.Fragment,null,o.createElement(e.p,null,"Windows SubSystem for Linux\nわりとよくなっていそうな感じなので使ってみる。"),"\n",o.createElement(e.pre,null,o.createElement(e.code,null,"wsltty導入\nminttyにwslビルド(wslbridge同梱)という素敵インストーラが提供されていた。\nインストーラーを実行したらショートカットができる。片方のショートカットの末尾に”–login”を追加して、”~/.profile”が実行されるようにした。\n%LOCALAPPDATA%\\wsltty\\bin\\mintty.exe --wsl -o Locale=C -o Charset=UTF-8 /bin/wslbridge -C~ -t /bin/bash --login\n\n\nhttps://github.com/mintty/wsltty\n\n.profile\nコメントイン\numask 022\n\ninputrc\n\"\\C-n\":history-search-forward\n\"\\C-p\":history-search-backward\nset bell-style none\n\n.tmux.conf\nset -g prefix C-l\nbind C-l send-prefix\nunbind C-b\nset -sg escape-time 1\nbind r source-file ~/.tmux.conf \\; display \"Reloaded!\"\n\nset-option -g default-terminal screen-256color\nset -g terminal-overrides 'xterm:colors=256'\n\nsetw -g mode-keys vi\n\nvim\n\ndein.vimによるプラグイン管理のマイベストプラクティス\n\ndein\n$ curl https://raw.githubusercontent.com/Shougo/dein.vim/master/bin/installer.sh > installer.sh\n$ sh installer.sh ~/.cache/dein\n$ mkdir -p ~/.config/nvim\n\n~/.config/nvim/dein.toml\n[[plugins]]\nrepo = 'Shougo/dein.vim'\n\n[[plugins]] # カーソル位置のコンテキストに合わせてftを切り替える\nrepo = 'osyo-manga/vim-precious'\ndepends = ['context_filetype.vim']\n\n[[plugins]] # カーソル位置のコンテキストのftを判定するライブラリ\nrepo = 'Shougo/context_filetype.vim'\n\n[[plugins]] # toml syntax\nrepo = 'cespare/vim-toml'\non_ft = 'toml'\n\n[[plugins]] # カラースキーマ\nrepo = 'w0ng/vim-hybrid'\nhook_add = '''\nset background=dark\n\" colorscheme 設定は source 後に行う必要があるので VimEnter で行う。\n\" 但し Colorscheme イベントの発生が抑制されないよう nented を付ける。\nau MyAutoCmd VimEnter * nested colorscheme hybrid\n'''\n\n[[plugins]]\nrepo = 'itchyny/lightline.vim'\n\n[[plugins]]\nrepo = 'scrooloose/nerdtree'\n\n.vimrc\nif !&compatible\n  set nocompatible\nendif\n\n\" reset augroup\naugroup MyAutoCmd\n  autocmd!\naugroup END\n\n\" dein settings {{{\n\" dein自体の自動インストール\nlet s:cache_home = empty($XDG_CACHE_HOME) ? expand('~/.cache') : $XDG_CACHE_HOME\nlet s:dein_dir = s:cache_home . '/dein'\nlet s:dein_repo_dir = s:dein_dir . '/repos/github.com/Shougo/dein.vim'\nif !isdirectory(s:dein_repo_dir)\n  call system('git clone https://github.com/Shougo/dein.vim ' . shellescape(s:dein_repo_dir))\nendif\nlet &runtimepath = s:dein_repo_dir .\",\". &runtimepath\n\" プラグイン読み込み＆キャッシュ作成\n\"let s:toml_file = fnamemodify(expand('<sfile>'), ':h').'/dein.toml'\nlet s:toml_file = '~/.config/nvim'.'/dein.toml'\nif dein#load_state(s:dein_dir)\n  call dein#begin(s:dein_dir)\n  call dein#load_toml(s:toml_file)\n  call dein#end()\n  call dein#save_state()\nendif\n\" 不足プラグインの自動インストール\nif has('vim_starting') && dein#check_install()\n  call dein#install()\nendif\n\" }}}\n\n\"ビープ音すべてを無効にする\nsyntax on\nfiletype on\nset visualbell t_vb=\nset noerrorbells \"エラーメッセージの表示時にビープを鳴らさない\nset laststatus=2\nset noswapfile nobackup noundofile\nset hidden\n\ngolang\nbinaryをdownloadして/usr/local/goに展開\nnvm\n\nhttps://github.com/creationix/nvm\n")))}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,i.ah)(),n.components);return e?o.createElement(e,n,o.createElement(s,n)):s(n)}},1151:function(n,e,t){t.d(e,{ah:function(){return s}});var i=t(7294);const o=i.createContext({});function s(n){const e=i.useContext(o);return i.useMemo((()=>"function"==typeof n?n(e):{...e,...n}),[e,n])}}}]);
//# sourceMappingURL=component---content-posts-2017-04-wsl-md-2f187d1780ad28c872df.js.map