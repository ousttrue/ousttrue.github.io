import React from 'react';
import type { StaticData, PageProps } from "minista"
import { Button } from 'react-daisyui'
import { getPosts, PostType } from '../posts/getPosts.js';
import PostHeader from '../../components/postheader';


export async function getStaticData(): Promise<StaticData[]> {
  const posts = await getPosts();

  const map: Map<string, PostType[]> = new Map();
  for (const post of posts) {
    if (post.tags) {
      for (const tag of post.tags) {
        const tagPosts = map.get(tag)
        if (tagPosts) {
          tagPosts.push(post);
        }
        else {
          map.set(tag, [post]);
        }
      }
    }
  }

  return Array.from(map.keys()).map((key) => ({
    props: { tag: key, posts: map.get(key)! },
    paths: { tag: key },
  }));
}

type PageTagTemplateProps = PageProps & {
  tag: string,
  posts: PostType[]
}

export default function(props: PageTagTemplateProps) {
  const { tag, posts } = props;
  return (
    <>
      <Button tag="a">{tag}</Button>
      {posts.map((post) => <PostHeader post={post} />)}
    </>
  )
}
