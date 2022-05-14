---
title: "Header-OnlyのMessagePack実装とmsgpack-rpc-asioの更新"
date: 2017-05-28
tags: ['cpp', 'msgpack']
---

車輪の再発明的だけどmessagepackのc++実装をまた作った。

<https://github.com/ousttrue/msgpackpp>

`refrange` と `osaru` の知見を基に実装というか、編集した。
実装のシンプルさと使いやすさを優先して、パフォーマンスと汎用性にあまり配慮していない。`refrange` のAPIがダメダメなのを反省し、`osaru` で `serializer/deserializer` のレイヤーと `formatter/parser` のレイヤーを分けた設計を踏襲。なかなかよいのではないか。で、本家の `messagepack` を見たらバージョンが結構進んでいて、`c++11` 版ならヘッダーオンリーあるよと書いてあった。あったのかー。知ってたような気もするが、カスタムのオレオレ車輪でいく。
あと、ついでに `msgpackpp-rpc-asio` も更新した。githubで地味に★をいただくので、微妙に需要があるらしい。今回の更新で、この前発見した `asio standalone` を組み込んで `boost::test` を `catch` で置き換えて、 `boost::thread` を `std::thead` に置き換えるなどして、 `boost` への依存を取り除いた。ちょっとした機能ならばヘッダオンリーなのが最近の潮流ですな。もう少し手を入れて

`msgpack` 部分を `msgpackpp` で置き換え
可変長テンプレート引数
メッセージを `std::cout` じゃなくて `plog` に出力
ヘッダオンリー

という感じにしようか。`websocketpp` と組み合わせて使うのに便利な形にしたい。

