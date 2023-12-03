type Post = {
  title: string;
  path: string;
  date: Date;
  tags?: string[];
}


export async function writeStaticData(dir: string, pattern: string, dst: string) {
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

  console.log(JSON.stringify(data, null, 2));

  // return data;
  fs.writeFile(dst, 'export default data = ' + JSON.stringify(data, null, 2));
}

writeStaticData('src/pages/posts', '**/*.md', 'src/pages/posts.js');
