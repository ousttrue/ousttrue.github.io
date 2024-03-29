---
title: "node.js(Windows版)を自前ビルドする"
date: 2015-12-21
tags: []
---

謎のクラッシュ(FFI でネイティブプラグインがアクセス違反で死ぬ)を追跡するため、
VC のデバッガをアタッチするべく自前ビルドする。
node-v5.3.0.tar.xz

```
7zipで解凍。
python2系にpathを通してvcbuild.batをたたく。
> vcbuild.bat

v8もlibuvも全部入りらしくあっさりとほぼビルドできた。
SignTool Error: No certificates were found that met all the given criteria.
Failed to sign exe

document
https://github.com/nodejs/node-v0.x-archive/wiki/Installation#building-on-windows
debugビルドの作り方はこう。
> vcbuild.bat nosign debug

nodeをデバッグ実行

node-v5.3.0にnode.slnができているのでこれをVisualStudio2015で開く。
nodeをスタートアッププロジェクトに指定
nodeの設定のdebugタブで、カレントディレクトリとコマンドライン引数を指定
f5

例外が再現した
void CallbackInfo::DispatchToV8(callback_info *info, void *retval, void **parameters, bool dispatched) {
  Nan::HandleScope scope;

  static const char* errorMessage = "ffi fatal: callback has been garbage collected!";

  if (info->function == NULL) {
    // throw an error instead of segfaulting.
    // see: https://github.com/rbranson/node-ffi/issues/72
    if (dispatched) {
        Local<Value> errorFunctionArgv[1];
        errorFunctionArgv[0] = Nan::New<String>(errorMessage).ToLocalChecked();
        info->errorFunction->Call(1, errorFunctionArgv);
    }
    else {
      Nan::ThrowError(errorMessage);
    }
  } else {
    // invoke the registered callback function
    Local<Value> functionArgv[2];
    functionArgv[0] = WrapPointer((char *)retval, info->resultSize);
    functionArgv[1] = WrapPointer((char *)parameters, sizeof(char *) * info->argc);
    Local<Value> e = info->function->Call(2, functionArgv); // <-- ここ。functionがnullptrになってるよ!
    if (!e->IsUndefined()) {
      if (dispatched) {
        Local<Value> errorFunctionArgv[1];
        errorFunctionArgv[0] = e;
        info->errorFunction->Call(1, errorFunctionArgv);
      } else {
        Nan::ThrowError(e);
      }
    }
  }
}

ううむ。if文でnullチェックしてるのにelse側に落ちてるな。矢張りスレッドとかGCが絡んでいそうな気がするぞ。
ちょうどnode-ffiでjavascriptのコールバックを呼び出しているところなのではないか。
コールスタック
>   ffi_bindings.node!CallbackInfo::DispatchToV8(_callback_info * info, void * retval, void * * parameters, bool dispatched) 行 73   C++
    ffi_bindings.node!CallbackInfo::WatcherCallback(uv_async_s * w, int revents) 行 94   C++
    node.exe!uv_process_async_wakeup_req(uv_loop_s * loop, uv_async_s * handle, uv_req_s * req) 行 97    C

よく見るとまさにffi_bindings.node(node-ffiのネイティブプラグイン)内で問題が発生している。
呼び出しスレッドはメインスレッドか・・・。
何回も試してみると例外がむしろdllのスレッド側で起こることの方が多い。
他にWaitSingleObjectがstdcallの関数をスレッド実行しているものが４本。
ひょっとして、コールバックの頻度が高すぎなんじゃないのか・・・。
callback_infoはffiの構造体。こいつのデストラクタが呼ばれているのが確認できれば手がかりになるな。
で、callback_info->functionを解放する下記の部分がメインスレッドから呼ばれて、その後に
スレッドからのコールバック呼び出しがクラッシュしているらしいことを発見。
node_modules/ffi/src/callback_info.cc
/*
 * Called when the `ffi_closure *` pointer (actually the "code" pointer) get's
 * GC'd on the JavaScript side. In this case we have to unwrap the
 * `callback_info *` struct, dispose of the JS function Persistent reference,
 * then finally free the struct.
 */

void closure_pointer_cb(char *data, void *hint) {
  callback_info *info = reinterpret_cast<callback_info *>(hint);
  // dispose of the Persistent function reference
  delete info->function;
  info->function = NULL;
  // now we can free the closure data
  ffi_closure_free(info);
}

コールスタック
>   ffi_bindings.node!closure_pointer_cb(char * data, void * hint) 行 42 C++
    node.exe!node::Buffer::CallbackInfo::WeakCallback(v8::Isolate * isolate, v8::Local<v8::Object> object) 行 159    C++

     省略

    node.exe!v8::internal::Heap::CollectGarbage(v8::internal::AllocationSpace space, const char * gc_reason, const v8::GCCallbackFlags callbackFlags) 行 556 C++

     省略

    node.exe!node::Buffer::New(v8::Isolate * isolate, char * data, unsigned int length, void (char *, void *) * callback, void * hint) 行 347    C++
    binding.node!`anonymous namespace'::WrapPointer(char * ptr, unsigned int length) 行 147  C++
    binding.node!`anonymous namespace'::ReadPointer(const Nan::FunctionCallbackInfo<v8::Value> & info) 行 261    C++
    binding.node!Nan::imp::FunctionCallbackWrapper(const v8::FunctionCallbackInfo<v8::Value> & info) 行 174  C++

なんか、GCが発動して回収されちゃっているぽい？
2015/09/20
* Nodejs GC is crashing when a C function is returning NULL
むしろこっちか
2015/11/05
* Node.js v5.0.0でnode-ffiやNodObjCが動かない
しかし、うちのnode.jsは
> node --version
v5.3.0

うむ。
むしろこっちか
2015/09/15
* ffi.Function underlying Callback is garbage collected
死ななくなった。これっぽいな。
64bit版で試してみる
これはこれで死ぬ。
まとめ

node-ffiのFunctionでGCに回収されてしまう書き方のところがある(FFI.Function内)
32bit版のnode-ffiではSTDCALLを指定できる(ABI=2)
64bit版のnode-ffiではIA64にされるのでSTDCALLは動かぬ

gypでのIA64とX64の扱いの違いがわかったら修正できるかな。
X86_WIN32の時にFFI_STDCALLを定義する修正をプルリクしてみよう。
```
