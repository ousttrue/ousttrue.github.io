---
title: "vim環境整備"
date: 2013-11-28
taxonomies: {tags: []}
---

vim環境整備
Windows8でコーディングができるようにvim回りを整備する。
コマンドライン環境としてPowerShellを採用してそこからvim(gvim)する方向性。
前の日記を整理して書き直し。
PowerShellを使えるようにしてvimとgitをインストールする
PowerShellを管理者権限で実行して以下のように実行する。
powershell> Set-ExecutionPolicy RemoteSigned

パッケージ管理として Chocolatey
をインストール。dos窓で以下のように実行する。
dos> @powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%systemdrive%\chocolatey\bin

powershellの設定ファイル作成する。shellの.profileに相当するファイル。

C:/Users/_USER_NAME_/Documents/WindowsPowerShell/Microsoft.PowerShell_profile.ps1

とりあえずwhichコマンド的な関数を書いておく
function which([string] $command=$(throw "need command name")){
    $Env:Path.Split(";") | %{ ls $_  2> $null } | ?{ $_.Name -match "^$command" } | % { $_.FullName }
} 

改めてPowerShellを起動してchocolateyでvimをインストールする
powershell> cinst vim

gitも入れる。
powershell> cinst git

cinstの実行直後はいろいろPathが通っていなかったりして使えない場合があるのでその場合はpowershellを再起動。
vimを整備する
NerdTreeを入れようと思ったらpathogen.vim使えと書いてあったのでpathogen.vim入れる。
powershell> cd $HOME
powershell> mkdir vimfiles
powershell> cd vimfiles
powershell> mkdir autoload, bundle
powershell> git init

pathogen.vim
を入れる。downloadしてvimfiles/autoload/pathogen.vimに保存する。
powershell> git add .
powershell> git commit -m init

とりあえずgitに登録した。
_vimrc
execute pathogen#infect()
syntax on
filetype plugin indent on

colorscheme darkblue

set hidden
set nobackup

_gvimrc
colorscheme desert

set iminsert=0
set imsearch=-1
set visualbell t_vb=

set columns=100
set lines=56

NerdTree
NerdTree をgit
submoduleとしてインストールする。
powershell> cd vimfiles/bundle
powershell> git submodule add https://github.com/scrooloose/nerdtree.git

以上でvim環境が始動した。
追記
WindowsだとNerdTreeの[m]キーのメニューにcopyが出ない問題があったがstackoverflowに
原因と解決方法が書いてあった。
http://stackoverflow.com/questions/11269926/nerdtree-copy-command-in-windows-7
