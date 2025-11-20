---
title: 機能が壊れている
date: 2024-02-13
tags: [w3m]
---

なるべく壊さないようにしていますが、
わりと壊れています。
忘れないように修復優先度をメモ。

<!-- truncate -->

## utf-8 以外動かない

読み易くするために USE_UNICODE, USE_M17N 機能を削除したので utf-8 専用です。
とりあえず Shift_JIS 対応を入れたい。

iconv か icu を検討。

## 微妙に不安定

gdb の有無で生死が変わったりする。
memory 系の問題がある。
とりあえず GC メモリーの直接操作を減らしていくしか。
文字列以外の GC は、他の方法で代替できる。
というか `std::shared_ptr` で十分だし、
Buffer などの struct 開放とともに destructor で開放された方が都合がよい。

## pageinfo が出ない

いつの間にか…。
なおすべし。

## PEEK_URL

indexずれ

- [x] schema_str ?

## local-cgi

なおった？

- [x] $LIB

## linein 復旧

mainloop の改修後に復旧。
co_await が使えると比較的楽に置き換えできそうなのだけど、
どうしたものか。
input でブロックせずに処理を返したいのです。

## https proxy

upgrade

後で

