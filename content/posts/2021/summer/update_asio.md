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

`2021` の最新版が要りそう。 

## VC

<https://devblogs.microsoft.com/cppblog/c-coroutines-in-visual-studio-2019-version-16-8/>

> C++20 coroutines in Visual Studio 2019 version 16.8.

* `16.7.3` だめ
* `16.11.1` 動いた。

## clang

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

