---
title: "SimpleAbcViewerをビルドしてみる"
date: 2017-07-28
taxonomies: {tags: ['vcpkg', 'cg']}
---

alembic-1.7.1に無かったので、alembic-1.5.8から発掘してビルドしてみた。

* https://github.com/ousttrue/SimpleAbcViewer

CMakeLists.txtを再構成して、ビルド・動作を確認できた。
SimpleAbcViewerが消えたのは、SimpleじゃないAbcViewができて分離したからぽい。

* https://github.com/alembic/abcview

こっちはQt4を使っていてWindowsではシンプルじゃなかったので、ビルドを断念したのであった・・・。
SimpleAbcViewerのAbcOpenGLを読めばAlembicのAPI(読む方)が分かりそう。
書く方は、mmdbridgeを読むのがよさげ。
タコのサンプルを表示。

* https://code.google.com/archive/p/alembic/downloads?page=2
