---
title: "QTableViewとQAbstractTableModel"
date: 2013-01-04
taxonomies: {tags: []}
---

ディレクトリ表示をする専用のウィジェットがあったような気がするが、練習のため実装。


# !/usr/bin/env python
# coding: utf-8


import re import operator import os import sys import stat from
PyQt4.QtCore import * from PyQt4.QtGui import *

class File(object):
header=[

‘type’, ‘name’, ‘size’, ‘mtime’ ]
def __init__(self, path):
self.path=os.path.abspath(path) self.data=[None, None, None,
None] s=os.stat(path) mode=s[stat.ST_MODE] if
stat.S_ISDIR(mode): self.data[0]=‘dir’ elif
stat.S_ISLNK(mode): self.data[0]=‘link’ elif
stat.S_ISREG(mode): self.data[0]=‘file’ else:
self.data[0]=‘unknown’ self.data[1]=os.path.basename(path)
self.data[2]=s[stat.ST_SIZE]
self.data[3]=s[stat.ST_MTIME]
def __str__(self):
return “<%s %s>” % (self.data[0], self.data[1])
def __getitem__(self, key):
return self.data[key]
def is_dir(self):
return self.data[0]==‘dir’

class MyTableModel(QAbstractTableModel):
def __init__(self, parent, path):

super(MyTableModel, self).__init__(parent) def
get_stat(name): f=File(os.path.join(path, name)) return f
self.data=[get_stat(os.path.join(path, “..”))]+[get_stat(e)
for e in os.listdir(path)]
def rowCount(self, parent):
return len(self.data)
def columnCount(self, parent):
return len(File.header)
def data(self, index, role):
if not index.isValid():

return None
elif role != Qt.DisplayRole:
return None

return self.data[index.row()][index.column()]
def headerData(self, col, orientation, role):
if orientation == Qt.Horizontal and role == Qt.DisplayRole:

return File.header[col]

return None
def sort(self, Ncol, order):
”““Sort table by given column number.
“”” self.emit(SIGNAL(“layoutAboutToBeChanged()”)) self.data =
sorted(self.data,
key=operator.itemgetter(Ncol), reverse=(order!=Qt.DescendingOrder))
self.emit(SIGNAL(“layoutChanged()”))
def getRow(self, index):
return self.data[index]

class MyWindow(QWidget):
def __init__(self, *args): QWidget.__init__(self,*args)

# create the view self.tv = QTableView() # hide
grid self.tv.setShowGrid(False) # hide vertical header vh
= self.tv.verticalHeader() vh.setVisible(False) # set
horizontal header properties hh = self.tv.horizontalHeader()
hh.setStretchLastSection(True) # set column width to fit
contents self.tv.resizeColumnsToContents() # enable
sorting self.tv.setSortingEnabled(True) # layout layout
= QVBoxLayout() layout.addWidget(self.tv) self.setLayout(layout)
# double
click self.tv.doubleClicked.connect(self.onDoubleClick)

def chdir(self, path):

self.tm = MyTableModel(self, path) # set the table
model self.tv.setModel(self.tm)
def onDoubleClick(self, event):
item=self.tm.getRow(event.row()) if not item.is_dir():
return self.chdir(item.path)

def main():
app = QApplication(sys.argv) w = MyWindow() w.chdir(“.”) w.show()
sys.exit(app.exec_())
if __name__ == “__main__“:
main()

ToDo


種類毎のアイコン表示
日付の表示
数字カラムの右寄せ
行選択
FilterProxyModel

