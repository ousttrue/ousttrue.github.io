import { getStaticPosts } from './getStaticPosts.jsx';
import { getDynamicPosts } from './getDynamicPosts.js';
import type { PostType } from '../../components/postheader.jsx';


export async function getPosts(): Promise<PostType[]> {
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
