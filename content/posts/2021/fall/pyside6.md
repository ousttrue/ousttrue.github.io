+++
title = "pyside6 やってみる"
date = 2021-11-16
tags = ["python", "qt"]
+++

# pyside6 の pyi

* <https://doc.qt.io/qtforpython/quickstart.html>

`pip install pyside6`

地味に `pyi` ファイルが同梱されていて、 `pyright` の補助が良く効く。
`vscode` では、 `pylance` 拡張をイストールする。

`settings.json`
```
"python.languageServer": "Pylance",
"python.analysis.typeCheckingMode": "basic",
```

一部解決不能なエラーが出るので、

```python
open_action.triggered.connect(self.open_dialog)  # type: ignore
```

のように明示的に型チェックを無効にする。

* <https://github.com/microsoft/pylance-release/issues/196>
* <https://github.com/microsoft/pylance-release/issues/333>

# tutorials

* <https://doc.qt.io/qtforpython/tutorials/index.html>

# Widgets

* <https://doc.qt.io/qtforpython/PySide6/QtWidgets/index.html>

# QMainWindow

* <https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QMainWindow.html>
* <https://www.pythonguis.com/tutorials/pyside6-creating-your-first-window/>


```python
class MyWidget(QtWidgets.QMainWindow):
    def __init__(self):
        super().__init__()
        self.text = QtWidgets.QLabel("Hello World",
                                     alignment=QtCore.Qt.AlignCenter)
        self.setCentralWidget(self.text)


if __name__ == "__main__":
    import sys
    app = QApplication(sys.argv)
    widget = MyWidget()
    widget.show()
    widget.resize(800, 600)
    sys.exit(app.exec())
```

## QDockWidget

* <https://pythonpyqt.com/qdockwidget/>

## menu

```python
        menu = self.menuBar()
        file_menu = menu.addMenu("&File")
        # file_menu.addAction(button_action)
```

## toolbar

```
        toolbar = QtWidgets.QToolBar("My main toolbar")
        self.addToolBar(toolbar)
        button_action = QtGui.QAction("Click me!", self)
        button_action.setStatusTip("rundom text")
        button_action.triggered.connect(self.magic)
        toolbar.addAction(button_action)
```

## file dialog

* <https://doc.qt.io/qtforpython/PySide6/QtWidgets/QFileDialog.html>

# OpenGL

* <https://ousttrue.github.io/glglue/samples/pyside6.html>

# Signal

* <https://www.pythoncentral.io/pysidepyqt-tutorial-creating-your-own-signals-and-slots/>

# Timeline

* <https://doc.qt.io/qtforpython/PySide6/QtCore/QTimeLine.html>

# Tree

* <https://fereria.github.io/reincarnation_tech/11_PySide/02_Tips/ViewModelDelegate/custom_model/>

# メモ

* <https://pyqt-node-editor.readthedocs.io/en/latest/introduction.html#installation>

