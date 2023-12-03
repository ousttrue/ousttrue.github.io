---
title: wyam ことはじめ
date: 2019-08-17
tags: ['wyam', 'ssg']
---
ソースの方のリポジトリがハードディスククラッシュで失われて
更新できなくなっていたので、サイトを作りなおし。
[wyam](https://wyam.io/)を使ってみる。

## インストール

```
$ dotnet tool install -g Wyam.Tool
```

## 初期化する

```
$ mkdir site
$ cd site
$ wyam new --recipe blog
```

* config.wyam(siteの設定)
* input(記事置き場)
  * about.md
  * posts
    * first-post.md

### 設定ファイル

config.wyam がそれで、C# を Roslyn で処理するらしい。
おもしろい。

```
// config.wyam
#recipe Blog
#theme Phantom

// Customize your settings and add new ones here
Settings[Keys.Host] = "ousttrue.github.io";
Settings[BlogKeys.Title] = "三次元日誌";
Settings[BlogKeys.Description] = "programming とか";

// Add any pipeline customizations here
```

`#recipe Blog` がパイプライン設定で、 input フォルダの構成と処理を設定している。
設定ファイルに展開したものを記述することもできるみたい。

### gitignore

https://wyam.io/docs/advanced/what_to_exclude_from_source_control

```
#.gitignore
.vs/
output/
config.wyam.hash
config.wyam.dll
config.wyam.packages.xml
```

## 生成する

```
$ wyam
```

* output
  * index.html

`$ wyam --watch --preview` で更新を監視して livereload できる。

### 動作

* input/posts/ 配下の markdown が /posts/ 下にhtml化される
* input/posts/**/hoge.md が /posts/hoge.html のように階層は無くなる

## テーマを変えてみる

* https://wyam.io/recipes/blog/themes/

コマンドラインに、 `--theme THEME_NAME` とするか config.wyam に

```
// config.wyam
#theme THEME_NAME
```

とすれば OK。

## appveyor で GitHub-Pages に展開

https://wyam.io/docs/deployment/appveyor

CIよくわかってないので難航したが動くようになった。

GitHub-pages のユーザー頁を使ったので、
ソースのリポジトリと、html置き場のリポジトリを分けた。

ソースのリポジトリに AppVeyor を仕掛けて、
push したときにビルドして、html置き場に push する。

```yaml
branches:
  only:
    - master
    
environment:
  access_token:
    # EDIT the encrypted version of your GitHub access token
    # https://www.appveyor.com/docs/deployment/github/
    secure: E+wmFkBHvRVLnVcg9mIBXP7iTXKIqJyi/DewA+0SEtkpWmtiNFKKhYzD4bs0nw2L

install:
  - mkdir ..\Wyam
  - mkdir ..\output
  # Fetch the latest version of Wyam 
  - "curl -s https://raw.githubusercontent.com/Wyamio/Wyam/master/RELEASE -o ..\\Wyam\\wyamversion.txt"
  - set /P WYAMVERSION=< ..\Wyam\wyamversion.txt
  - echo %WYAMVERSION%
  # Get and unzip the latest version of Wyam
  - ps: Start-FileDownload "https://github.com/Wyamio/Wyam/releases/download/$env:WYAMVERSION/Wyam-$env:WYAMVERSION.zip" -FileName "..\Wyam\Wyam.zip"
  - 7z x ..\Wyam\Wyam.zip -o..\Wyam -r

build_script:
  - dotnet ..\Wyam\Wyam.dll --output ..\output

on_success:
  # Switch branches to gh-pages, clean the folder, copy everything in from the Wyam output, and commit/push
  # See http://www.appveyor.com/docs/how-to/git-push for more info
  - git config --global credential.helper store
  # EDIT your Git email and name
  - git config --global user.email ousttrue@gmail.com
  - git config --global user.name ousttrue
  - ps: Add-Content "$env:USERPROFILE\.git-credentials" "https://$($env:access_token):x-oauth-basic@github.com`n"
  - git checkout gh-pages
  - git rm -rf .
  - xcopy ..\output . /E
  # EDIT your domain name or remove if not using a custom domain
  # - echo wyam.io > CNAME
  # EDIT the origin of your repository - have to reset it here because AppVeyor pulls from SSH, but GitHub won't accept SSH pushes

  # 送り先(push できるように environment access token をセットしている)
  - git remote set-url origin https://github.com/ousttrue/ousttrue.github.io.git
  # 空の gh-pages ブランチに変更を追加
  - git add -A
  - git commit -a -m "Commit from AppVeyor"
  # gh-pages ブランチから origin の master に送る(use の GitHubPages を使っているので master ブランチ運用)
  - git push -f origin gh-pages:master
```

## vscode で編集する

watch タスクを作成してバックグランドで `input` の変更を監視。

```tasks.json
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
            "label": "watch",
            "type": "shell",
            "command": "wyam",
            "args": [
                "--watch", "--preview",
            ],
            "problemMatcher": [
            ],
            "isBackground": true
        },
    ]
}
```

launch.json を作成して F5 でブラウザを開く。

```launch.json
{
    // IntelliSense を使用して利用可能な属性を学べます。
    // 既存の属性の説明をホバーして表示します。
    // 詳細情報は次を確認してください: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost",
            "url": "http://localhost:5080",
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

自動でリロードがかかるので快適。

## 参考

* https://www.staticgen.com/wyam
  * https://wyam.io/docs/resources/built-with-wyam

* [静的サイトジェネレーターでC#を使いたかったからWyamを試したら最高だった](https://qiita.com/MeilCli/items/425a5436aced08ba7062)

日本語で wyam に言及しているサイトはこれしかなかった。
マイナーでござる。
