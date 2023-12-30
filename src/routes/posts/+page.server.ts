import { getPosts } from '$lib/getPosts';
import type { PostType } from '$lib/getPosts';


export async function load(): Promise<{ summaries: PostType[] }> {
  const summaries = await getPosts();
  return { summaries };
}
