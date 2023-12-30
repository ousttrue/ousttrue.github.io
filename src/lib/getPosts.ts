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
}

export async function getPosts(): Promise<PostType[]> {

  const dir = '.';
  const posts: PostType[] = [];

  {
    const matches = await glob.glob('posts/**/*.{md,mdx}', { cwd: dir })

    for (const m of matches) {
      const res = await fs.readFile(path.join(dir, m), { encoding: 'utf-8' });
      const post = fm(res).attributes as PostType;

      const matched = m.match(/^posts[\\\/](.*)(\.mdx?)$/);
      if (!matched) {
        throw new Error("not match: md|mdx");
      }

      post.slug = matched[1].replace(/\\/g, '/');
      post.ext = matched[2]; //match.substring(6, match.length - 3);
      if (post.tags) {
        post.tags = post.tags.map((tag) => tag.toLowerCase());
      }
      posts.push(post);
    }
    posts.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });
  }

  return posts;
}

export async function getContent(slug: string): Promise<string> {
  const path = `posts/${slug}.md`
  let content = await fs.readFile(path, 'utf8')
  // content = content.replaceAll(/\!\[\S+\](\S+\.jpg)/, '**removed**');
  return content;
}
