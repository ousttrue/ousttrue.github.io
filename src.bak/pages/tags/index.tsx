import React from "react";
import type { StaticData, PageProps } from "minista"
import { getPosts } from '../posts/getPosts.js';
import Tag, { TagType } from '../../components/tag.jsx';
import { getTags } from './getTags.js';

export async function getStaticData(): Promise<StaticData> {
  const map = await getTags();
  const keys = Array.from(map.keys());
  keys.sort();
  return {
    props: {
      tags: keys.map((key) => ({
        name: key,
        posts: map.get(key)!,
      }))
    },
  };
}

type PageTagsTemplateProps = PageProps & {
  tags: TagType[]
}

export default function(props: PageTagsTemplateProps) {
  const tags = props.tags;
  return (
    <>
      {tags.map((tag) => <Tag key={tag.name} tag={tag} />)}
    </>
  )
}
