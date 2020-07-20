---
Title: "PyQtのTreeWidget"
Published: 2017-10-14
Tags: ["python", "qt"]
---

QTreeWigetの使い方


PyQt QTreeWidget サンプル
PySide 編集可能なQTreeWidgetを作る

Sample
from logging import getLogger
logger = getLogger(__name__)

import sys
from PySide import QtGui, QtCore


class TreeWindow(QtGui.QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle('Main window')
        self.treeWidget=self.createTreeWidget()
        self.setCentralWidget(self.treeWidget)

    def createTreeWidget(self):
        treeWidget = QtGui.QTreeWidget(self)
        #treeWidget.setColumnCount(5)
        treeWidget.setHeaderLabels(["名前", "値"])
        return treeWidget


class DataItem:
    def __init__(self, name, value, *children):
        self.columns=[name, str(value)]
        self.children=children


def addTreeItem(parent, data):
    item=QtGui.QTreeWidgetItem(data.columns)
    if isinstance(parent, QtGui.QTreeWidget):
        parent.addTopLevelItem(item)
    else:
        parent.addChild(item)
    # Treeにaddした後でexpandする
    item.setExpanded(True)

    for child in data.children:
        addTreeItem(item, child)


if __name__ == '__main__':
    from logging import DEBUG, basicConfig
    basicConfig(
           level=DEBUG
           )

    app = QtGui.QApplication(sys.argv)
    window = TreeWindow()

    addTreeItem(window.treeWidget, DataItem('name0', '500'
        , DataItem('name0_0', '550')
        , DataItem('name0_1', '560')
        ))

    addTreeItem(window.treeWidget, DataItem('name1', '600'
        , DataItem('name1_0', '550'
            , DataItem('name1_0_0', 555)
            )
        ))

    window.show()
    window.resize(640, 480)
    sys.exit(app.exec_())

TreeWidget
scrollToItem
setCurrentItem
indexFromItem
TreeWidgetItem
setText
childCount
