---
title: "Windows Creators UPDATEが来たしWSL環境を整備"
date: 2017-04-14
Tags: ['linux', 'wsl']
---

Windows SubSystem for Linux
わりとよくなっていそうな感じなので使ってみる。

wsltty導入
minttyにwslビルド(wslbridge同梱)という素敵インストーラが提供されていた。
インストーラーを実行したらショートカットができる。片方のショートカットの末尾に”–login”を追加して、”~/.profile”が実行されるようにした。
%LOCALAPPDATA%\wsltty\bin\mintty.exe --wsl -o Locale=C -o Charset=UTF-8 /bin/wslbridge -C~ -t /bin/bash --login


https://github.com/mintty/wsltty

.profile
コメントイン
umask 022

inputrc
"\C-n":history-search-forward
"\C-p":history-search-backward
set bell-style none

.tmux.conf
set -g prefix C-l
bind C-l send-prefix
unbind C-b
set -sg escape-time 1
bind r source-file ~/.tmux.conf \; display "Reloaded!"

set-option -g default-terminal screen-256color
set -g terminal-overrides 'xterm:colors=256'

setw -g mode-keys vi

vim

dein.vimによるプラグイン管理のマイベストプラクティス

dein
$ curl https://raw.githubusercontent.com/Shougo/dein.vim/master/bin/installer.sh > installer.sh
$ sh installer.sh ~/.cache/dein
$ mkdir -p ~/.config/nvim

~/.config/nvim/dein.toml
[[plugins]]
repo = 'Shougo/dein.vim'

[[plugins]] # カーソル位置のコンテキストに合わせてftを切り替える
repo = 'osyo-manga/vim-precious'
depends = ['context_filetype.vim']

[[plugins]] # カーソル位置のコンテキストのftを判定するライブラリ
repo = 'Shougo/context_filetype.vim'

[[plugins]] # toml syntax
repo = 'cespare/vim-toml'
on_ft = 'toml'

[[plugins]] # カラースキーマ
repo = 'w0ng/vim-hybrid'
hook_add = '''
set background=dark
" colorscheme 設定は source 後に行う必要があるので VimEnter で行う。
" 但し Colorscheme イベントの発生が抑制されないよう nented を付ける。
au MyAutoCmd VimEnter * nested colorscheme hybrid
'''

[[plugins]]
repo = 'itchyny/lightline.vim'

[[plugins]]
repo = 'scrooloose/nerdtree'

.vimrc
if !&compatible
  set nocompatible
endif

" reset augroup
augroup MyAutoCmd
  autocmd!
augroup END

" dein settings {{{
" dein自体の自動インストール
let s:cache_home = empty($XDG_CACHE_HOME) ? expand('~/.cache') : $XDG_CACHE_HOME
let s:dein_dir = s:cache_home . '/dein'
let s:dein_repo_dir = s:dein_dir . '/repos/github.com/Shougo/dein.vim'
if !isdirectory(s:dein_repo_dir)
  call system('git clone https://github.com/Shougo/dein.vim ' . shellescape(s:dein_repo_dir))
endif
let &runtimepath = s:dein_repo_dir .",". &runtimepath
" プラグイン読み込み＆キャッシュ作成
"let s:toml_file = fnamemodify(expand('<sfile>'), ':h').'/dein.toml'
let s:toml_file = '~/.config/nvim'.'/dein.toml'
if dein#load_state(s:dein_dir)
  call dein#begin(s:dein_dir)
  call dein#load_toml(s:toml_file)
  call dein#end()
  call dein#save_state()
endif
" 不足プラグインの自動インストール
if has('vim_starting') && dein#check_install()
  call dein#install()
endif
" }}}

"ビープ音すべてを無効にする
syntax on
filetype on
set visualbell t_vb=
set noerrorbells "エラーメッセージの表示時にビープを鳴らさない
set laststatus=2
set noswapfile nobackup noundofile
set hidden

golang
binaryをdownloadして/usr/local/goに展開
nvm

https://github.com/creationix/nvm

