import React from "react";
import type { StaticData, PageProps } from "minista"
import { Divider, Button, Badge } from 'react-daisyui'
import PostHeader, { PostType } from '../../components/postheader';
import { getPosts } from './getPosts.js';


function YearPosts(props: { year: number, posts: PostType[] }) {
  const { year, posts } = props;
  return (<div>
    <Divider>
      <Button>
        {year}
        <Badge>{posts.length}</Badge>
      </Button>
    </Divider>
    {posts.map((post, i) => <PostHeader key={i} post={post} />)}
    <Divider />
  </div>)
}

export async function getStaticData(): Promise<StaticData[]> {
  const posts = await getPosts();
  return posts.map((post) => ({
    props: { posts },
  }));
}

export type PagePostsProps = PageProps & {
  posts: PostType[]
}

export default function(props: PagePostsProps) {

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
    <div>
      {keys.map((year) => <YearPosts key={year}
        year={year} posts={map.get(year)!} />)}
    </div>
  )
}
