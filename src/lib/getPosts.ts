import path from "node:path";
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
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
      if (attributes.extra) {
        if (attributes.extra.css == 'gist') {
          if (attributes.tags) {
            attributes.tags.push('gist')
          }
          else {
            attributes.tags = ['gist']
          }
        }
        else if (attributes.extra.css == 'github') {
          if (attributes.tags) {
            attributes.tags[0] = 'github'
          }
          else {
            attributes.tags = ['github']
          }
        }
      }

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


const typeMap: { [key: string]: string } = {
  '.jpg': 'image/jpeg',
};


export async function getAsset(slug: string): Promise<{ buffer: Buffer, contentType: string }> {
  console.log("getAsset", slug);
  const buffer = await fs.readFile(`posts/${slug}`);
  return {
    buffer,
    contentType: typeMap[path.extname(slug).toLowerCase()] ?? 'application/octet-stream',
  };
}

export function getAssetSync(slug: string): { buffer: Buffer, contentType: string } {
  console.log("getAssetSync", slug);
  const buffer = fsSync.readFileSync(`posts/${slug}`);
  return {
    buffer,
    contentType: typeMap[path.extname(slug).toLowerCase()] ?? 'application/octet-stream',
  };
}
