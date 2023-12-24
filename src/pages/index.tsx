import React from "react";
import type { StaticData, PageProps } from "minista"
import PostHeader from '../components/postheader';
import { getPosts, PostType } from './posts/getPosts.js';


export type PagePostsProps = PageProps & {
  posts: PostType[]
}


export async function getStaticData(): Promise<StaticData> {
  return { props: { posts: await getPosts() } };
}

export default function(props: PagePostsProps) {
  return (
    <>
      <ul className="posts">
        {props.posts.map((post, i) => <PostHeader post={post} key={i} />)}
      </ul>
    </>
  )
}
