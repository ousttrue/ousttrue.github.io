import pathlib
HERE = pathlib.Path(__file__).absolute().parent


def fix(path: pathlib.Path):
    src = path.read_text().split('\n')
    for i, l in enumerate(src):
        if not l:
            continue
        if l[0] == '+':
            if i==0:
                return
            # fix
            print(f'fix {path}: +++')
            src.insert(0, '+++')
            path.write_text('\n'.join(src))
            return
        elif l[0] == '-':
            if i==0:
                return
            # fix
            print(f'fix {path}: ---')
            src.insert(0, '---')
            path.write_text('\n'.join(src))
            return
        elif l[0] == '{':
            raise NotImplementedError()

    raise NotImplementedError()


def main(path: pathlib.Path):
    for e in path.iterdir():
        if e.is_dir():
            main(e)
        else:
            if e.suffix == '.md':
                fix(e)


if __name__ == '__main__':
    main(HERE / 'content')
