+++
date = 2022-04-20
tags = ["linux"]
+++

# Gentoo 構築

久しぶりに gentoo の機運が高まったので入れてみた。
先に `Ubuntu-20.04` を入れておいて、後ろのパーティションに gentoo をインストールする作戦。
Ubuntu と同じ `/home` をマウントしてみたら `dotfiles` に互換性が無かったが、わりと順調にインストールできた。
ゆくゆくは wsl も gentoo に歓送いたいところじゃ。

## python-3.10

`PYTHON_SINGLE_TARGET`

6月くらいにデフォルトになる予定みたいだ。先にやってみた。

間違い。去年の6月に、 `Python-3.9` がデフォルトになった。
`Python-3.10` は今のところ予定に無い。
いろいろインストールできなくなったので、元に戻した。

## boot

`refind` を試してみた。
先に、Ubuntu の方でインストールして `gentoo` でエントリーだけ増やした。
`grub2` より設定が簡単。

## xorg

なんとなくできた。

```
$ startx -- vt1
```

としないとエラーになる。
`/etc/X11` は作らなくても動いた。

いつもどおりに `openbox`, `tint2`, `PCManFM`, `conky` という感じだが、今回は新型の `wezterm` がある。

## yaft

nerdfonts 入りの bdffont を作りたいのだが未だ。
mlterm-fb や kmscon も試してみたのだがうまく動かなかった。

## wayland

予定

