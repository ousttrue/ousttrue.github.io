"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6879],{5544:function(e,n,t){t.r(n);var l=t(1151),a=t(7294);function o(e){const n=Object.assign({p:"p",a:"a",h2:"h2",pre:"pre",code:"code",ul:"ul",li:"li",h3:"h3"},(0,l.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(n.p,null,"ソースの方のリポジトリがハードディスククラッシュで失われて\n更新できなくなっていたので、サイトを作りなおし。\n",a.createElement(n.a,{href:"https://wyam.io/"},"wyam"),"を使ってみる。"),"\n",a.createElement(n.h2,null,"インストール"),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,"$ dotnet tool install -g Wyam.Tool\n")),"\n",a.createElement(n.h2,null,"初期化する"),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,"$ mkdir site\n$ cd site\n$ wyam new --recipe blog\n")),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"config.wyam(siteの設定)"),"\n",a.createElement(n.li,null,"input(記事置き場)","\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"about.md"),"\n",a.createElement(n.li,null,"posts","\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"first-post.md"),"\n"),"\n"),"\n"),"\n"),"\n"),"\n",a.createElement(n.h3,null,"設定ファイル"),"\n",a.createElement(n.p,null,"config.wyam がそれで、C# を Roslyn で処理するらしい。\nおもしろい。"),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,'// config.wyam\n#recipe Blog\n#theme Phantom\n\n// Customize your settings and add new ones here\nSettings[Keys.Host] = "ousttrue.github.io";\nSettings[BlogKeys.Title] = "三次元日誌";\nSettings[BlogKeys.Description] = "programming とか";\n\n// Add any pipeline customizations here\n')),"\n",a.createElement(n.p,null,a.createElement(n.code,null,"#recipe Blog")," がパイプライン設定で、 input フォルダの構成と処理を設定している。\n設定ファイルに展開したものを記述することもできるみたい。"),"\n",a.createElement(n.h3,null,"gitignore"),"\n",a.createElement(n.p,null,"https://wyam.io/docs/advanced/what_to_exclude_from_source_control"),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,"#.gitignore\n.vs/\noutput/\nconfig.wyam.hash\nconfig.wyam.dll\nconfig.wyam.packages.xml\n")),"\n",a.createElement(n.h2,null,"生成する"),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,"$ wyam\n")),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"output","\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"index.html"),"\n"),"\n"),"\n"),"\n",a.createElement(n.p,null,a.createElement(n.code,null,"$ wyam --watch --preview")," で更新を監視して livereload できる。"),"\n",a.createElement(n.h3,null,"動作"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"input/posts/ 配下の markdown が /posts/ 下にhtml化される"),"\n",a.createElement(n.li,null,"input/posts/**/hoge.md が /posts/hoge.html のように階層は無くなる"),"\n"),"\n",a.createElement(n.h2,null,"テーマを変えてみる"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"https://wyam.io/recipes/blog/themes/"),"\n"),"\n",a.createElement(n.p,null,"コマンドラインに、 ",a.createElement(n.code,null,"--theme THEME_NAME")," とするか config.wyam に"),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,"// config.wyam\n#theme THEME_NAME\n")),"\n",a.createElement(n.p,null,"とすれば OK。"),"\n",a.createElement(n.h2,null,"appveyor で GitHub-Pages に展開"),"\n",a.createElement(n.p,null,"https://wyam.io/docs/deployment/appveyor"),"\n",a.createElement(n.p,null,"CIよくわかってないので難航したが動くようになった。"),"\n",a.createElement(n.p,null,"GitHub-pages のユーザー頁を使ったので、\nソースのリポジトリと、html置き場のリポジトリを分けた。"),"\n",a.createElement(n.p,null,"ソースのリポジトリに AppVeyor を仕掛けて、\npush したときにビルドして、html置き場に push する。"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-yaml"},'branches:\n  only:\n    - master\n    \nenvironment:\n  access_token:\n    # EDIT the encrypted version of your GitHub access token\n    # https://www.appveyor.com/docs/deployment/github/\n    secure: E+wmFkBHvRVLnVcg9mIBXP7iTXKIqJyi/DewA+0SEtkpWmtiNFKKhYzD4bs0nw2L\n\ninstall:\n  - mkdir ..\\Wyam\n  - mkdir ..\\output\n  # Fetch the latest version of Wyam \n  - "curl -s https://raw.githubusercontent.com/Wyamio/Wyam/master/RELEASE -o ..\\\\Wyam\\\\wyamversion.txt"\n  - set /P WYAMVERSION=< ..\\Wyam\\wyamversion.txt\n  - echo %WYAMVERSION%\n  # Get and unzip the latest version of Wyam\n  - ps: Start-FileDownload "https://github.com/Wyamio/Wyam/releases/download/$env:WYAMVERSION/Wyam-$env:WYAMVERSION.zip" -FileName "..\\Wyam\\Wyam.zip"\n  - 7z x ..\\Wyam\\Wyam.zip -o..\\Wyam -r\n\nbuild_script:\n  - dotnet ..\\Wyam\\Wyam.dll --output ..\\output\n\non_success:\n  # Switch branches to gh-pages, clean the folder, copy everything in from the Wyam output, and commit/push\n  # See http://www.appveyor.com/docs/how-to/git-push for more info\n  - git config --global credential.helper store\n  # EDIT your Git email and name\n  - git config --global user.email ousttrue@gmail.com\n  - git config --global user.name ousttrue\n  - ps: Add-Content "$env:USERPROFILE\\.git-credentials" "https://$($env:access_token):x-oauth-basic@github.com`n"\n  - git checkout gh-pages\n  - git rm -rf .\n  - xcopy ..\\output . /E\n  # EDIT your domain name or remove if not using a custom domain\n  # - echo wyam.io > CNAME\n  # EDIT the origin of your repository - have to reset it here because AppVeyor pulls from SSH, but GitHub won\'t accept SSH pushes\n\n  # 送り先(push できるように environment access token をセットしている)\n  - git remote set-url origin https://github.com/ousttrue/ousttrue.github.io.git\n  # 空の gh-pages ブランチに変更を追加\n  - git add -A\n  - git commit -a -m "Commit from AppVeyor"\n  # gh-pages ブランチから origin の master に送る(use の GitHubPages を使っているので master ブランチ運用)\n  - git push -f origin gh-pages:master\n')),"\n",a.createElement(n.h2,null,"vscode で編集する"),"\n",a.createElement(n.p,null,"watch タスクを作成してバックグランドで ",a.createElement(n.code,null,"input")," の変更を監視。"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-tasks.json"},'{\n    // See https://go.microsoft.com/fwlink/?LinkId=733558\n    // for the documentation about the tasks.json format\n    "version": "2.0.0",\n    "tasks": [\n        {\n            "label": "watch",\n            "type": "shell",\n            "command": "wyam",\n            "args": [\n                "--watch", "--preview",\n            ],\n            "problemMatcher": [\n            ],\n            "isBackground": true\n        },\n    ]\n}\n')),"\n",a.createElement(n.p,null,"launch.json を作成して F5 でブラウザを開く。"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-launch.json"},'{\n    // IntelliSense を使用して利用可能な属性を学べます。\n    // 既存の属性の説明をホバーして表示します。\n    // 詳細情報は次を確認してください: https://go.microsoft.com/fwlink/?linkid=830387\n    "version": "0.2.0",\n    "configurations": [\n        {\n            "type": "chrome",\n            "request": "launch",\n            "name": "Launch Chrome against localhost",\n            "url": "http://localhost:5080",\n            "webRoot": "${workspaceFolder}"\n        }\n    ]\n}\n')),"\n",a.createElement(n.p,null,"自動でリロードがかかるので快適。"),"\n",a.createElement(n.h2,null,"参考"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"https://www.staticgen.com/wyam"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"https://wyam.io/docs/resources/built-with-wyam"),"\n"),"\n"),"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,a.createElement(n.a,{href:"https://qiita.com/MeilCli/items/425a5436aced08ba7062"},"静的サイトジェネレーターでC#を使いたかったからWyamを試したら最高だった")),"\n"),"\n"),"\n",a.createElement(n.p,null,"日本語で wyam に言及しているサイトはこれしかなかった。\nマイナーでござる。"))}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?a.createElement(n,e,a.createElement(o,e)):o(e)}},1151:function(e,n,t){t.d(n,{ah:function(){return o}});var l=t(7294);const a=l.createContext({});function o(e){const n=l.useContext(a);return l.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}}}]);
//# sourceMappingURL=component---content-posts-2019-wyam-start-md-fadd2913e4dcf58bcc37.js.map