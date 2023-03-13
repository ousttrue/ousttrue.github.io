---
title: "node-ffiでstdcallが使いたい(頓挫)"
date: 2015-12-19
tags: []
---

Windows 上で node-ffi で dll から関数を呼びだしていたのだが、
dll にコールバックを登録した呼び出しを繰り返していると死ぬという現象に遭遇。
調べ始めた。
node-v5.3.0-x64.msi(Windows10)

```
node-ffiはstdcallに対応してない
2014/01/25

http://stackoverflow.com/questions/21357502/calling-delphi-stdcall-function-with-panischar-from-node-js

node-ffiはstdcall対応してないで。
そうなのかー。
github見るとIssueがあるけど解決されなかったぽい。
2012/01/13
* https://github.com/node-ffi/node-ffi/issues/34
残念。
ついで。node-ffiはffiにパッケージ名を改めたらしい。

https://github.com/node-ffi/node-ffi/wiki/API-changes-from-v0.x-to-v1.x

node-ffiを改造できないか模索する
node-ffiはlibffiのラッパーとわかる。
FFI_DEFAULT_ABI
というのがcdeclになる様子でnode-ffiはそれしか対応していないのが問題。
で、調べていくと
node_modules/ffi/deps/libffi/src/x86/ffitarget.h
typedef enum ffi_abi {
  FFI_FIRST_ABI = 0,

  /* ---- Intel x86 Win32 ---------- */
#ifdef X86_WIN32
  FFI_SYSV,
  FFI_STDCALL,
  FFI_THISCALL,
  FFI_FASTCALL,
  FFI_MS_CDECL,
  FFI_LAST_ABI,
#ifdef _MSC_VER
  FFI_DEFAULT_ABI = FFI_MS_CDECL
#else
  FFI_DEFAULT_ABI = FFI_SYSV
#endif

#elif defined(X86_WIN64)
  FFI_WIN64,
  FFI_LAST_ABI,
  FFI_DEFAULT_ABI = FFI_WIN64

#else
  /* ---- Intel x86 and AMD x86-64 - */
  FFI_SYSV,
  FFI_UNIX64,   /* Unix variants all use the same ABI for x86-64  */
  FFI_LAST_ABI,
#if defined(__i386__) || defined(__i386)
  FFI_DEFAULT_ABI = FFI_SYSV
#else
  FFI_DEFAULT_ABI = FFI_UNIX64
#endif
#endif
} ffi_abi;

STDCALL発見・・・。しかし、この書き方だと64bitビルドで消滅するのではないか？
FFI_WIN64って何？
X86_WIN64って何だろう。何故、STD_CALLが無いのか。もしかして、IA64のことなのか。
どうやら、そのよう定義済みプリプロセッサー・シンボルの使用。
うちはamd64なのでnot IA64。
node-ffiのどこでX86_WIN64が定義されているのか
node_modules/ffi/deps/libffi/config/win/x64
/* Specify which architecture libffi is configured for. */
#ifndef X86_WIN64
#define X86_WIN64
#endif

とりあえず書き換えて、
#ifndef X86_WIN32
#define X86_WI32
#endif

> cd node_modules/ffi
> npm install
> node-gyp rebuild

libffi.lib(ffi.obj) : error LNK2001: 外部シンボル "ffi_closure_raw_THISCALL" は未解決です。 [D:\dev\_web\neuron.
js\node_modules\ffi\build\ffi_bindings.vcxproj]
libffi.lib(ffi.obj) : error LNK2001: 外部シンボル "ffi_closure_SYSV" は未解決です。 [D:\dev\_web\neuron.js\node_
modules\ffi\build\ffi_bindings.vcxproj]
libffi.lib(ffi.obj) : error LNK2001: 外部シンボル "ffi_closure_STDCALL" は未解決です。 [D:\dev\_web\neuron.js\no
de_modules\ffi\build\ffi_bindings.vcxproj]
libffi.lib(ffi.obj) : error LNK2001: 外部シンボル "ffi_closure_THISCALL" は未解決です。 [D:\dev\_web\neuron.js\n
ode_modules\ffi\build\ffi_bindings.vcxproj]
libffi.lib(ffi.obj) : error LNK2001: 外部シンボル "ffi_closure_raw_SYSV" は未解決です。 [D:\dev\_web\neuron.js\n
ode_modules\ffi\build\ffi_bindings.vcxproj]
libffi.lib(ffi.obj) : error LNK2001: 外部シンボル "ffi_call_win32" は未解決です。 [D:\dev\_web\neuron.js\node_mo
dules\ffi\build\ffi_bindings.vcxproj]

頓挫・・・。
上記関数の実体がwin32.asmの中にあるが64bitでコンパイルすると失敗する・・・。
libffiを64bitビルドしてstdcallするところから出直さねばならない。
32bit版のnode.jsに妥協
FFI_STDCALLで関数登録
// stdcallのabi番号。Windowsの32bit版Node.js専用
const FFI_STDCALL=2;
// callbackをFFI_STDCALLに設定
const CallbackType = FFI.Function(ref.types.void
    , [ref.refType(ref.types.void)], FFI_STDCALL);

// 関数定義をFFI_STDCALLに設定
const DllLib = FFI.Library("hoge.dll", {
    RegisterCallback: [ref.types.void, [ref.refType(ref.types.void), CallbackType, {abi: FFI_STDCALL}],
}

上記の記述でWindowsの32bit版Node.jsではFFI登録にSTDCALLを設定できたっぽい。
でも、プログラムが死ぬ。
どうやらJavascript層より下で死んでいるようでエラーを吐かずに突然死する。ううむ。
こりゃ、Cのデバッガをアタッチせねばなるまい。
0x016E0008 で例外がスローされました (node.exe 内): 0xC0000005: 場所 0x00000588 の読み取り中にアクセス違反が発生しました

この例外のハンドラーがある場合は、プログラムを安全に続行できます。

uncaughtException
こんなの発見した。
東京Node学園#8 Let It Crash!?
さっそくやってみる
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});

ひっかからないな・・・
自前ビルドしてどう死んでいるか確かめるか。
```
