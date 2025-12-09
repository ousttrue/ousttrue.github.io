---
date: 2025-12-05
title: 最近の python env
tags: [python]
---

最近の python 環境では気軽に `pip install` しづらくなっている。
`ubuntu`, `arch`, `gentoo` いずれも pip をさくっと使える感じではない。

理由は、ユーザーが勝手に pip すると system の python 環境が乱れるからであろう。
ものによっては pip ではなく apt, pacman, emerge の方で管理していたりするし。

たしかに `sudo pip` すると環境が壊れそうなのだが、 `pip --user` でさえも不許可になっていたりする。
現状の python は、`system`, `user`, `project` の3レベルが想定できる。
system レベルは sudo で、 project レベルは venv 的なものになる。

`user level` を気軽に使いたい。 
Windows は比較的気軽に pip できるので、そのような感じにしたい。

## user ローカルの python

package system を使わずに時前ビルドするか？
`prefix=$HOME/local/python` など。
