import { getPosts } from '../posts/getPosts.js';
import type { PostType } from '../../components/postheader';


export async function getTags(): Promise<Map<string, PostType[]>> {
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

  return map;
}
