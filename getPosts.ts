type Post = {
  title: string;
  path: string;
  date: Date;
  tags?: string[];
}


export async function getDynamicPosts() {
  const dir = 'src/pages';
  const pattern = 'posts/**/*.md';
  const path = await import("node:path");
  const fs = await import('node:fs/promises');
  const glob = await import("glob");
  const fm = await import('front-matter');

  const data: { props: { posts: Post[] } } = {
    props: {
      posts: [],
    },
  }

  const matches = await glob.glob(pattern, { cwd: dir })

  for (const match of matches) {
    const res = await fs.readFile(path.join(dir, match), { encoding: 'utf-8' });
    const post = fm.default(res).attributes as Post;
    post.path = match.substring(0, match.length - 3).replace(/\\/g, '/');
    // console.log(match, post);
    data.props.posts.push(post);
  }

  return data;
}


