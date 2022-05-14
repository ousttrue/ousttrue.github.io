+++
date = 2022-05-14
tags = ["python", "ssg"]
title = "Nikola復活"
+++

# Nikola復活

[nikola](https://getnikola.com/) 復活。

<https://github.com/ousttrue/dotfiles/blob/master/dodo.py>

を作りながら [doit](https://pydoit.org/) を学んだし、 [jinja](https://jinja.palletsprojects.com/en/3.1.x/)
も少しやったので、前よりは読めそう。
使いながら、 nikola のコードを読んで、 doit のカスタムタスクの使い方を眺めてみたい。

## sphinx + ablog + myst との違い

nikola は `frontmatter` で title を決めるが、 sphinx は 本文の先頭の見出しで決めるという違いがある。
nikola の方も title と 先頭の見出しを同じにする運用にすれば、だいたい同じになると思う。

```
conf.py # nikola の設定
docs
  + conf.py # sphinx の設定
  + posts # content. nikola と sphinx の ablog 両用
    + post.md
```

みたいな感じにしてもだいたい動く。
細かく違うところはあると思うが。

## 動作

```python
    site = Nikola(**config)
    DN = DoitNikola(site, quiet)
    if _RETURN_DOITNIKOLA:
        return DN
    _ = DN.run(oargs)
```

### DoitNikola(DoitMain)

<https://github.com/getnikola/nikola/blob/398d5722d78a27ac5233849e3057f9d787345561/nikola/__main__.py#L301>

ここから入っていく。

`from doit.cmd_base import TaskLoader2`

<https://pydoit.org/extending.html?highlight=taskloader#doit.cmd_base.TaskLoader2>

### NikolaTaskLoader(TaskLoader2)

<https://github.com/getnikola/nikola/blob/398d5722d78a27ac5233849e3057f9d787345561/nikola/__main__.py#L257>
