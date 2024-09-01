---
date: 2021-11-13
tags:
- msys2
title: msys2 セットアップ
---

## pacman

[Pacmanの使い方](https://qiita.com/MoriokaReimen/items/dbe1448ce6c0f80a6ac1)

### Sync

イントール

```sh
pacman -S vim git tmux python3
```

更新

```sh
pacman -Syu
```

* -y refresh
* -u sysupgrade

サーチ

```sh
pacman -Ss pip
```

* -s search

インストール済み

```sh
pacman -Qs python
```

