+++
title = "LuaDA"
date = 2021-07-31
taxonomies.tags = ["lua", "luajit", "dap"]
+++

vscode の lua デバッガーに

<https://marketplace.visualstudio.com/items?itemName=tomblind.local-lua-debugger-vscode> を使っていたのだが、

`launch.json` の `args` に `\\` が入るとエラーで起動できない。
Windows で作業しているので、稀によくファイルパスの指定に `\\` が入る。

自前で `DebugAdapter` 作ってみることにした。

<https://github.com/ousttrue/luada>

途中まで実装したのだが、

* luajit.exe + luada.lua

という構成よりは、

* luada.exe

の方が取り回しがよくて、それなら lua 成分をもっと減らして JSON-RPC 制御も `c++` なり `rust` なりにして
lua 埋め込み型の exe が作りやすそう。
元々、 スタンドアロンの lua インタプリタと組み合わせて使う lua スクリプトという方向性で実装していたのだが、
`luajit-2.1.0-beta3` 一辺倒になりつつあるので気分が変わってきたのであった。
これに関しては、今の構成でできるところまでやってみよう。

# VSCode の Extension を作る

* <https://code.visualstudio.com/api/get-started/your-first-extension>

手順通りに初期化した。npm は最新版に更新したほうがよいぽい。

# MockDebug

* <https://code.visualstudio.com/api/extension-guides/debugger-extension>

を読む。

* <https://github.com/microsoft/vscode-mock-debug>

というサンプルがある。

いくつかの機能をまとめて提供する必要がありそう。

* launch.json の設定
* DebugAdapter 本体
* DebugAdapter を起動する

# 実装してみる

## Extension の activate

適当にイベントを登録して

```json
    // package.json
    "activationEvents": [
        "onDebug",
        "onDebugInitialConfigurations",
        "onDebugDynamicConfigurations",
        "onDebugResolve:lua",
        "onLanguage:lua"
    ],
```

`activate` されることを確認

```ts
// src/extension.ts
export function activate(context: vscode.ExtensionContext) {
    console.log('activate luada');
}
```

## Launch

```json
    "contributes": {
        "breakpoints": [
            {
                "language": "lua"
            }
        ],
        "debuggers": [
            {
                "type": "luada",
                "label": "LuaDA",
                "languages": [
                    "lua"
                ],
                // launch.json のテンプレート
                "initialConfigurations": [
                    {
                        "type": "luada",
                        "name": "launch luada",
                        "request": "launch",
                        "program": "${workspaceFolder}/main.lua",
                        "args": []
                    }
                ],
                // request: launch に対して可能な property の定義
                "configurationAttributes": {
                    "launch": {
                        "properties": {
                            "program": {
                                "type": "string",
                                "markdownDescription": "Lua program to debug - set this to the path of the script",
                                "default": "${workspaceFolder}/main.lua"
                            },                            
                            "arg": {
                                "type": "array",
                                "markdownDescription": "Command line argument, arg[1] ... arg[n]",
                                "default": []
                            }                            
                        }
                    }
                }
            }
        ]
    },
```

* activate で DebugAdapterDescriptorFactory を登録
* launch で createDebugAdapterDescriptor を実行する

`src/extensions.ts`
```ts
import * as vscode from 'vscode';


function createDebugAdapterDescriptorFactory(context: vscode.ExtensionContext): vscode.DebugAdapterDescriptorFactory {
    return {
        createDebugAdapterDescriptor(
            session: vscode.DebugSession,
            executable: vscode.DebugAdapterExecutable | undefined
        ): vscode.ProviderResult<vscode.DebugAdapterDescriptor> {
            console.log('launch luada');
            const runtime = "exe";
            const runtimeArgs: string[] = [];
            //
            // デバッグアダプターを起動する
            // 起動したアダプターと vscode は、標準入出力で JSON-RPC により DebugAdapterProtocol で通信する。
            //
            return new vscode.DebugAdapterExecutable(runtime, runtimeArgs);
        }
    };
}

export function activate(context: vscode.ExtensionContext) {
    console.log('activate luada');
    context.subscriptions.push(vscode.debug.registerDebugAdapterDescriptorFactory('luada', createDebugAdapterDescriptorFactory(context)));
}

export function deactivate() { }
```

## Debug Adapter の実装

<https://microsoft.github.io/debug-adapter-protocol/specification>

を見て粛々と実装する。

### [Output Event](https://microsoft.github.io/debug-adapter-protocol/specification#Events_Output)

vscode の DebugConsole に出力されるので早期に作ると print debug の助けになる。

### Logger

* DebugAdapterProtocol のやりとりすべてを記録する機能をアダプター側で作るべし。無いとデバッグ困難に。

例

<https://github.com/Microsoft/vscode-debugadapter-node/blob/main/adapter/src/loggingDebugSession.ts>

## VSIX に出力

<https://code.visualstudio.com/api/working-with-extensions/publishing-extension>

vsce を使う。

package.json に追加。

```json
    "publisher": "ousttrue",
    "repository": {
        "type": "git",
        "url": "https://github.com/ousttrue/luada.git"
    },
```

```
$ npx vsce package
```

# 参考

* <https://github.com/actboy168/lua-debug>
* <https://github.com/tomblind/local-lua-debugger-vscode>
