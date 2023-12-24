import type { PageProps } from "minista"
import { getStaticPosts } from './getStaticPosts.jsx';
import { getDynamicPosts } from './getDynamicPosts.js';


export type PostType = {
  title: string;
  slug: string;
  date: Date;
  tags?: string[];
}


export async function getPosts() {
  if (process.env.NODE_ENV === 'production') {
    // @ts-ignore
    const posts: PostType[] = getStaticPosts();
    for (const post of posts) {
      // string to Date
      post.date = new Date(post.date);
    }
    return posts;
  }
  else {
    return await getDynamicPosts();
  }
}

