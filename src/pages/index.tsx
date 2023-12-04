import React from "react";
import type { StaticData, PageProps } from "minista"


type Post = {
  title: string;
  path: string;
  date: Date;
  tags?: string[];
}


export async function getStaticData(): Promise<StaticData> {

  if (process.env.NODE_ENV === 'production') {
    const { getPosts } = await import('./posts');
    const data = getPosts();
    for (const post of data.props.posts) {
      post.date = new Date(post.date);
      // console.log(post);
    }
    return data;
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
    // const data: { props: { posts: Post[] } } = {
    //   props: {
    //     posts: [],
    //   },
    // }

    // const matches = await glob('**/*.md', { cwd: __dirname })

    // for (const match of matches) {
    //   const res = await readFile(path.join(__dirname, match), { encoding: 'utf-8' });
    //   const post = fm.default(res).attributes as Post;
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
  posts?: Post[]
}

function Day(props: { date: Date }) {
  function yyyy() {
    return props.date.getFullYear().toString();
  }
  function mm() {
    return (props.date.getMonth() + 1).toString().padStart(2, "0");
  }
  function dd() {
    return props.date.getDate().toString().padStart(2, "0");
  }

  /// yyyy
  /// mmdd
  return (<span className="date">
    <div className="year">{yyyy()}</div>
    <div className="mmdd">
      <span className="mm">{mm()}</span>
      <span className="dd">{dd()}</span>
    </div>
  </span>)
}


function Tag(props: { tag: string }) {
  return <span className="tag">{props.tag}</span>;
}

function Title(props: { post: Post }) {
  const post = props.post;
  return (<div>
    <a className="title" href={`${post.path}`}>{post.title}</a>
  </div>)
}

function Post(props: { post: Post }) {
  const post = props.post;

  return (
    <li>
      <Day date={post.date} />
      <span style={{ display: 'inline-block' }}>
        <Title post={props.post} />
        {post.tags ? post.tags.map((x, i) => <Tag tag={x} key={i} />) : ''}
      </span>
    </li>
  )
}

export default function(props: PageIssuesProps) {
  return (
    <>
      <ul className="posts">
        {props.posts?.map((post, i) => <Post post={post} key={i} />)}
      </ul>
    </>
  )
}
