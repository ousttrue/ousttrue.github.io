import path from "node:path";
import fs from 'node:fs/promises';
import * as glob from "glob";
import fm from 'front-matter';



export type PostType = {
  title: string;
  slug: string;
  ext: string;
  date: Date;
  tags?: string[];
  body: string;
}


export type PostTagType = {
  name: string;
  count: number;
}


export type PostsType = {
  posts: PostType[];
  tags: PostTagType[];
}


export async function getPosts(): Promise<PostsType> {

  const dir = '.';
  const posts: PostType[] = [];
  const tags: { [key: string]: number } = {};

  {
    const matches = await glob.glob('posts/**/*.{md,mdx}', { cwd: dir })

    for (const m of matches) {
      const matched = m.match(/^posts[\\\/](.*)(\.mdx?)$/);
      if (!matched) {
        throw new Error("not match: md|mdx");
      }

      const res = await fs.readFile(path.join(dir, m), { encoding: 'utf-8' });

      const { attributes, body } = fm<PostType>(res);
      attributes.body = body;

      attributes.slug = matched[1].replace(/\\/g, '/');
      attributes.ext = matched[2];
      if (attributes.tags) {
        attributes.tags = attributes.tags.map((tag) => tag.toLowerCase());
        for (const tag of attributes.tags) {
          if (tag in tags) {
            tags[tag]++;
          }
          else {
            tags[tag] = 1;
          }
        }
      }
      posts.push(attributes);
    }
    posts.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });

  }

  const tagItems = Object.keys(tags).map((tag) => ({
    name: tag,
    count: tags[tag],
  }));
  tagItems.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  return {
    posts,
    tags: tagItems
  };
}
