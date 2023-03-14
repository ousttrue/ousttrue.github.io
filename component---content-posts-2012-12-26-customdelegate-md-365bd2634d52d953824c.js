"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3969],{9694:function(e,t,n){n.r(t);var i=n(1151),o=n(7294);function r(e){const t=Object.assign({pre:"pre",code:"code"},(0,i.ah)(),e.components);return o.createElement(t.pre,null,o.createElement(t.code,null,"C++のQt4と平行してPyQt4を使い始めた。大概の用途にはこっちで十分な気がする。\n\npyqtのチュートリアルには、\n\nhttp://zetcode.com/tutorials/pyqt4/\n\nがいい。wxWidgetsとかgtkでも世話になったが、ここのチュートリアルはサンプルが小さいので助かる。\nビューのアイテム表示をカスタマイズするデリゲートについて調査中。\n# !/usr/bin/python\n# -*- coding: utf-8 -*-\n\nimport sys from PyQt4 import QtGui, QtCore from random import randint\n\nclass CustomDelegate(QtGui.QItemDelegate):\n\n  def \\_\\_init\\_\\_(self, parent = None):\n\n  :   super(CustomDelegate, self).\\_\\_init\\_\\_(parent) self.editor\n      = QtGui.QSpinBox()\n\n  \\# 編集時\n  ---------\n\n  \\# create widget def createEditor(self, parent, styleOption, index):\n  editor = QtGui.QSpinBox(parent) return editor\n\n  \\# model to editor def setEditorData(self, editor, index):\n  data=index.model().data(index, QtCore.Qt.EditRole)\n  editor.setValue(data.toInt()\\[0\\])\n\n  \\# editor to model def setModelData(self, editor, model, index):\n  model.setData(index, editor.value())\n\n  def updateEditorGeometry(self, editor, option, index):\n\n  :   editor.setGeometry(option.rect)\n\n  \\# 通常時\n  ---------\n\n  \\# item render def paint(self, painter, option, index): widget =\n  QtGui.QLabel() \\#widget = QtGui.QSpinBox()\n  data=index.model().data(index, QtCore.Qt.EditRole)\n  widget.setText(data.toString()\\[0\\])\n  \\#widget.setValue(data.toInt()\\[0\\]) widget.setGeometry(option.rect)\n  \\# border ? point=QtCore.QPoint(option.rect.left()+2,\n  option.rect.top()+2) widget.render(painter, point)\n\n  \\# item一個分の大きさ\n  ---------------------\n\n  def sizeHint(self, option, index):\n\n  :   self.editor.setGeometry(option.rect)\n      return self.editor.sizeHint()\n\ndef main():\n\n:   app = QtGui.QApplication(sys.argv)\n\n    \\# setup model model = QtGui.QStandardItemModel() for n in\n    range(10): item = QtGui.QStandardItem('%s' % randint(1, 100))\n    model.appendRow(item)\n\n    view = QtGui.QListView()\n    view.setModel(model) view.setItemDelegate(CustomDelegate())\n    view.show()\n\n    sys.exit(app.exec\\_())\n\nif \\_\\_name\\_\\_ == '\\_\\_main\\_\\_':\n\n:   main()\n\n\nQItemDelegateは非編集時のアイテム描画にpaintメソッドを使い、編集時の描画にcreateEditor,\nsetEditorData, setModelData,\nupdateEditorGeometryを使う。カスタムデリゲートにするとアイテムの大きさが変わりそうなのでsizeHintも実装するとよさげ。\n"))}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,i.ah)(),e.components);return t?o.createElement(t,e,o.createElement(r,e)):r(e)}},1151:function(e,t,n){n.d(t,{ah:function(){return r}});var i=n(7294);const o=i.createContext({});function r(e){const t=i.useContext(o);return i.useMemo((()=>"function"==typeof e?e(t):{...t,...e}),[t,e])}}}]);
//# sourceMappingURL=component---content-posts-2012-12-26-customdelegate-md-365bd2634d52d953824c.js.map