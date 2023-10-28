---
title: "Pythonのlogger"
date: 2017-10-09
tags: ["python"]
---

Pythonのロガーの設定をどうすればいいのか。

[ログ出力のための print と import logging はやめてほしい](https://qiita.com/amedama/items/b856b2f30c2f38665701)

を元に模索してみた。
今使っている設定
すべてのファイルの先頭にはこれだけ書いておく。
いわばログ入力の設定。

```py
from logging import getLogger
logger = getLogger(__name__)
```

これとは別に、ログ出力の設定を一か所だけ記述する。
メインの始まるところがいいんでないか。
他のライブラリをimportするより前に書きたいということもあるだろうからその辺はお好みで。

```py
if __name__=='__main__':
    # defaultのlogレベルではdebug出ないよ
    logger.debug('before')

    from logging import basicConfig, DEBUG
    basicConfig(
        level=DEBUG,
        datefmt='%H:%M:%S',
        format='%(asctime)s[%(levelname)s][%(name)s.%(funcName)s] %(message)s'
    )

    # 以降出る
    logger.debug('after')
```

以上で、デフォルトのログ設定を使ってログが画面に出力される。
デフォルトのログ設定とは
上記のプログラムでは以下のようにログが流れる。

```
logger.debug('message')
  |
  v            propagate(親にメッセージが伝搬する)
logger(__name__) -> logger('')
  handlers[           handlers[
  ]                     Streamhandler -> コンソール画面
                      ]
```

pythonのロガーは木構造
`getLogger(__name__)` で得たロガーは `__name__` という名前になり、`''` という名のロガーが親になる。

```py
print(getLogger(''))
<RootLogger root (WARNING)>
```

というように `''` ロガーはルートロガーである。
どういう基準で親子が決まるかというと名前ベースで `''` がすべての親、その子 `'hoge'` 、さらにその子 `'hoge.fuga'` というように `.` をセパレータとしたパス名で決めているぽい。 `getLogger(__name__)` という風にロガーを得れば、とりあえず `getLogger('')` の子孫になる。

https://docs.python.org/2/library/logging.html#logger-objects

さらにログは木構造を親に向かって遡りながら、通り道にあったhandlerに出力される。
なのですべての親になるルートロガーにひとつだけhandlerをセットしておけばよい。

```py
print(logger.handlers)
[]
```

# ルートロガーにはデフォルトでStreamHandlerがセットされている

```py
print(getLogger('').handlers)
[<StreamHandler <stderr> (NOTSET)>]
```

親に向かって流すかどうかを設定するには以下のようにする。

# 親に流さない

```py
logger.propagate=False
```

前知識としてこれくらいあればカスタマイズできる。
出力のカスタマイズ
基本的に、ルートロガーに好みのフォーマットやハンドラを設定することになると思う。
デフォルトのStreamHandlerを削除する

```py
getLogger('').handlers.clear()
```

## Formatを変えよう
サーバー風の時刻付きのフォーマットとか。

## デフォルトのハンドラを得る

```py
handler=getLogger('').handlers[0]
```

## もしくは自前で作る

```py
from logging import StreamHandler
handler=StreamHandler()
getLogger('').addHandler(handler)

from logging import Formatter
formatter=Formatter('%(name)s => %(asctime)s [%(levelname)s] %(message)s')
handler.setFormatter(formatter)
```

使える変数は、LogRecord attributesらしい。

https://docs.python.org/2/library/logging.html#logrecord-attributes

日付のカスタマイズは？

```py
basicConfig(
       datefmt='%H:%M:%S',
       format='%(asctime)s[%(levelname)s] %(name)s.%(funcName)s => %(message)s')
       )
```

## 色付きにしよう
おされなコンソール

Pythonで色つきログを - rainbow_logging_handler をPyPIにリリースしました

```py
from rainbow_logging_handler import RainbowLoggingHandler
handler = RainbowLoggingHandler(sys.stderr)
getLogger('').addHandler(handler)
```

QtのWidgetに出力する
StackOverflowとかで見つけた気がするがとりあえず。

https://github.com/buha/gpibcs/blob/master/qplaintexteditlogger.py

```py
class QPlainTextEditLogger(logging.Handler):
    '''
    Logger
    '''
    def __init__(self):
        super().__init__()
        self.widget=None

    def set_widget(self, widget):
        self.widget = widget
        self.widget.setReadOnly(True)

    def emit(self, record):

        msg = self.format(record)
        if not self.widget:
            print(msg)
            return

        if not msg.endswith("\n"):
            msg+="\n"
        self.widget.textCursor().movePosition(QtGui.QTextCursor.Start)
        self.widget.textCursor().insertText(msg)
        #self.widget.insertPlainText(msg)

    def write(self, m):
        pass

handler=QPlainTextEditLogger()
getLogger('').addHandler(handler)
```

ログレベル別に色を付けてみる

```py
    def emit(self, record):
        msg = self.format(record)
        if not self.widget:
            print(msg)
            return

        if record.levelno == DEBUG:
            msg = f'<font color="gray">{msg}</font><br>'
        elif record.levelno == WARNING:
            msg = f'<font color="orange">{msg}</font><br>'
        elif record.levelno == ERROR:
            msg = f'<font color="red">{msg}</font><br>'
        else:
            msg = f'{msg}<br>'

        self.widget.textCursor().movePosition(QtGui.QTextCursor.Start)
        self.widget.textCursor().insertHtml(msg)
```
