---
title: "UWPでNativeDllを使う"
date: 2017-05-03
taxonomies: {tags: ['cmake', 'uwp']}
---

UWPでNativeのDLLを使うとどんな感じなのか試してみた。

https://github.com/ousttrue/UwpNativeDllSample

CMakeのCache機構のせいで挙動を勘違いした部分を書き直し。

自前でビルドしたlibpng.dllでpngを表示するサンプル。
デスクトップアプリとの違い

dllのロードパスがカレントディレクトリと環境変数PATHに記述された場所ではなく、projectのトップレベルのみ
デスクトップと公開されているAPIに差異がある
projectが違う。x86 vxprojとuwp32 vcxprojのdiffの抜粋。

>     <ApplicationType>Windows Store</ApplicationType>^M
>     <DefaultLanguage>en-US</DefaultLanguage>^M
>     <ApplicationTypeRevision>10.0</ApplicationTypeRevision>^M
>     <MinimumVisualStudioVersion>14.0</MinimumVisualStudioVersion>^M
>     <AppContainerApplication>true</AppContainerApplication>^M


zlib-1.2.11を無修正でビルドできた。
libpng-1.6.29は_ExitProcessにリンクする段階でエラーになった

修正方法が書いてあった。

https://github.com/Microsoft/vcpkg/blob/master/docs/example-3-patch-libpng.md

UWP向けビルドオプション/zw
無くても動いた。UWP固有のAPIにアクセスするときもしくはC++/CXに必要？

https://msdn.microsoft.com/ja-jp/library/hh561383.aspx

cmakeでWindowsStore向けのprojectを生成する
Microsoft版のcmakeなら作れる。
VS2017にも含まれていて以下のパスにあった。
C:\Program Files (x86)\Microsoft Visual Studio\2017\Community\Common7\IDE\CommonExtensions\Microsoft\CMake\CMake\bin\cmake.exe
本家のcmakeでもできるかもしれないが未確認。
プロジェクトを生成するときに以下のオプションを指定する。

-DCMAKE_SYSTEM_NAME=WindowsStore
-DCMAKE_SYSTEM_VERSION=10.0

これだけだとCMAKE_SYSTEM_PROCESSORが空になってlibpngではエラーになる。追加で下記のオプションも指定した。

-DCMAKE_SYSTEM_PROCESSOR=x86

ほかに/zwの指定など。

-DCMAKE_C_FLAGS=/ZW /EHsc /DWIN32=1
-DCMAKE_CXX_FLAGS=/ZW /EHsc /DWIN32=1

例
zlib-1.2.11/build> cmake.exe .. -G Visual Studio 15 2017 -DCMAKE_SYSTEM_PROCESSOR=x86 -DCMAKE_SYSTEM_NAME=WindowsStore -DCMAKE_SYSTEM_VERSION=10.0 -DCMAKE_C_FLAGS=/ZW /EHsc /DWIN32=1 -DCMAKE_CXX_FLAGS=/ZW /EHsc /DWIN32=1 

C#からDllImport
Desktopの時と記述方法は同じ。dllの配置場所は上記の通りprojectに放り込むだけ。
デスクトップ向けにビルドしたdllは動くのか
動いた。
逆にUWP向けにビルドしたdllはデスクトップで動くのか
動かなかった。ソース互換はある程度あるがバイナリ互換は無い。
{"DLL 'libpng16' を読み込めません:この操作はアプリ コンテナーのコンテキストでのみ有効です。 (HRESULT からの例外:0x8007109A)"}

このエラーがデスクトップでuwpのdllを呼び出したとき固有のエラーメッセージぽい。
まとめ
CMakeの場合はプロジェクト生成オプションさえわかれば、 デスクトップとそれほど使い勝手は変わらない。この煩雑な手順を記録しておくべく自動ビルドツール作成中。

https://github.com/ousttrue/bldproc

