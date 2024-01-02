import { getPosts } from '$lib/getPosts';
import type { PostsType } from '$lib';


export async function load(): Promise<PostsType> {
  return await getPosts();
}
