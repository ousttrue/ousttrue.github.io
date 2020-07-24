---
Title: "カスタムデリゲート"
Published: 2012-12-26
Tags: []
---

C++のQt4と平行してPyQt4を使い始めた。大概の用途にはこっちで十分な気がする。

pyqtのチュートリアルには、

http://zetcode.com/tutorials/pyqt4/

がいい。wxWidgetsとかgtkでも世話になったが、ここのチュートリアルはサンプルが小さいので助かる。
ビューのアイテム表示をカスタマイズするデリゲートについて調査中。
# !/usr/bin/python
# -*- coding: utf-8 -*-

import sys from PyQt4 import QtGui, QtCore from random import randint

class CustomDelegate(QtGui.QItemDelegate):

  def \_\_init\_\_(self, parent = None):
 
  :   super(CustomDelegate, self).\_\_init\_\_(parent) self.editor
      = QtGui.QSpinBox()
 
  \# 編集時
  ---------
 
  \# create widget def createEditor(self, parent, styleOption, index):
  editor = QtGui.QSpinBox(parent) return editor
 
  \# model to editor def setEditorData(self, editor, index):
  data=index.model().data(index, QtCore.Qt.EditRole)
  editor.setValue(data.toInt()\[0\])
 
  \# editor to model def setModelData(self, editor, model, index):
  model.setData(index, editor.value())
 
  def updateEditorGeometry(self, editor, option, index):
 
  :   editor.setGeometry(option.rect)
 
  \# 通常時
  ---------
 
  \# item render def paint(self, painter, option, index): widget =
  QtGui.QLabel() \#widget = QtGui.QSpinBox()
  data=index.model().data(index, QtCore.Qt.EditRole)
  widget.setText(data.toString()\[0\])
  \#widget.setValue(data.toInt()\[0\]) widget.setGeometry(option.rect)
  \# border ? point=QtCore.QPoint(option.rect.left()+2,
  option.rect.top()+2) widget.render(painter, point)
 
  \# item一個分の大きさ
  ---------------------
 
  def sizeHint(self, option, index):
 
  :   self.editor.setGeometry(option.rect)
      return self.editor.sizeHint()
 
def main():

:   app = QtGui.QApplication(sys.argv)

    \# setup model model = QtGui.QStandardItemModel() for n in
    range(10): item = QtGui.QStandardItem('%s' % randint(1, 100))
    model.appendRow(item)

    view = QtGui.QListView()
    view.setModel(model) view.setItemDelegate(CustomDelegate())
    view.show()

    sys.exit(app.exec\_())

if \_\_name\_\_ == '\_\_main\_\_':

:   main()


QItemDelegateは非編集時のアイテム描画にpaintメソッドを使い、編集時の描画にcreateEditor,
setEditorData, setModelData,
updateEditorGeometryを使う。カスタムデリゲートにするとアイテムの大きさが変わりそうなのでsizeHintも実装するとよさげ。
