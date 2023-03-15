#!/usr/bin/env python3
import re
import io
import argparse
import pathlib
import yaml
import toml
from typing import NamedTuple


class Color:
    BLACK = "\033[30m"  # (文字)黒
    RED = "\033[31m"  # (文字)赤
    GREEN = "\033[32m"  # (文字)緑
    YELLOW = "\033[33m"  # (文字)黄
    BLUE = "\033[34m"  # (文字)青
    MAGENTA = "\033[35m"  # (文字)マゼンタ
    CYAN = "\033[36m"  # (文字)シアン
    WHITE = "\033[37m"  # (文字)白
    COLOR_DEFAULT = "\033[39m"  # 文字色をデフォルトに戻す
    BOLD = "\033[1m"  # 太字
    UNDERLINE = "\033[4m"  # 下線
    INVISIBLE = "\033[08m"  # 不可視
    REVERCE = "\033[07m"  # 文字色と背景色を反転
    BG_BLACK = "\033[40m"  # (背景)黒
    BG_RED = "\033[41m"  # (背景)赤
    BG_GREEN = "\033[42m"  # (背景)緑
    BG_YELLOW = "\033[43m"  # (背景)黄
    BG_BLUE = "\033[44m"  # (背景)青
    BG_MAGENTA = "\033[45m"  # (背景)マゼンタ
    BG_CYAN = "\033[46m"  # (背景)シアン
    BG_WHITE = "\033[47m"  # (背景)白
    BG_DEFAULT = "\033[49m"  # 背景色をデフォルトに戻す
    RESET = "\033[0m"  # 全てリセット


def process(src: str) -> dict:
    m = re.match(r"^---$\n(.*?)\n^---$\n(.*)", src, re.MULTILINE | re.DOTALL)
    if m:
        return {
            "type": "yaml",
            "frontmatter": yaml.safe_load(io.StringIO(m.group(1))),
            "body": m.group(2).lstrip(),
        }
    m = re.match(r"^\+\+\+$\n(.*?)\n^\+\+\+$\n(.*)", src, re.MULTILINE | re.DOTALL)
    if m:
        return {
            "type": "toml",
            "frontmatter": toml.loads(m.group(1)),
            "body": m.group(2).lstrip(),
        }
    return {"body": src}


def process_body(src: str) -> str:
    def repl(m) -> str:
        return m.group(1)

    return re.sub(r"<(https?:[^>]+)>", repl, src)


def run(path: pathlib.Path, do: bool):
    if path.is_dir():
        for f in path.iterdir():
            run(f, do)
    else:
        if path.suffix.lower() == ".md":
            content = process(path.read_text())
            match content:
                case {"type": "yaml", "frontmatter": frontmatter, "body": body}:
                    new_body = process_body(body)
                    target = ""
                    if new_body != body:
                        target += "b"
                    if "title" not in frontmatter:
                        lines = body.splitlines()
                        title = lines[0].split(maxsplit=1)[1]
                        body = lines[1]
                        target += "t " + title
                        frontmatter["title"] = title

                    if target:
                        print(
                            f"{Color.GREEN}yaml{Color.RESET}: {path} {Color.RED}{target}{Color.RESET}"
                        )
                        if do:
                            yaml_frontmatter = yaml.dump(
                                frontmatter, allow_unicode=True
                            )
                            with path.open("w") as w:
                                w.write("---\n")
                                w.write(yaml_frontmatter)
                                w.write("---\n")
                                w.write("\n")
                                w.write(new_body)
                    # print(frontmatter)
                    # yaml.dump(frontmatter)
                    pass
                case {"type": "toml", "frontmatter": frontmatter, "body": body}:
                    new_body = process_body(body)
                    target = "f"
                    if new_body != body:
                        target += "b"
                    if "title" not in frontmatter:
                        lines = body.splitlines()
                        title = lines[0].split(maxsplit=1)[1]
                        body = lines[1]
                        target += "t " + title
                        frontmatter["title"] = title

                    print(
                        f"{Color.MAGENTA}toml{Color.RESET}: {path} {Color.RED}{target}{Color.RESET}"
                    )
                    # print(frontmatter)
                    if do:
                        yaml_frontmatter = yaml.dump(frontmatter, allow_unicode=True)
                        with path.open("w") as w:
                            w.write("---\n")
                            w.write(yaml_frontmatter)
                            w.write("---\n")
                            w.write("\n")
                            w.write(new_body)
                case _:
                    print(f"{Color.RED}unknown{Color.RESET}: {path}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("src", type=pathlib.Path)
    parser.add_argument("--do", action=argparse.BooleanOptionalAction)
    args = parser.parse_args()

    run(args.src, args.do)


if __name__ == "__main__":
    main()