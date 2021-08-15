+++
title = "ASIO と Coroutine など"
date = 2021-08-15
taxonomies.tags = ["cpp", "asio"]
+++

非同期ライブラリ ASIO 

<http://think-async.com/Asio/index.html>

の知識を `c++20` 時代にアップデート。

# io_service to io_context

`c++23` の `Networking TS` に向けた変更？

* [Networking TS の Boost.Asio からの変更点 - その 1: Associated allocator](https://amedama1x1.hatenablog.com/entry/2016/04/05/205340)
* [Networking TS の Boost.Asio からの変更点 - その 3: Executor](https://amedama1x1.hatenablog.com/entry/2016/08/20/222326)

> io_service は Executor と ExecutionContext という概念に分割されたことで, io_context に名前が変わりました

`Boost 1.66`

* [Networking TS の Boost.Asio からの変更点 - その 4: Associated Executor](https://amedama1x1.hatenablog.com/entry/2017/12/09/102405)


## post/dispatch


# future/promise

`c++11`

* [futureとpromiseのあれこれ（理論編）](https://yohhoy.hatenadiary.jp/entry/20120131/p1)

* promise 作る
* promise から future を得る
* promise は thread に放り込む
* future::get でブロック

# coroutine TS

`c++20`

* <https://cpprefjp.github.io/lang/cpp20/coroutines.html>
* <https://www.scs.stanford.edu/~dm/blog/c++-coroutines.html>

template によるダックタイピング的な感じで、適当でも動きそう

* std::coroutine_handle<promise_type>

resume の呼び出しをライブラリ内に隠し持つ感じかな。

* 例えば iterator に隠ぺいして operator++ で resume を呼び出す

# asio で coroutine インタフェースを使う

* <https://github.com/chriskohlhoff/talking-async>
