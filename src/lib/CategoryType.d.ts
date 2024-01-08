import { PostType } from "$lib";

export type CategoryType = {
  slug: string;
  title: string;
  posts: PostType[];
  tags?: string[];
  body?: string;
}

