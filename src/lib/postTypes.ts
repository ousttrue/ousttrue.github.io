export type PostType = {
  slug: string;
  title: string;
  date: Date;
  extra?: any;
  tags?: string[];
  body?: string; // markdown
  html?: string; // rendered
  toc?: string; // rendered
}


export type PostTagType = {
  name: string;
  count: number;
}


export type PostsType = {
  posts: PostType[];
  tags: PostTagType[];
}
