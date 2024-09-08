import { Plugin } from 'vite';
import path from 'node:path';
import YAML from 'yaml'

export type Frontmatter = {
  title: string,
  date: string | Date,
  tags: string[],
};

export type MarkdownData = {
  frontmatter: Frontmatter,
  content: string,
};

function fixFrontmatter(frontmatter: Frontmatter)
{
  if(frontmatter.tags)
  {
    frontmatter.tags = frontmatter.tags.map(x => x.toLowerCase());
  }
}

function splitMatter(src: string): MarkdownData {
  src = src.replace(/\r\n/g, "\n");
  const head = src.substring(0, 4);
  src = src.substring(4);
  try {
    if (head == "---\n") {
      const found = src.indexOf('\n---\n');
      if (found == -1) {
        throw new Error(src.substring(4));
      }
      const frontmatter = YAML.parse(src.substring(0, found));
      fixFrontmatter(frontmatter);
      const content = src.substring(found + 5);
      return { frontmatter, content };
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
      // console.log(id);
      const extension = path.extname(id)
      if (extension !== '.md') return
      const matter = splitMatter(code)
      return 'export default ' + JSON.stringify(matter);
    },
  };
};
