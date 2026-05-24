---
date: 2026-05-19
title: dotfiles 整理
tags: [dotfiles, python]
---

## dotfiles を整理

再始動するための初手を実装した。

- python を `$DOTS/install` に自前ビルドすして、自由に `pip install` できる
- nvim を `$DOTS/install` に自前ビルドする
- `$DOTS/sync_home` に配置した `.bashrc`, `.config/nvim/init.lua` などのシンボリックリンクを `${HOME}` に展開する

## from 2025-07 to 2026-05

- https://github.com/ousttrue/dotpixi

管理スクリプトを python で記述。
pip を自由にするべく pixi + python にしてみたが、 うまくいかなかった。
単純 python に変えたくなった。
shell は、Windows は powershell 、Linux は bash。

## from ? to 2025-07

- https://github.com/ousttrue/dotfiles

管理スクリプトを powershell で記述。
shell は、Windows と Linux 両方を powershell にするという試みだった。
Linux は、 bash でいいのではないかと思った。
