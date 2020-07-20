---
Title: "Windows8導入"
Published: 2013-11-25
Tags: []
---

Windows8導入
なんとなく去年買ってきてきてLinuxで使っていたマシンに
SSDを買ってきてWindows8をインストールしてみた。
UEFIインストール
UEFIインストールしたほうが起動が早いらしいのでやってみた。

起動してdelボタンを押して設定画面に入る
その状態でインストールROMを挿入
起動メニューからUEFIの方のROMを選択
数秒間 ROMから起動するならなんか押せ と表示が出るのでその間にEnter
WindowsではなくASUSのロゴが出て起動すればUEFIモードでの起動に成功

あとはロムの指示に従ってインストールする
インストール後の環境
最近cygwinからPowerShellに移住しようとしているので、 cuiはPowerShellで。
まずは、PowerShellの権限変更。 PowerShellを管理者権限で起動して、
> Set-ExecutionPolicy RemoteSigned

Chocolatey
PowerShell版のapt-get的なChocolateyをインストールする。
dos窓(powershellではない)を起動してサイトに書いてある通りにコピペ。
@powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%systemdrive%\chocolatey\bin

putty
powershell> cinst putty

vim
powershell> cinst vim

~/_gvimrc
colorscheme desert

set iminsert=0
set imsearch=-1
set visualbell t_vb=

~/_vimrc
colorscheme darkblue

set hidden
set nobackup

git
powershell> cinst git

PowerShellの起動スクリプトにパスを追加
powershell> mkdir $HOME/Documents/WindowsPowerShell
powershell> gvim $PROFILE

$env:PATH+=";C:\Program Files (x86)\Git\bin"

これでgit付属のssh等にPathが通る。 とりあえずEditorとGitが手に入った。
まだまだ色々とインストールせねばならんな。
