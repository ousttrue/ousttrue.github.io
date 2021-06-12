---
title: "Pythonモジュールをユーザーローカルにインストールする"
date: 2013-05-30
Tags: []
---

Pythonモジュールをユーザーローカルにインストールする
$ python setup.py installをユーザローカルにインストールする方法
$ PYTHONPATH=$HOME/local/lib64/python3.2/site-packages python setup.py install --prefix=$HOME/local

ではなく下がよい

$ python setup.py install --user

--prefixの値と環境変数PYTHONPATHの値が対応している必要がある。
PYTHONPATHにはsite-packagesまでを指定する。
devlopの場合は、
$ python setup.py develop --user


http://docs.python.org/2/install/#alternate-installation-the-user-scheme

