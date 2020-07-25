---
Title: "Header-OnlyのMessagePack実装とmsgpack-rpc-asioの更新"
date: 2017-05-28
Tags: []
---

車輪の再発明的だけどmessagepackのc++実装をまた作った。


https://github.com/ousttrue/msgpackpp

refrangeとosaruの知見を基に実装というか、編集した。
実装のシンプルさと使いやすさを優先して、パフォーマンスと汎用性にあまり配慮していない。refrangeのAPIがダメダメなのを反省し、osaruでserializer/deserializerのレイヤーとformatter/parserのレイヤーを分けた設計を踏襲。なかなかよいのではないか。で、本家のmessagepackを見たらバージョンが結構進んでいて、c++11版ならヘッダーオンリーあるよと書いてあった。あったのかー。知ってたような気もするが、カスタムのオレオレ車輪でいく。
あと、ついでにmsgpackpp-rpc-asioも更新した。githubで地味に★をいただくので、微妙に需要があるらしい。今回の更新で、この前発見したasio standaloneを組み込んでboost::testをcatchで置き換えて、boost::threadをstd::theadに置き換えるなどして、boostへの依存を取り除いた。ちょっとした機能ならばヘッダオンリーなのが最近の潮流ですな。もう少し手を入れて

msgpack部分をmsgpackppで置き換え
可変長テンプレート引数
メッセージをstd::coutじゃなくてplogに出力
ヘッダオンリー

という感じにしようか。websocketppと組み合わせて使うのに便利な形にしたい。
