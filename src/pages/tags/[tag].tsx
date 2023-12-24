import React from 'react';
import type { StaticData, PageProps } from "minista"
import { Divider, Button, Badge } from 'react-daisyui'
import PostHeader from '../../components/postheader';
import Tag, { TagType } from '../../components/tag';
import { getTags } from './getTags.js';


export async function getStaticData(): Promise<StaticData[]> {
  const map = await getTags();
  return Array.from(map.keys()).map((key) => ({
    props: { tag: { name: key, posts: map.get(key)! } },
    paths: { tag: key },
  }));
}

type PageTagTemplateProps = PageProps & { tag: TagType };

export default function(props: PageTagTemplateProps) {
  const tag = props.tag;
  return (
    <>
      <Divider><Tag tag={tag} /></Divider>
      {tag.posts.map((post) => <PostHeader key={post.slug} post={post} />)}
    </>
  )
}
