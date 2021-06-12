---
title: "可変長テンプレート引数"
date: 2013-05-17
Tags: ['cpp']
---

可変長テンプレート引数
引き続きmsgpack-rpc-asioを実装しているのだが、可変長テンプレート引数(valiadic
template)を使うと関数登録のような場合にうまく書けることがわかった。
昨日は関数オブジェクトからstd::functionの型を得るのに下記のようにしていたのだけど、
```c++ // ret template Ret helper0(Ret (F::*)(Rest…));
template Ret helper0(Ret (F::*)(Rest…) const);
// 1 template A1 helper1(Ret (F::*)(A1, Rest…));
template A1 helper1(Ret (F::*)(A1, Rest…) const);
// 2 template A2 helper2(Ret (F::*)(A1, A2, Rest…));
template A2 helper2(Ret (F::*)(A1, A2, Rest…) const);
template void add_handler(F handler, const std::string &method) {
typedef decltype(handler) functor; typedef
decltype(helper0(&functor::operator())) R; typedef
decltype(helper1(&functor::operator())) A1; typedef
decltype(helper2(&functor::operator())) A2;
// register function...
std::function<R(A1, A2)> func(handler);

} 次のように書けた。c++ template void add_handler(F handler,
R(C::*)(A1, A2)const) { // register function… std::function
func(handler); }
template void add_handler(F handler, const std::string &method) {
add_handler(handler, &decltype(handler)::operator()); }
昨日参照させてもらった
<http://d.hatena.ne.jp/osyo-manga/20121205/1354674180>
のコードがやっとわかるようになってきた。

上記コードはさらに可変長テンプレート引数で

template void add_handler(F handler, R(C::*)(A…)const) { // register
function… std::function func(handler); }
``と書けるのですごく便利になる。 msgpack-rpcの関数コールバック登録や、luaのような組み込み言語への関数公開の実装が楽になりそうだ。 上記サイトでも取り上げられているが&decltype(functor)::operator()`を関数テンプレートの型推論に投げることで
関数オブジェクトから型情報を取れるらしい。
気をよくして各所を可変長テンプレート引数を使うように書き換えたのだが、
致命的な問題を発見。
vc2010はなんと可変長テンプレート引数を未実装だった。
c++0xの機能がわりと入っているのでできると思っていたのに。
msgpack-rpc-asioは、明瞭にvc2010をターゲットにしているので可変長テンプレート引数の使用を断念した。
２引数関数の操作までしか実装していない時点で気付いて良かった。
ライブラリの不足はboost使えば済むが言語機能が無いのは困るな・・・。
vc2012に乗り換えたくなった。
