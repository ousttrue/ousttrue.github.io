import watchdog.events
import watchdog.observers
import time
import pathlib
import logging
import shutil
logger = logging.getLogger(__name__)

HERE = pathlib.Path(__file__).absolute().parent


class Handler(watchdog.events.PatternMatchingEventHandler):
    def __init__(self, dst: pathlib.Path, *, patterns=None, ignore_patterns=None, ignore_directories=False, case_sensitive=False):
        super().__init__(patterns=patterns, ignore_patterns=ignore_patterns,
                         ignore_directories=ignore_directories, case_sensitive=case_sensitive)
        self.dst = dst

    def on_any_event(self, event: watchdog.events.FileSystemEvent):
        match event:
            case watchdog.events.FileModifiedEvent():
                src = pathlib.Path(event.src_path)
                dst = self.dst / src.name
                logger.debug(f'copy: {src} => {dst}')
                shutil.copy(src, dst)

            case _:
                logger.debug(event)


def watch(watch: pathlib.Path, dst: pathlib.Path):
    logger.debug(f"{watch} => {dst}")
    observer = watchdog.observers.Observer()
    observer.schedule(Handler(dst), watch)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.unschedule_all()
        logger.debug("C-c")
        observer.stop()
    observer.join()


if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG)
    # watch(HERE / 'src/custom/static', HERE / 'build/_static')
    import sys
    watch(pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2]))
