export type PostType = {
  title: string;
  slug: string;
  ext: string;
  date: Date;
  tags?: string[];
  body: string; // markdown
  html: string; // rendered
  toc: string; // rendered
}


export type PostTagType = {
  name: string;
  count: number;
}


export type PostsType = {
  posts: PostType[];
  tags: PostTagType[];
}
