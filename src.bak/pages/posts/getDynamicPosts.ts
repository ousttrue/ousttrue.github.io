import { PostType } from '../../components/postheader';


export async function getDynamicPosts() {
  const dir = '.';
  const pattern = 'posts/**/*.{md,mdx}';
  const path = await import("node:path");
  const fs = await import('node:fs/promises');
  const glob = await import("glob");
  const fm = await import('front-matter');
  const posts: PostType[] = [];
  const matches = await glob.glob(pattern, { cwd: dir })

  for (const m of matches) {
    const res = await fs.readFile(path.join(dir, m), { encoding: 'utf-8' });
    const post = fm.default(res).attributes as PostType;

    const matched = m.match(/^posts(.*)(\.mdx?)$/);
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

  return posts;
}

export async function getDynamicBody(slug: string, ext: string): Promise<string> {
  const fs = await import('node:fs');
  const content = fs.readFileSync(`posts/${slug}${ext}`, 'utf8');
  // frontmatter
  const list = content.split(/^---/m)
  return list[list.length - 1];
}
