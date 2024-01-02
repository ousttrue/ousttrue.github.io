export type PostType = {
  title: string;
  slug: string;
  ext: string;
  date: Date;
  tags?: string[];
  body: string;
}


export type PostTagType = {
  name: string;
  count: number;
}


export type PostsType = {
  posts: PostType[];
  tags: PostTagType[];
}
