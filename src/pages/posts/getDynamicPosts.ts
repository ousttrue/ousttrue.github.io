import { PostType } from '../../components/postheader';


export async function getDynamicPosts() {
  const dir = '.';
  const pattern = 'posts/**/*.md';
  const path = await import("node:path");
  const fs = await import('node:fs/promises');
  const glob = await import("glob");
  const fm = await import('front-matter');
  const posts: PostType[] = [];
  const matches = await glob.glob(pattern, { cwd: dir })

  for (const match of matches) {
    const res = await fs.readFile(path.join(dir, match), { encoding: 'utf-8' });
    const post = fm.default(res).attributes as PostType;
    post.slug = match.substring(6, match.length - 3).replace(/\\/g, '/');
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

export async function getDynamicBody(slug: string): Promise<string> {
  const fs = await import('node:fs');
  const content = fs.readFileSync(`posts/${slug}.md`, 'utf8');
  // frontmatter
  const list = content.split(/^---/m)
  return list[list.length - 1];
}
