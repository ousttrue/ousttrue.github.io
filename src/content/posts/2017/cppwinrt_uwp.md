---
title: "C++WinRTではじめるUWP"
date: 2017-09-14
tags: ["cpp", "uwp"]
---

C++/CX を置き換えるよさげなライブラリ C++WinRT を発見した。

C++/CX の機能を純粋な C++(C++17 とか新しめの)で実装したものらしく、WinRT の C++バインディングのような位置。
C++/CX で

```c++
Windows::UI::Core::CoreWindow ^window;
```

のようなものを

```c++
#include <winrt/Windows.UI.Core.h>
winrt::Windows::UI::Core::Core window;
```

のように置き換える。`-> `じゃなくて `.` を使うスマートポインタで実装されている。

- Migrating C++/CX source code to C++/WinRT

C++/CX で async, await な非同期を実装する道具だった PPL もうまく置き換えているようだ。

- Using C++ co-routines with C++/WinRT asynchronous methods

やってみる
clone
https://github.com/Microsoft/cppwinrtをcloneしてincludeできるようにしておく。
C++WinRT はヘッダオンリーライブラリである。
ビルド確認

https://github.com/Microsoft/cppwinrt/tree/master/10.0.15063.0/Samples/CL

をベース。

```c++
// main.cpp
#pragma comment(lib, "windowsapp")

#include <winrt/base.h>

int __stdcall wWinMain(HINSTANCE, HINSTANCE, PWSTR, int)
{
    winrt::init_apartment();

    return 0;
}
```

あえて CMake で。
CMakeLists.txt

```cmake
CMAKE_MINIMUM_REQUIRED(VERSION 3.5)
PROJECT(RendererToolkit) # .sln

ADD_DEFINITIONS(
    -DWIN32=1
    -DUNICODE=1
    -D_UNICODE=1
    )

SET(CMAKE_C_FLAGS "/ZW /EHsc /await /std:c++latest")
SET(CMAKE_CXX_FLAGS ${CMAKE_C_FLAGS})
INCLUDE_DIRECTORIES(
    # 適当にcloneしたパスを参照
    ${CMAKE_CURRENT_LIST_DIR}/cppwinrt/10.0.15063.0
    )

##############################################################################
# project
##############################################################################
SET(PROJECTNAME _SampleCoreWindow)

FILE(GLOB SRCS *.cpp *.h)

ADD_EXECUTABLE(${PROJECTNAME} WIN32 ${SRCS})

TARGET_INCLUDE_DIRECTORIES(${PROJECTNAME} PUBLIC
    ${SUBRENDERER_INCLUDE}
    )
```

UWP をターゲットにしたプロジェクトを生成する。

```
> mkdir build
> cd build
build> cmake.exe -DCMAKE_SYSTEM_NAME=WindowsStore -DCMAKE_SYSTEM_VERSION=10.0 -DCMAKE_C_FLAGS=/ZW /EHsc -G "Visual Studio 15 2017 Win64" ..
```

ビルドすると警告が出る。

```
warning C4447: スレッド モデルのない 'main' シグネチャが見つかりました。'int main(Platform::Array<Platform::String^>^ args)' の使用を検討してください。
```

以下のように属性をつければ外せた。

```
[Platform::MTAThread]
int __stdcall wWinMain(HINSTANCE, HINSTANCE, PWSTR, int)
```

Debug - X64 - ローカルコンピューター でアプリが起動して、即終了することが確認できればよし。
UWP の作法で空の App を作ってみる

```c++
#pragma comment(lib, "windowsapp")

#include <winrt/Windows.ApplicationModel.Core.h>
#include <winrt/Windows.UI.Core.h>

//
// IFrameworkViewSourceとIFrameworkViewを一体化させるのは必要(ばらすとエラーになった)
//
struct App : winrt::implements<App
    , winrt::Windows::ApplicationModel::Core::IFrameworkViewSource
    , winrt::Windows::ApplicationModel::Core::IFrameworkView>
{
    winrt::Windows::ApplicationModel::Core::IFrameworkView CreateView()
    {
        return *this;
    }

    void Initialize(winrt::Windows::ApplicationModel::Core::CoreApplicationView const&)
    {
    }

    void Load(winrt::hstring const&)
    {
    }

    void Uninitialize()
    {
    }

    void Run()
    {
        auto window = winrt::Windows::UI::Core::CoreWindow::GetForCurrentThread();
        window.Activate();

        //

        auto dispatcher = window.Dispatcher();
        dispatcher.ProcessEvents(winrt::Windows::UI::Core::CoreProcessEventsOption::ProcessUntilQuit);
    }

    void SetWindow(winrt::Windows::UI::Core::CoreWindow const&)
    {

    }
};


int __stdcall wWinMain(HINSTANCE, HINSTANCE, PWSTR, int)
{
    winrt::init_apartment();

    winrt::Windows::ApplicationModel::Core::CoreApplication::Run(App());
}
```

警告とは無関係に、実行に

`[Platform::MTAThread]` か `winrt::init_apartment();` のどちらかが必要？

IUnknown\*を得る
winrt::get_abi
メモ

https://github.com/Kitware/CMake/blob/master/Tests/VSWinStorePhone/CMakeLists.txt

VisualStudio2017 の C++/CX Universal D3D11 のテンプレートを C++/WinRT バージョンに改造できた。間違ってもコンパイルが通って実行時エラーになるのに難儀したが、C++/CX よりはだいぶ使い勝手がよさげな感じ。
