import React from 'react';
import { StaticData, PageProps, Markdown } from "minista"
import { Divider } from 'react-daisyui'
import { getPosts, getBody } from './getPosts.js';
import PostHeader, { PostType } from '../../components/postheader';


export async function getStaticData(): Promise<StaticData[]> {
  const posts = await getPosts();
  const list: StaticData[] = [];
  for (const post of posts) {
    const body = await getBody(post.slug, post.ext);
    list.push({
      props: { post, body },
      paths: { slug: post.slug },
    });
  }
  return list;
}

type PagePostTemplateProps = PageProps & {
  post: PostType
  body: string,
}

export default function(props: PagePostTemplateProps) {
  const { post, body } = props;
  return (<>
    <PostHeader post={post} />
    <Divider />
    <div className="markdown">
      <Markdown content={body} rehypeHighlightOptions={{ ignoreMissing: true }} />
    </div>
  </>)
}
