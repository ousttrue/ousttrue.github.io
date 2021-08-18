+++
title = "Asio と Coroutine (c++20)"
date = 2021-08-15
updated = 2021-08-18
taxonomies.tags = ["cpp", "asio"]
+++

非同期ライブラリ ASIO 

<http://think-async.com/Asio/index.html>

の知識を `c++20` 時代にアップデート。

* <https://github.com/chriskohlhoff/talking-async>

に動画と動画のサンプルコードが有る。

# compiler を最新にする

`ASIO_HAS_CO_AWAIT` が必要でこれが有効になるには新しいコンパイラが必要。

```c++
// asio/detail/config.hpp`

// Support the co_await keyword on compilers known to allow it.
#if !defined(ASIO_HAS_CO_AWAIT)
# if !defined(ASIO_DISABLE_CO_AWAIT)
#  if defined(ASIO_MSVC)
#   if (_MSC_VER >= 1928) && (_MSVC_LANG >= 201705) && !defined(__clang__)
#    define ASIO_HAS_CO_AWAIT 1
#   elif (_MSC_FULL_VER >= 190023506)
#    if defined(_RESUMABLE_FUNCTIONS_SUPPORTED)
#     define ASIO_HAS_CO_AWAIT 1
#    endif // defined(_RESUMABLE_FUNCTIONS_SUPPORTED)
#   endif // (_MSC_FULL_VER >= 190023506)
#  elif defined(__clang__)
#   if (__cplusplus >= 201703) && (__cpp_coroutines >= 201703)
#    if __has_include(<experimental/coroutine>)
#     define ASIO_HAS_CO_AWAIT 1
#    endif // __has_include(<experimental/coroutine>)
#   endif // (__cplusplus >= 201703) && (__cpp_coroutines >= 201703)
#  elif defined(__GNUC__)
#   if (__cplusplus >= 201709) && (__cpp_impl_coroutine >= 201902)
#    if __has_include(<coroutine>)
#     define ASIO_HAS_CO_AWAIT 1
#    endif // __has_include(<coroutine>)
#   endif // (__cplusplus >= 201709) && (__cpp_impl_coroutine >= 201902)
#  endif // defined(__GNUC__)
# endif // !defined(ASIO_DISABLE_CO_AWAIT)
#endif // !defined(ASIO_HAS_CO_AWAIT)
```

## VC2019(20210818最新版いける)

<https://devblogs.microsoft.com/cppblog/c-coroutines-in-visual-studio-2019-version-16-8/>

> C++20 coroutines in Visual Studio 2019 version 16.8.

* `16.7.3` だめ
* `16.11.1` 動いた。

```
# CMakeListx.txt
set(TARGET_NAME pingpong)
add_executable(${TARGET_NAME} main.cpp)
target_link_libraries(${TARGET_NAME} PRIVATE asio)
set_property(TARGET ${TARGET_NAME} PROPERTY CXX_STANDARD 20) # 必要
target_compile_options(${TARGET_NAME} PUBLIC $<$<C_COMPILER_ID:MSVC>:/await>) # 必要
target_compile_definitions(asio INTERFACE ASIO_DISABLE_STD_COROUTINE) # 必要。よくわからない
```

## LLVM-12(うまくいかず。追加のコマンドライン引数か)

<https://clang.llvm.org/cxx_status.html>

LLVM-12 だと、

```
 'C:\Program Files\LLVM\bin\clang.exe' -v
clang version 12.0.1
Target: x86_64-pc-windows-msvc
Thread model: posix
InstalledDir: C:\Program Files\LLVM\bin
```

わからん。

# コード

```cpp
#include <asio/awaitable.hpp>
#include <asio/co_spawn.hpp>
#include <asio/detached.hpp>
#include <asio/experimental/as_tuple.hpp>
#include <asio/io_context.hpp>
#include <asio/ip/tcp.hpp>
#include <asio/read.hpp>
#include <asio/streambuf.hpp>
#include <asio/system_timer.hpp>
#include <asio/use_awaitable.hpp>
#include <asio/use_future.hpp>
#include <asio/write.hpp>
```

## co_spawn で awaiable を起動する

coroutine は 戻り値の型が `asio::awaitable<T>` である必要がある。この関数の中で `co_await`, `co_yield`, `co_return` が使える。
coroutine は lambda でもよいので、下記のようにできる。

```cpp
  auto co = []() -> asio::awaitable<std::string> {
    co_return "result";
  };
  auto result =
      asio::co_spawn(client_context.get_executor(), co, asio::use_future); // coroutine 登録
  client_context.run(); // ループを回す
  auto pong = result.get(); // future から結果を得る
  std::cout << "pong: " << pong << std::endl;
```

asio::use_future を使うことで返り値 `std::future` になるので `co_return` の値を得ることも可能。
結果に興味がないときは、`asio::detached` でよい。
Completion Handler というコールバックなので、 promise に set_value する関数を自前で書いたりしてもよい様子。
`asio::use_awaitable` で `co_await` するのも可能。

## client side

* timer
* connect
* send(ping)
* receive(pong)

```cpp
  auto co = [&context = client_context, ep]() -> asio::awaitable<std::string> {
    std::cout << "[client]wait 1000ms..." << std::endl;
    asio::system_timer timer(context);
    timer.expires_from_now(1000ms);
    co_await timer.async_wait(asio::use_awaitable);

    std::cout << "[client]connect: " << ep << "..." << std::endl;
    asio::ip::tcp::socket socket(context);
    co_await socket.async_connect(ep, asio::use_awaitable);
    std::cout << "[client]connected" << std::endl;

    std::cout << "[client]ping..." << std::endl;
    std::string ping("ping");
    auto write_size = co_await asio::async_write(socket, asio::buffer(ping),
                                                 asio::use_awaitable);
    assert(write_size == 4);

    std::cout << "[client]read..." << std::endl;
    asio::streambuf buf;
    auto read_size = co_await asio::async_read(
        socket, buf, asio::transfer_at_least(1), asio::use_awaitable);
    co_return to_string(buf);
  };
```

## server side

```cpp
class server {

  asio::io_context &_context;
  asio::ip::tcp::acceptor _acceptor;

public:
  server(asio::io_context &context) : _context(context), _acceptor(context) {}
  ~server() {}

  void listen(const asio::ip::tcp::endpoint &ep) {
    std::cout << "[server]listen: " << ep << "..." << std::endl;
    _acceptor.open(ep.protocol());
    _acceptor.bind(ep);
    _acceptor.listen();

    // coroutineを起動する
    auto ex = _context.get_executor();
    asio::co_spawn(ex, accept_loop(), asio::detached);
  }

  asio::awaitable<void> accept_loop() {

    // 単なるループになって再起が不要に
    while (true) {

      auto [e, socket] = co_await _acceptor.async_accept(use_nothrow_awaitable);
      if (e) {
        std::cout << "[server]accept error: " << e << std::endl;
        break;
      }
      std::cout << "[server]accepted" << std::endl;

      // coroutineを起動する
      auto ex = _context.get_executor();
      asio::co_spawn(ex, session(std::move(socket)), asio::detached);
    }
  }

  asio::awaitable<void> session(asio::ip::tcp::socket socket) {

    // echo server ぽい ping pong
    asio::streambuf buf;
    auto [e1, read_size] = co_await asio::async_read(
        socket, buf, asio::transfer_at_least(1), use_nothrow_awaitable);

    auto pong = to_string(buf);
    std::cout << "[server]ping: " << pong << std::endl;
    pong += "pong";
    auto [e2, write_size] = co_await asio::async_write(
        socket, asio::buffer(pong), use_nothrow_awaitable);
    std::cout << "[server]pong: " << write_size << std::endl;
  }
};
```

```cpp
  auto ep = asio::ip::tcp::endpoint(asio::ip::address::from_string("127.0.0.1"),
                                    PORT);

  // server
  asio::io_context server_context;
  server server(server_context);
  server.listen(ep);
  std::thread server_thread([&server_context]() { server_context.run(); }); // thread でループを回す。
```

ループ(io_context)が隠蔽されていないのが良いですね。

# 関連
## io_service to io_context

`c++23` の `Networking TS` に向けた変更？

* [Networking TS の Boost.Asio からの変更点 - その 1: Associated allocator](https://amedama1x1.hatenablog.com/entry/2016/04/05/205340)
* [Networking TS の Boost.Asio からの変更点 - その 3: Executor](https://amedama1x1.hatenablog.com/entry/2016/08/20/222326)

> io_service は Executor と ExecutionContext という概念に分割されたことで, io_context に名前が変わりました

`Boost 1.66`

* [Networking TS の Boost.Asio からの変更点 - その 4: Associated Executor](https://amedama1x1.hatenablog.com/entry/2017/12/09/102405)


## future/promise

`c++11`

* [futureとpromiseのあれこれ（理論編）](https://yohhoy.hatenadiary.jp/entry/20120131/p1)

* promise 作る
* promise から future を得る
* promise は thread に放り込む
* future::get でブロック

```cpp
std::future<int> async_something()
{
  std::promise<int> p;
  auto f = p.get_future();

  // promise はコピーできないのでmoveする
  // 例えば スレッド に送りこむ
  std::thread([p = std::move(p)](){

    // 非同期な結果
    p.set_value(123);

  });

  return f;
}
```

## coroutine TS

`c++20`

* <https://cpprefjp.github.io/lang/cpp20/coroutines.html>
* <https://www.scs.stanford.edu/~dm/blog/c++-coroutines.html>

template によるダックタイピング的な感じで、適当でも動きそう

* std::coroutine_handle<promise_type>

resume の呼び出しをライブラリ内に隠し持つ感じかな。

* 例えば iterator に隠ぺいして operator++ で resume を呼び出す

