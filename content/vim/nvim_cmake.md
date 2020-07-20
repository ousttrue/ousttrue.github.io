+++
date = 2019-04-19T00:14:08+09:00
tags = ['vim', 'c++']
draft = true
+++
# nvim で CMake

* [vimからC++プロジェクトに対してCMakeでビルドツリー生成＋コンパイル](https://hogehuga.net/c/289/)

なるほど。

* プロジェクト生成
* Build
* 実行(debbugerのアタッチ)

の3ステップを自分好みにスクリプト化するのがよさそうだ。
あと、

* clang-formatter

## sample

実験用に小さいプロジェクト作る。

```cmake
# CMakeLists.txt
CMAKE_MINIMUM_REQUIRED(VERSION 3.0.0)
PROJECT(hello VERSION 0.1.0)

FILE(GLOB SRC
    *.cpp
    *.h
    ) 

ADD_EXECUTABLE(${PROJECT_NAME} ${SRC})
```

```cpp
#include <iosteram>

int main(int argc, char **argv)
{
    std::cout << "hello" <<std::endl;
    return 0;
}
```

## cmake.vim

自作する前によさげな `plugin` を探索

* https://github.com/jalcine/cmake.vim

> 🔨 CMake functionality within Vim.

使い方がよくわからん・・・

## vim-cmake-project

* https://github.com/sigidagi/vim-cmake-project

