import type { PageProps } from "minista"
import { PostType } from '../../components/postheader';
import { getStaticPosts } from './getStaticPosts.jsx';
import { getDynamicPosts } from './getDynamicPosts.js';

export type PageIssuesProps = PageProps & {
  posts: PostType[]
}

export async function getPosts() {
  if (process.env.NODE_ENV === 'production') {
    return getStaticPosts();
  }
  else {
    return await getDynamicPosts();
  }
}

