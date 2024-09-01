import { Plugin } from 'vite';
import path from 'node:path';
import YAML from 'yaml'

function splitMatter(src: string) {
  src = src.replace(/\r\n/g, "\n");
  const head = src.substring(0, 4);
  src = src.substring(4);
  try {
    if (head == "---\n") {
      const found = src.indexOf('\n---\n');
      if (found == -1) {
        throw new Error(src.substring(4));
      }
      let matter = YAML.parse(src.substring(0, found));
      matter.body = src.substring(found + 5);
      return matter;
    }
    else {
      throw new Error(src);
    }
  }
  catch (e) {
    throw e;
  }
}

export default function pluginMarkdown(): Plugin {
  return {
    name: "mymd-vite-plugin",
    transform(code, id) {
      const extension = path.extname(id)
      if (extension !== '.md') return
      const matter = splitMatter(code)
      return 'export default ' + JSON.stringify(matter);
    },
  };
};
