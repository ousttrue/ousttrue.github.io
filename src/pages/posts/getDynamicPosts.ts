import { PostType } from '../../components/postheader';


export async function getDynamicPosts() {
  const dir = 'src/pages';
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
    posts.push(post);
  }
  posts.sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });

  return posts;
}
