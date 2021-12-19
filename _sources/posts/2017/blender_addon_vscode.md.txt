+++
title = "BlenderのAddOnを、VSCodeでデバッグする"
date = 2017-11-23
tags = ["blender", "vscode"]
+++

VSCodeのリモートデバッグを利用してBlenderのPythonにデバッガをアタッチする。

[PTVSD](https://pypi.python.org/pypi/ptvsd)

VisualStudioのPTVS向けのリモートデバッグモジュール。VSCodeも対応しているらしい。
リモート側でptvsdをimportして待ち受けて、VisualStudio側からtcp経由でアタッチする。

```python
import ptvsd
ptvsd.enable_attach(secret = 'secret', ('0.0.0.0', 3000))

if os != 'Windows':
    ptvsd.wait_for_attach() # スクリプトが終わらないようにブロックする
```

```
+--------------+
|remoteのpython|
|         ptvsd|tcp:3000 <-- VisualStudio attach
+--------------+
```

dos窓
```
> netstat -an | find "3000"
  TCP         0.0.0.0:3000           0.0.0.0:0              LISTENING
```

確かに待っている。
TCP経由なのでptvsd側が、LinuxやRasPi、Blenderの組み込みPythonなどなんであってもアタッチできる。
素のPythonでやってみる

Windows10(64bit)
Python-3.6
PTVSD-3.0.0

PTVSDのバージョンが3.0.0でないと
デバッグアダプタープロセスが予期せず終了しました。

等のエラーが出てうまくいかぬ。

https://github.com/DonJayamanne/pythonVSCode/issues/1039

ptvsdのインストール
```
> py -3.6 -m pip install ptvsd==3.0.0
```

testプロジェクト
```
> mkdir ptvsd_test
```

VSCodeでptvsd_testフォルダを開く。
testスクリプト
ptvsd_test/main.py
```python
import time

# PTVSDを準備する
import ptvsd
listen = ('0.0.0.0', 3000)
ptvsd.enable_attach('my_secret', listen)

print('wait_for_attach...', listen)
ptvsd.wait_for_attach() # リモートデバッガの接続を待つ

time.sleep(1) # 接続後少し待つ
print('connected')

# デバッグするコード
i = 0
while True:
    print(i)
    i += 1
    time.sleep(1)
```

```
>py -3.6 main.py
wait_for_attach... ('0.0.0.0', 3000)
```

VSCodeから接続
ptvsd_test/main.pyを開いてデバッグ開始。構成の追加でpythonを選択する。

ptvsd_test/.vscode/launch.json
```json
{
    // IntelliSense を使用して利用可能な属性を学べます。
    // 既存の属性の説明をホバーして表示します。
    // 詳細情報は次を確認してください: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Python",
            "type": "python",
            "request": "launch",
            "stopOnEntry": true,
            "pythonPath": "${config:python.pythonPath}",
            "program": "${file}",
            "cwd": "${workspaceRoot}",
            "env": {},
            "envFile": "${workspaceRoot}/.env",
            "debugOptions": [
                "WaitOnAbnormalExit",
                "WaitOnNormalExit",
                "RedirectOutput"
            ]
        },
        { // これ
            "name": "Python: Attach",
            "type": "python",
            "request": "attach",
            "localRoot": "${workspaceRoot}",
            "remoteRoot": "${workspaceRoot}",
            "port": 3000,
            "secret": "my_secret",
            "host": "localhost"
        },

        // 以降省略
}
```

デバッグの選択メニューでPython:Attachを選択。改めて開始。
うまく接続できればデバッグコンソールにprintした内容が表示される。
breakポイントもステップ実行も可能。素晴らしい。
BlenderのAddOnでやってみる

https://github.com/Barbarbarbarian/Blender-VScode-Debugger

これ。
BlenderのPythonにptvsdをインストールする
Blenderを起動して以下のスクリプトを実行する。

```python
import sys
for x in sys.path:
    print(x)
```

適当なパスを選んでそこにptvsd-3.0.0をコピーする。
ptvsd-3.0.0.zipをダウンロード。
解凍してptvsdフォルダをBlenderのsys.pathに含まれていたC:/Program Files/Blender Foundation/Blenderにコピーした。
Blender-VScode-Debuggerをインストールする

File - UserPreferences - Add-ons と潜ってinstall Add-on from FileボタンからBlender_VScode_Debugger.pyを選択する。
Add-onsからDevelopment: Debugger for Visual Codeを選択してチェックボックスをOnにする
三角を押してPreferencesを展開、Path of PTVSD module:にptvsdをインストールしたパスを設定する(うちではC:/Program Files/Blender Foundation/Blender)
Save - User Settings

実行してみる
3DViewでspaceを押してConnect to Visual Studio Code Debuggerを選択。
dos窓

```
> netstat -an | find "3000"
  TCP         0.0.0.0:3000           0.0.0.0:0              LISTENING
```

待っている。
試しにAddOnを作ってみる
例えばWindows版のBlenderのAddOnパスは
C:/Users/__USER_NAME__/AppData/Roaming/Blender Foundation/Blender/2.79/scripts/addons
です。
Hello AddOnを作る。
hello.pyとhello/__init__.pyという選択肢があるが、後者で作る。
gitやVSCodeを使うのだからフォルダが独立している方がよろしい。
helloフォルダを作って、VSCodeでフォルダを開いた。
hello/__init__.pyを作成。

https://docs.blender.org/manual/en/dev/advanced/scripting/addon_tutorial.html

を参考に。

```python
bl_info = {
    "name": "Move X Axis",
    "category": "Object",
}

import bpy


class ObjectMoveX(bpy.types.Operator):
    """My Object Moving Script"""      # Use this as a tool-tip for menu items and buttons.
    bl_idname = "object.move_x"        # Unique identifier for buttons and menu items to reference.
    bl_label = "Move X by One"         # Display name in the interface.
    bl_options = {'REGISTER', 'UNDO'}  # Enable undo for the operator.

    def execute(self, context):        # execute() is called when running the operator.

        # The original script
        scene = context.scene
        for obj in scene.objects:
            obj.location.x += 1.0

        return {'FINISHED'}            # Lets Blender know the operator finished successfully.

def register():
    bpy.utils.register_class(ObjectMoveX)


def unregister():
    bpy.utils.unregister_class(ObjectMoveX)


# This allows you to run the script directly from Blenders Text editor
# to test the add-on without having to install it.
if __name__ == "__main__":
    register()
```

Blenderを再起動して、AddOnのチェックボックスを有効にする。
3DViewでスペースを押してMove X by oneを実行してみる。
動けば準備完了。
AddOnをステップ実行してみる

3DViewでConnect to Visual Studio Code Debugger
VSCodeで構成を追加してRemoteDebuggerでアタッチ

hello/.vscode/launch.json
```json
        {
            "name": "Python: Attach",
            "type": "python",
            "request": "attach",
            "localRoot": "${workspaceRoot}",
            "remoteRoot": "${workspaceRoot}",
            "port": 3000,
            "secret": "my_secret",
            "host": "localhost"
        },
```

VSCodeでexecute関数のscene=context.sceneにbreak pointをセットする
3DViewでMove X by one


うまくいった。

## Memo

Blenderプロセスが生きていればいいのでptvsd.wait_for_attach()する必要はない
Pythonのターンになるまで接続が処理されないので、VSCodeからアタッチした後AddOnを実行するまでVSCodeは待ち状態になる
