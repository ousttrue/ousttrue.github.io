"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6283],{8964:function(e,n,t){t.r(n),t.d(n,{default:function(){return m}});var l=t(1151),r=t(7294);function a(e){const n=Object.assign({p:"p",a:"a",pre:"pre",code:"code",h1:"h1",h2:"h2"},(0,l.ah)(),e.components);return r.createElement(r.Fragment,null,r.createElement(n.p,null,"Pythonのロガーの設定をどうすればいいのか。"),"\n",r.createElement(n.p,null,r.createElement(n.a,{href:"https://qiita.com/amedama/items/b856b2f30c2f38665701"},"ログ出力のための print と import logging はやめてほしい")),"\n",r.createElement(n.p,null,"を元に模索してみた。\n今使っている設定\nすべてのファイルの先頭にはこれだけ書いておく。\nいわばログ入力の設定。"),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-py"},"from logging import getLogger\nlogger = getLogger(__name__)\n")),"\n",r.createElement(n.p,null,"これとは別に、ログ出力の設定を一か所だけ記述する。\nメインの始まるところがいいんでないか。\n他のライブラリをimportするより前に書きたいということもあるだろうからその辺はお好みで。"),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-py"},"if __name__=='__main__':\n    # defaultのlogレベルではdebug出ないよ\n    logger.debug('before')\n\n    from logging import basicConfig, DEBUG\n    basicConfig(\n        level=DEBUG,\n        datefmt='%H:%M:%S',\n        format='%(asctime)s[%(levelname)s][%(name)s.%(funcName)s] %(message)s'\n    )\n\n    # 以降出る\n    logger.debug('after')\n")),"\n",r.createElement(n.p,null,"以上で、デフォルトのログ設定を使ってログが画面に出力される。\nデフォルトのログ設定とは\n上記のプログラムでは以下のようにログが流れる。"),"\n",r.createElement(n.pre,null,r.createElement(n.code,null,"logger.debug('message')\n  |\n  v            propagate(親にメッセージが伝搬する)\nlogger(__name__) -> logger('')\n  handlers[           handlers[\n  ]                     Streamhandler -> コンソール画面\n                      ]\n")),"\n",r.createElement(n.p,null,"pythonのロガーは木構造\n",r.createElement(n.code,null,"getLogger(__name__)")," で得たロガーは ",r.createElement(n.code,null,"__name__")," という名前になり、",r.createElement(n.code,null,"''")," という名のロガーが親になる。"),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-py"},"print(getLogger(''))\n<RootLogger root (WARNING)>\n")),"\n",r.createElement(n.p,null,"というように ",r.createElement(n.code,null,"''")," ロガーはルートロガーである。\nどういう基準で親子が決まるかというと名前ベースで ",r.createElement(n.code,null,"''")," がすべての親、その子 ",r.createElement(n.code,null,"'hoge'")," 、さらにその子 ",r.createElement(n.code,null,"'hoge.fuga'")," というように ",r.createElement(n.code,null,".")," をセパレータとしたパス名で決めているぽい。 ",r.createElement(n.code,null,"getLogger(__name__)")," という風にロガーを得れば、とりあえず ",r.createElement(n.code,null,"getLogger('')")," の子孫になる。"),"\n",r.createElement(n.p,null,"https://docs.python.org/2/library/logging.html#logger-objects"),"\n",r.createElement(n.p,null,"さらにログは木構造を親に向かって遡りながら、通り道にあったhandlerに出力される。\nなのですべての親になるルートロガーにひとつだけhandlerをセットしておけばよい。"),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-py"},"print(logger.handlers)\n[]\n")),"\n",r.createElement(n.h1,null,"ルートロガーにはデフォルトでStreamHandlerがセットされている"),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-py"},"print(getLogger('').handlers)\n[<StreamHandler <stderr> (NOTSET)>]\n")),"\n",r.createElement(n.p,null,"親に向かって流すかどうかを設定するには以下のようにする。"),"\n",r.createElement(n.h1,null,"親に流さない"),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-py"},"logger.propagate=False\n")),"\n",r.createElement(n.p,null,"前知識としてこれくらいあればカスタマイズできる。\n出力のカスタマイズ\n基本的に、ルートロガーに好みのフォーマットやハンドラを設定することになると思う。\nデフォルトのStreamHandlerを削除する"),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-py"},"getLogger('').handlers.clear()\n")),"\n",r.createElement(n.h2,null,"Formatを変えよう"),"\n",r.createElement(n.p,null,"サーバー風の時刻付きのフォーマットとか。"),"\n",r.createElement(n.h2,null,"デフォルトのハンドラを得る"),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-py"},"handler=getLogger('').handlers[0]\n")),"\n",r.createElement(n.h2,null,"もしくは自前で作る"),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-py"},"from logging import StreamHandler\nhandler=StreamHandler()\ngetLogger('').addHandler(handler)\n\nfrom logging import Formatter\nformatter=Formatter('%(name)s => %(asctime)s [%(levelname)s] %(message)s')\nhandler.setFormatter(formatter)\n")),"\n",r.createElement(n.p,null,"使える変数は、LogRecord attributesらしい。"),"\n",r.createElement(n.p,null,"https://docs.python.org/2/library/logging.html#logrecord-attributes"),"\n",r.createElement(n.p,null,"日付のカスタマイズは？"),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-py"},"basicConfig(\n       datefmt='%H:%M:%S',\n       format='%(asctime)s[%(levelname)s] %(name)s.%(funcName)s => %(message)s')\n       )\n")),"\n",r.createElement(n.h2,null,"色付きにしよう"),"\n",r.createElement(n.p,null,"おされなコンソール"),"\n",r.createElement(n.p,null,"Pythonで色つきログを - rainbow_logging_handler をPyPIにリリースしました"),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-py"},"from rainbow_logging_handler import RainbowLoggingHandler\nhandler = RainbowLoggingHandler(sys.stderr)\ngetLogger('').addHandler(handler)\n")),"\n",r.createElement(n.p,null,"QtのWidgetに出力する\nStackOverflowとかで見つけた気がするがとりあえず。"),"\n",r.createElement(n.p,null,"https://github.com/buha/gpibcs/blob/master/qplaintexteditlogger.py"),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-py"},"class QPlainTextEditLogger(logging.Handler):\n    '''\n    Logger\n    '''\n    def __init__(self):\n        super().__init__()\n        self.widget=None\n\n    def set_widget(self, widget):\n        self.widget = widget\n        self.widget.setReadOnly(True)\n\n    def emit(self, record):\n\n        msg = self.format(record)\n        if not self.widget:\n            print(msg)\n            return\n\n        if not msg.endswith(\"\\n\"):\n            msg+=\"\\n\"\n        self.widget.textCursor().movePosition(QtGui.QTextCursor.Start)\n        self.widget.textCursor().insertText(msg)\n        #self.widget.insertPlainText(msg)\n\n    def write(self, m):\n        pass\n\nhandler=QPlainTextEditLogger()\ngetLogger('').addHandler(handler)\n")),"\n",r.createElement(n.p,null,"ログレベル別に色を付けてみる"),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-py"},"    def emit(self, record):\n        msg = self.format(record)\n        if not self.widget:\n            print(msg)\n            return\n\n        if record.levelno == DEBUG:\n            msg = f'<font color=\"gray\">{msg}</font><br>'\n        elif record.levelno == WARNING:\n            msg = f'<font color=\"orange\">{msg}</font><br>'\n        elif record.levelno == ERROR:\n            msg = f'<font color=\"red\">{msg}</font><br>'\n        else:\n            msg = f'{msg}<br>'\n\n        self.widget.textCursor().movePosition(QtGui.QTextCursor.Start)\n        self.widget.textCursor().insertHtml(msg)\n")))}var o=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?r.createElement(n,e,r.createElement(a,e)):a(e)};t(8678);function g(e){let{data:n,children:t}=e;return r.createElement(r.Fragment,null,r.createElement("h1",null,n.mdx.frontmatter.title),r.createElement(l.Zo,null,t))}function m(e){return r.createElement(g,e,r.createElement(o,e))}},8678:function(e,n,t){t(7294)},1151:function(e,n,t){t.d(n,{Zo:function(){return g},ah:function(){return a}});var l=t(7294);const r=l.createContext({});function a(e){const n=l.useContext(r);return l.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const o={};function g({components:e,children:n,disableParentContext:t}){let g;return g=t?"function"==typeof e?e({}):e||o:a(e),l.createElement(r.Provider,{value:g},n)}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2017-python-logger-md-289762c6d0dbfe2112f4.js.map