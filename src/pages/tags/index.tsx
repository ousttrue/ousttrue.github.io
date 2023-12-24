import React from "react";
import type { StaticData, PageProps } from "minista"
import { getPosts } from '../posts/getPosts.js';
import { Button } from 'react-daisyui'


export async function getStaticData(): Promise<StaticData> {
  const posts = await getPosts();
  const tags = Array.from(new Set(posts.map((post) => post.tags).flat()));
  tags.sort();
  return {
    props: { tags: tags },
  };
}

type PageTagsTemplateProps = PageProps & {
  tags: string[]
}

function Tag(props: { tag: string }) {
  const { tag } = props;
  return <Button tag="a" href={`/tags/${tag}`}>{tag}</Button>
}

export default function(props: PageTagsTemplateProps) {
  const tags = props.tags;
  return (
    <>
      {tags.map((tag) => <Tag tag={tag} />)}
    </>
  )
}
