import { fileURLToPath } from "node:url";
import path from "node:path";
import { readFile } from 'node:fs/promises'
import React from "react";
import type { StaticData, PageProps } from "minista"
import { glob } from "glob"
import fm from 'front-matter'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getStaticData(): Promise<StaticData> {

  const data = {
    props: {
      posts: [],
    },
  }

  const matches = await glob('**/*.md', { cwd: __dirname })

  for (const match of matches) {
    const res = await readFile(path.join(__dirname, match), { encoding: 'utf-8' });
    const post = fm(res).attributes;
    post.path = match.substring(0, match.length - 3).replace(/\\/g, '/');
    console.log(match, post);
    data.props.posts.push(post);
  }

  return data;
}

type PageIssuesProps = PageProps & {
  posts?: {
    title: string;
    path: string;
  }[]
}

export default function(props: PageIssuesProps) {
  return (
    <>
      <h1>Posts</h1>
      <ul>
        {props.posts?.map((item, index) => (
          <li key={index}>
            <a href={`${item.path}`}>{item.title}</a>
          </li>
        ))}
      </ul>
    </>
  )
}
