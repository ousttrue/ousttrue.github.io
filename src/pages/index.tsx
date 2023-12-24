import React from "react";
import type { StaticData, PageProps } from "minista"
import PostHeader, { PostType } from '../components/postheader';
import { getPosts, PageIssuesProps } from './posts/getPosts.js';


export async function getStaticData(): Promise<StaticData> {
  return { props: { posts: await getPosts() } };
}

export default function(props: PageIssuesProps) {
  return (
    <>
      <ul className="posts">
        {props.posts.map((post, i) => <PostHeader post={post} key={i} />)}
      </ul>
    </>
  )
}
