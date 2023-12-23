import React from "react";
import type { StaticData, PageProps } from "minista"
import PostHeader, { PostType } from '../components/postheader';


export async function getStaticData(): Promise<StaticData> {
  if (process.env.NODE_ENV === 'production') {
    // @ts-ignore
    const { getPosts } = await import('./posts');
    return getPosts();
  }
  else {
    // const { glob } = await import( "glob");
    // const fm = await import( 'front-matter');
    // const { fileURLToPath } = await import( "node:url");
    // const path = await import( "node:path");
    // const { readFile } = await import( 'node:fs/promises');
    // const __filename = fileURLToPath(import.meta.url);
    // const __dirname = path.dirname(__filename);
    //
    // const data: { props: { posts: PostType[] } } = {
    //   props: {
    //     posts: [],
    //   },
    // }

    // const matches = await glob('**/*.md', { cwd: __dirname })

    // for (const match of matches) {
    //   const res = await readFile(path.join(__dirname, match), { encoding: 'utf-8' });
    //   const post = fm.default(res).attributes as PostType;
    //   post.path = match.substring(0, match.length - 3).replace(/\\/g, '/');
    //   // console.log(match, post);
    //   data.props.posts.push(post);
    // }

    const { getDynamicPosts } = await import('../../getPosts.js');

    const data = await getDynamicPosts();

    return data;
  }
}

type PageIssuesProps = PageProps & {
  posts?: PostType[]
}

export default function(props: PageIssuesProps) {
  return (
    <>
      <ul className="posts">
        {props.posts?.map((post, i) => <PostHeader post={post} key={i} />)}
      </ul>
    </>
  )
}
