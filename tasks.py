from invoke import task, Context
from typing import List
import urllib.request
import datetime
import json
import shutil
import pathlib
import http.client

HERE = pathlib.Path(__file__).absolute().parent
DATE_FORMAT = '%Y-%m-%dT%H:%M:%S%z'
DOWNLOAD_DIR = HERE / 'downloads'

TAG_MAP = {
    'blpymeshio': ['python', 'blender'],
    'bpy_module': ['python', 'blender'],
    'io_scene_yup': ['python', 'blender'],
    'pyimpex': ['python', 'blender'],
    'SampleHumanoidModel': ['blender'],
    'UnityHumanoidHelper': ['python', 'blender'],
    #
    'msgpack-rpc-asio': ['cpp', 'msgpack', 'asio'],
    'msgpackpp': ['cpp', 'msgpack'],
    'NMPUtil': ['csharp', 'msgpack'],
    'pyMsgPack': ['python', 'msgpack'],
    'refrange': ['cpp', 'msgpack'],
    'tornado-msgpack': ['python', 'msgpack'],
    #
    'cmake_book': ['cmake'],
    #
    'usd_cpp_samples': ['cpp', 'usd'],
    'HydraHost': ['cpp', 'usd'],
    #
    'dimgui_sample': ['D', 'imgui'],
    'imgui_samples': ['cpp', 'imgui'],
    'limgui': ['lua', 'imgui'],
    'ManglingImgui': ['csharp', 'imgui'],
    'SharpImGui': ['csharp', 'imgui'],
    'SwigImGui': ['python', 'imgui'],
    #
    'my_nvim': ['nvim'],
    'nvim-dx': ['nvim', 'cpp', 'd3d'],
    'vim_memo': ['nvim'],
    #
    'AsioCliSample': ['csharp', 'asio'],
    #
    'wgut': ['3d'],
    'gizmesh': ['3d'],
    'FunnelPipe': ['3d'],
    'frame_factory': ['3d'],
    'VROverlaySample': ['3d', 'openvr'],
    'gltf_inspector': ['gltf'],
    'GltfGui': ['gltf'],
}


def get_github(user: str, dst: pathlib.Path, force: bool):
    if not force and (dst / 'user.json').exists():
        return
    dst.mkdir(parents=True, exist_ok=True)

    # user
    with urllib.request.urlopen(f'https://api.github.com/users/{user}') as res:
        user_bytes = res.read()
    (dst / 'user.json').write_bytes(user_bytes)
    user_parsed = json.loads(user_bytes)

    # repos
    i = 0
    while True:
        url = f'https://api.github.com/users/{user}/repos?page={i+1}&per_page=100'
        with urllib.request.urlopen(url) as res:
            repos_bytes = res.read()
        (dst / f'repos-{i}.json').write_bytes(repos_bytes)
        i += 1
        if i * 100 > user_parsed['public_repos']:
            break

    # gists
    i = 0
    while True:
        url = f'https://api.github.com/users/{user}/gists?page={i+1}&per_page=100'
        with urllib.request.urlopen(url) as res:
            gists_bytes = res.read()
        (dst / f'gists-{i}.json').write_bytes(gists_bytes)
        i += 1
        if i * 100 > user_parsed['public_gists']:
            break


@task
def download(c, user, force=False):
    # type: (Context, str, bool) -> None
    '''
    download github repos
    '''
    get_github(user, DOWNLOAD_DIR, force)


@task
def dl_qiita(c, user):
    # type: (Context, str) -> None
    '''
    download qiita articles
    '''

    # https://qiita.com/fkooo/items/250f42a0b641fb96b5ff
    conn = http.client.HTTPSConnection("qiita.com", 443)
    conn.request("GET", f"/api/v2/users/{user}/items?page=1&per_page=100")
    res = conn.getresponse()
    print(res.status, res.reason)
    path = DOWNLOAD_DIR / 'qiita.json'
    data = res.read()
    path.write_bytes(data)


class Repo:
    def __init__(self, item) -> None:
        self.name = item['name']
        self.description = item['description']
        if self.description:
            self.description = self.description.replace('"', '\'')
        self.url = item['html_url']
        self.fork = None
        if item['fork']:
            self.fork = item['forks_url']
        self.created_at = datetime.datetime.strptime(item['created_at'],
                                                     DATE_FORMAT)
        self.pushed_at = datetime.datetime.strptime(item['pushed_at'],
                                                    DATE_FORMAT)
        self.language = ['repository']
        if item['language']:
            self.language.append(item['language'])
        self.forks_count = item['forks_count']
        self.license = item['license']
        self.star = item['stargazers_count']

    def __str__(self) -> str:
        return f'{self.name}: [{self.language}]{self.description}'

    def format_toml(self) -> str:
        f = f'''
[[extra.repos]]
label = "{self.name}"
url = "{self.url}"
description = "{self.description}"
created = {self.created_at}
pushed = {self.pushed_at}
star = {self.star}'''
        if self.language:
            f += f'\nlanguage = "{self.language}"'
        return f

    def format_md(self):
        f = f'''+++
title = "{self.name}"
date = {self.created_at}
updated = {self.pushed_at}
'''
        if self.language:
            tags = ", ".join([f'"{tag}"' for tag in self.language])
            f += f'taxonomies.tags = [{tags}]\n'

        f += f'''[extra]
css = "github"
star = {self.star}
forks_count = {self.forks_count}
license = "{self.license}"
url = "{self.url}"
+++

<{self.url}>

'''
        if self.fork:
            f += f'fork from <{self.fork}>'

        if self.description:
            f += f'{self.description}\n'
        return f


def get_repos(dir: pathlib.Path) -> List[pathlib.Path]:
    paths = []
    i = 0
    while True:
        path = dir / f'repos-{i}.json'
        if not path.exists():
            break
        paths.append(path)
        i += 1
    return paths


@task
def repos(c):
    # type: (Context) -> None
    '''
    generate Github
    '''
    dir = HERE / 'content/github'
    files = {f: True for f in dir.glob('*.md')}
    dir.mkdir(exist_ok=True, parents=True)
    repos = sum([json.loads(r.read_bytes()) for r in get_repos(DOWNLOAD_DIR)],
                [])
    repos.sort(reverse=True, key=lambda r: r['stargazers_count'])
    for r in repos:
        if r['private']:
            continue
        if r['archived']:
            continue
        if r['fork']:
            continue
        repo = Repo(r)
        if repo.name in TAG_MAP:
            if not repo.language:
                repo.language = []
            repo.language += TAG_MAP[repo.name]
        body = repo.format_md().encode('utf-8')

        path = dir / f'{repo.name}.md'
        if path in files:
            del files[path]
        if path.exists() and path.read_bytes() == body:
            # print(f'skip: {path}')
            continue

        print(path.exists(), path)
        with path.open('wb') as w:
            w.write(body)

    for f in files.keys():
        print(f'remove {f}')
        f.unlink()


def get_gists(dir: pathlib.Path) -> List[pathlib.Path]:
    paths = []
    i = 0
    while True:
        path = dir / f'gists-{i}.json'
        if not path.exists():
            break
        paths.append(path)
        i += 1
    return paths


class Gist:
    def __init__(self, item):
        k, v = next(iter(item['files'].items()))
        self.name = k
        self.description = item['description']
        if self.description:
            self.description = self.description.replace('"', '\'')
        self.url = item['html_url']
        self.created_at = datetime.datetime.strptime(item['created_at'],
                                                     DATE_FORMAT)
        self.updated_at = datetime.datetime.strptime(item['updated_at'],
                                                     DATE_FORMAT)

    def format_toml(self):
        f = f'''
[[extra.gists]]
label = "{self.name}"
url = "{self.url}"
created = {self.created_at}
updated = {self.updated_at}'''
        if self.description:
            f += f'\ndescription = "{self.description}"'

        return f

    def format_md(self):
        f = f'''+++
title = "{self.name}"
date = {self.created_at}
updated = {self.updated_at}
[extra]
css = "gist"
url = "{self.url}"
+++

<{self.url}>

'''
        if self.description:
            f += f'{self.description}\n'
        return f


@task
def gists(c):
    # type: (Context) -> None
    '''
    generate Gist
    '''
    dir = HERE / 'content/gists'
    if dir.exists():
        shutil.rmtree(dir, ignore_errors=True)
    dir.mkdir(exist_ok=True, parents=True)
    gists = sum([json.loads(r.read_bytes()) for r in get_gists(DOWNLOAD_DIR)],
                [])
    for g in gists:
        if not g['public']:
            continue
        gist = Gist(g)
        path = dir / f'{gist.name}.md'
        print(path)
        with path.open('wb') as w:
            w.write(gist.format_md().encode('utf-8'))
            w.write(b'\n')


def escape_title(src: str) -> str:
    src = src.replace('"', '\'')
    src = src.replace(":", "_")
    return src


class Qiita:
    def __init__(self, item):
        self.title = escape_title(item['title'])
        self.url = item['url']
        self.tags = ['qiita'] + [tag['name'] for tag in item['tags']]
        self.created_at = datetime.datetime.fromisoformat(item['created_at'])
        self.updated_at = datetime.datetime.fromisoformat(item['updated_at'])

    def format_toml(self):
        f = f'''[[extra.qiita]]
label = "{self.title}"
url = "{self.url}"
tags = {str(self.tags)}
created = {self.created_at}
updated = {self.updated_at}'''
        return f

    def format_md(self):
        f = f'''+++
title = "{self.title}"
date = {self.created_at}
updated = {self.updated_at}
tags = {self.tags}
[extra]
css = "qiita"
url = "{self.url}"
+++

<{self.url}>

'''
        return f


@task
def qiita(c):
    # type: (Context) -> None
    '''
    generate Qiita
    '''
    qs = json.loads((DOWNLOAD_DIR / 'qiita.json').read_bytes())
    dir = HERE / 'content/qiita'
    files = {f: True for f in dir.glob('*.md')}
    dir.mkdir(exist_ok=True, parents=True)
    for q in qs:
        qiita = Qiita(q)
        path = dir / f'{qiita.title}.md'
        if path in files:
            del files[path]

        body = qiita.format_md().encode('utf-8')
        if path.exists() and path.read_bytes() == body:
            continue

        print(path)
        with path.open('wb') as w:
            w.write(body)

    for f in files.keys():
        print(f'remove {f}')
        f.unlink()


@task(repos, gists, qiita)
def all(c):
    pass
