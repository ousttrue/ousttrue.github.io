import pathlib
import re
import toml
import yaml


HERE = pathlib.Path(__file__).absolute().parent


def main(dir: pathlib.Path):
    pattern = re.compile(r"^\+\+\+", re.MULTILINE)
    for e in dir.iterdir():
        if e.suffix == ".md":
            content = e.read_text(encoding="utf-8")
            _, frontmatter, body = pattern.split(content, 3)
            frontmatter = toml.loads(frontmatter)
            frontmatter = yaml.dump(frontmatter, allow_unicode=True)
            e.write_text(
                f"""---
{frontmatter}---

{body.strip()}
""",
                encoding="utf-8",
                newline="\n",
            )


if __name__ == "__main__":
    main(HERE)
