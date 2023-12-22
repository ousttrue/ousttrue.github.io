import React from "react";
import type { StaticData, PageProps } from "minista"
import { allPosts, Post } from '../../.contentlayer/generated';


export async function getStaticData(): Promise<StaticData> {

  // console.log(typeof(allPosts));
  const data: { props: { posts: Post[] } } = {
    props: {
      posts: allPosts,
    },
  }
  for (const post of data.props.posts) {
    post.date = new Date(post.date);
    // console.log(post);
  }
  data.props.posts.sort((a, b) => b.date.getTime() - a.date.getTime());
  return Promise.resolve(data);
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

function PostElement(props: { post: Post }) {
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
        {props.posts?.map((post, i) => <PostElement post={post} key={i} />)}
      </ul>
    </>
  )
}
