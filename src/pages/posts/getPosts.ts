import type { PageProps } from "minista"
import { PostType } from '../../components/postheader';
import { getStaticPosts } from './getStaticPosts.jsx';
import { getDynamicPosts } from './getDynamicPosts.js';

export type PageIssuesProps = PageProps & {
  posts: PostType[]
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

