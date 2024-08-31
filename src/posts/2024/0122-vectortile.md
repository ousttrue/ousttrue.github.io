---
title: vector tile 練習
date: 2024-01-22
tags: [maplibre, ladle]
---

最近 vector tile の self hosting 路線を試している。

- [tilemaker で vector tile を self hosting](https://zenn.dev/ousttrue/articles/ec47bc9d4de806)

gh-pages に展開するミニマムな構成を見出した。

- https://ousttrue.github.io/map_sample/?story=map--self-host-natural-earth

natural earth の 20MB くらいの地形情報と、
0-255 までの ascii フォント(1MB未満)で小さく動作させることに成功。
時前で host するとService への ApiKey の登録が不要になる。
引き換えに権利的に大丈夫なAssetをほどほどの容量に収まるように管理するというトレードオフ。

## pbf と content-type

mbutil や tilemaker で pbf を作ると gz 圧縮されちゃうのだけど、
ローカル開発中はうまく動作しなかった。

```txt
Conetent-Type: application/vnd.mapbox-vector-tile
Conetent-Encoding: gzip
```

上記のようにサーバーに振るまわせる方法がわからなかったので、
開発時はファイル名に `.gz` を付加したら動いたのでそれで進めた。
gh-pages に展開すると動かなかった。
デプロイ時に gzip を解凍することにした。

## style.json をゼロから作るのが難航

調べればいろいろ出てるのだけど、
tilemaker や mbutil で作った pbf にどんな情報が入っているのかとずれがあって、
コピペするだけでは表示されなくて難航。
うまくいかないときに、pbf, style.json どっちが悪いのかがはっきり分からない。
fill, line, symbol と実験してなんとなくわかってきた。
