---
title: tab と buffer
date: 2024-02-18
tags: [w3m, 減量]
---

データ構造

<!-- truncate -->

## TabBuffer

link list。たぶん左から順番。

```text
first         current      last
|             |            |
V             v            v
+TabBuffer+  +TabBuffer+  +TabBuffer+
|next     |->|next     |->|next     |--> nullptr
+---------+  +---------+  +---------+
```

## Buffer

TabBuffer 毎。
link list。

```text
TabBuffer  TabBuffer TabBuffer
first      current   last
|          |         |
V          v         v
+Buffer+  +Buffer+  +Buffer+
|next  |->|next  |->|next  |--> nullptr
+------+  +------+  +------+

next を辿るのが browser の back
```

これがひとつの WebBrowser を表している。
cmd_loadURL 関数が url を load して buffer を history に追加する基本型。

## わりと難解

TabBuffer と Buffer のリンクリストの取り回しが、w3m でも屈指の
難解さです。
buffer を作って目的地に link を追加するという動作なのだけど、
link list を足したり引いたり、あと端と中間の場合分けや、
Current の調整が入り乱れていてよく分からない。

標準の動作で buffer / tab を変化させてから、
後で不要なものを削除する場合なども動作がよくわかりません。
local CGI の履歴操作も難解です。

難解な操作の何割かがコマンドライン引き数で、
複数タブを操作するなど変ったことをするときに起きます。
コマンドライン引数を削除して楽をすることにしました。
第1引数を URL open するだけにシンプル化。

```c title="simple main"
  auto res = loadGeneralFile(argv[1], {}, {.referer = NO_REFERER}, {});
  if (!res) {
    return 2;
  }

  // main loop
````

## tab

tab で開くときに、tab を開く、
失敗したら tab を消す。
という挙動がわかりにくさの原因のひとつだった。
成功したら tab を作るという挙動に変えるとシンプルになる。
