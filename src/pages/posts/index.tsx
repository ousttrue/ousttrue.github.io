import React from "react";
import type { StaticData, PageProps } from "minista"
import PostHeader, { PostType } from '../../components/postheader';
import { getPosts, PageIssuesProps } from './getPosts.js';
import { Timeline } from 'react-daisyui';


export async function getStaticData(): Promise<StaticData> {
  return { props: { posts: await getPosts() } };
}

function PostItem(props: { post: PostType }) {
  const post = props.post;
  return (<div>
    {post.date.getMonth() + 1}月
    <a href={post.url ?? `/posts/${post.slug}`}>{post.title}</a>
  </div>);
}


function YearPosts(props: { year: number, posts: PostType[] }) {
  // console.log(props)
  return (<Timeline.Item connect="both">
    <Timeline.Start>{props.year}</Timeline.Start>
    <Timeline.Middle />
    <Timeline.End>
      {props.posts.map((post) => <PostItem post={post} />)}
    </Timeline.End>
  </Timeline.Item>)
}

export default function(props: PageIssuesProps) {

  const map: Map<number, PostType[]> = new Map();
  for (const post of props.posts) {
    const year = post.date.getFullYear();
    const yearPosts = map.get(year);
    if (yearPosts) {
      yearPosts.push(post);
    }
    else {
      map.set(year, [post]);
    }
  }

  const keys = [...map.keys()];
  keys.sort((a, b) => b - a);

  return (
    <Timeline vertical={true}>
      {keys.map((year) => <YearPosts
        year={year} posts={map.get(year)!} />)}
    </Timeline>
  )
}
