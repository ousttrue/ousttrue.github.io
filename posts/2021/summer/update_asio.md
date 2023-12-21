---
date: 2021-08-15
tags:
- cpp
- asio
title: Asio と Coroutine (c++20)
updated: 2021-08-18
---

非同期ライブラリ ASIO 

http://think-async.com/Asio/index.html

の知識を `c++20` 時代にアップデート。

* https://github.com/chriskohlhoff/talking-async

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

https://devblogs.microsoft.com/cppblog/c-coroutines-in-visual-studio-2019-version-16-8/

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
target_compile_definitions(asio INTERFACE ASIO_DISABLE_STD_COROUTINE) # 必要
```

```cpp
#if defined(ASIO_HAS_STD_COROUTINE)
# include <coroutine>
#else // defined(ASIO_HAS_STD_COROUTINE)
# include <experimental/coroutine>
#endif // defined(ASIO_HAS_STD_COROUTINE)
```

## LLVM-12(うまくいかず。追加のコマンドライン引数か)

https://clang.llvm.org/cxx_status.html

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

## co_spawn で awaitable を起動する

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

返り値が `std::tuple<asio::error_code, RESULT>` になるハンドラ。

```cpp
constexpr auto use_nothrow_awaitable =
    asio::experimental::as_tuple(asio::use_awaitable);
```

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

# asio api

## io_context

`c++23` の `Networking TS` に向けた変更？

* [Networking TS の Boost.Asio からの変更点 - その 1: Associated allocator](https://amedama1x1.hatenablog.com/entry/2016/04/05/205340)
* [Networking TS の Boost.Asio からの変更点 - その 3: Executor](https://amedama1x1.hatenablog.com/entry/2016/08/20/222326)

> io_service は Executor と ExecutionContext という概念に分割されたことで, io_context に名前が変わりました

`Boost 1.66`

* [Networking TS の Boost.Asio からの変更点 - その 4: Associated Executor](https://amedama1x1.hatenablog.com/entry/2017/12/09/102405)

単純に io_service を io_context に追きかえるだけで動いた。

```cpp
#include <asio.hpp>

io_context context;

// 全てのタスクが消化されるまでブロックする。
context.run();

// スレッド上で実行する例
std::thread run_thread([&context](){ context.run(); });

// 止める
context.stop();
run_thread.join();
```

## endpoint

ipaddress + port

```cpp
asip::ip::tcp::endpoint ep(asio::ip::address::from_string("127.0.0.1"), 1234);
```

## tcp connect

socket

```cpp
io_context context;
asio::ip::tcp::socket socket(coontext);
```

basic

```cpp
void connect(asio::ip::tcp::socket socket, const asio::ip::tcp::endpoint &ep)
{
  auto on_connect = [](const asio::error_code &ec)
  {
    if(ec)
    {
      std::cout << "error: " << ec << std::endl;
    }
    else{
      std::cout << "connected" << std::endl;
    }
  };
  socket.async_connect(ep, on_connect);
}
```

`c++11 future`

std::future に対して `continue_with` する手段を用意しないと、これ単体では使いづらい

```cpp
std::future<void> connect_future(asio::ip::tcp::socket socket, const asio::ip::tcp::endpoint &ep)
{
  // move するのが大変な場合があるので手抜き
  auto p = std::make_shared<std::promise<void>>();
  auto f = p->get_future();

  socket.async_connect(ep, [p](asio::error_code ec){
    if(ec)
    {
    }
    else{
      // future value
      p->set_value();
    }
  });

  return f;
}
```

`c++20 coroutine`

有望

```cpp
asio::awaitable<void> co(asio::io_context &context, const asio::ip::tcp::endpoint &ep)
{
  asio::ip::tcp::socket socket(coontext);
  co_await socket.async_connect(ep, asio::use_awaitable);
}
```

## tcp listen

## raed_async

## write_async

# coroutine 詳細

asio の coroutine を学んでいたらできないことが出てきた。

```cpp
auto result = co_await rpc_call("add", 1, 2);
```

# 自前の Awaiter が必要？

```cpp
template<typename R, typename ...AS>
asio::awaitable<R> rpc_call(const std::string &method, AS... as)
{
  asio::io_context context;
  asio::ip::tcp::socket socket(context);

  asio::ip::tcp::endpoint ep;

  co_await socket.connect_async(ep, asio::use_awaitable);

  // msgpack-rpc
  std::vector<uint8_t> request = make_request(method, as...);
  co_await asio::write_async(socket, request, asio::use_awaitable); 

  // ここで実行の流れが切れる

  // ?
  std::promise<R> p;
  return p.get_future();
}
```

`co_await std::future` できるぽいが, `asio` と混ぜてうまくいくのだろうか。

# c++20 coroutine

* https://cpprefjp.github.io/lang/cpp20/coroutines.html
* https://www.scs.stanford.edu/~dm/blog/c++-coroutines.html
* [C++ でコルーチン (async/await 準備編)](https://qiita.com/tan-y/items/ae54153ec3eb42f80638)
* [C++ で async/await をする](https://qiita.com/tan-y/items/6033ab9e7298999bf214#await_ready)

内部で `co_await`, `co_yield`, `co_return` の何れかを使う関数は coroutine になる。
返り値の型から promise_type を得られるようにする必要がある。

初期化は `promise_type::get_return_object` から始まるぽい。

## generator の例

```cpp
struct generator {
  struct promise_type;
  using handle = std::coroutine_handle<promise_type>;  
  struct promise_type {
    auto get_return_object() { return generator{handle::from_promise(*this)}; }
  };
  using handle = std::coroutine_handle<promise_type>;
private:
  handle coro;
  generator(handle h) : coro(h) {}
};
```

```cpp
promise_type promise;

// 戻り値型オブジェクトの初期化
auto result = promise.get_return_object();
```

# Asio の実装

## asio::awaitable
`asio::awaitable<T>` が CoroutineTrait の実装。

`include/asio/awaitable.hpp`

```cpp
template <typename T, typename Executor = any_io_executor>
class ASIO_NODISCARD awaitable
{
public:
  /// The type of the awaited value.
  typedef T value_type;

  /// The executor type that will be used for the coroutine.
  typedef Executor executor_type;

  /// Default constructor.
  constexpr awaitable() noexcept
    : frame_(nullptr)
  {
  }

  /// Move constructor.
  awaitable(awaitable&& other) noexcept
    : frame_(std::exchange(other.frame_, nullptr))
  {
  }

  /// Destructor
  ~awaitable()
  {
    if (frame_)
      frame_->destroy();
  }

  /// Checks if the awaitable refers to a future result.
  bool valid() const noexcept
  {
    return !!frame_;
  }

#if !defined(GENERATING_DOCUMENTATION)

  // Support for co_await keyword.
  bool await_ready() const noexcept
  {
    return false;
  }

  // Support for co_await keyword.
  template <class U>
  void await_suspend(
      detail::coroutine_handle<detail::awaitable_frame<U, Executor>> h)
  {
    frame_->push_frame(&h.promise());
  }

  // Support for co_await keyword.
  T await_resume()
  {
    return awaitable(static_cast<awaitable&&>(*this)).frame_->get();
  }

#endif // !defined(GENERATING_DOCUMENTATION)

private:
  template <typename> friend class detail::awaitable_thread;
  template <typename, typename> friend class detail::awaitable_frame;

  // Not copy constructible or copy assignable.
  awaitable(const awaitable&) = delete;
  awaitable& operator=(const awaitable&) = delete;

  // Construct the awaitable from a coroutine's frame object.
  explicit awaitable(detail::awaitable_frame<T, Executor>* a)
    : frame_(a)
  {
  }

  detail::awaitable_frame<T, Executor>* frame_;
};
```

## promise_type

`include/asio/impl/awaitable.hpp`

// promise_type

```cpp
# if defined(ASIO_HAS_STD_COROUTINE)

namespace std {

template <typename T, typename Executor, typename... Args>
struct coroutine_traits<asio::awaitable<T, Executor>, Args...>
{
  typedef asio::detail::awaitable_frame<T, Executor> promise_type;
};

} // namespace std

# else // defined(ASIO_HAS_STD_COROUTINE)

namespace std { namespace experimental {

template <typename T, typename Executor, typename... Args>
struct coroutine_traits<asio::awaitable<T, Executor>, Args...>
{
  typedef asio::detail::awaitable_frame<T, Executor> promise_type;
};

}} // namespace std::experimental

# endif // defined(ASIO_HAS_STD_COROUTINE)
```

## asio::detail::awaitable_frame

```cpp
template <typename Executor>
class awaitable_frame<void, Executor>
  : public awaitable_frame_base<Executor>
{
public:
  awaitable<void, Executor> get_return_object()
  {
    this->coro_ = coroutine_handle<awaitable_frame>::from_promise(*this);
    return awaitable<void, Executor>(this);
  };

  void return_void()
  {
  }

  void get()
  {
    this->caller_ = nullptr;
    this->rethrow_exception();
  }
};
```

