import { fileURLToPath } from "node:url";
import path from "node:path";
import { readFile } from 'node:fs/promises'
import React from "react";
import type { StaticData, PageProps } from "minista"
import { glob } from "glob"
import fm from 'front-matter'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type Post = {
  title: string;
  path: string;
  date: Date;
}

export async function getStaticData(): Promise<StaticData> {

  const data: { props: { posts: Post[] } } = {
    props: {
      posts: [],
    },
  }

  const matches = await glob('**/*.md', { cwd: __dirname })

  for (const match of matches) {
    const res = await readFile(path.join(__dirname, match), { encoding: 'utf-8' });
    const post = fm(res).attributes as Post;
    post.path = match.substring(0, match.length - 3).replace(/\\/g, '/');
    // console.log(match, post);
    data.props.posts.push(post);
  }

  return data;
}

type PageIssuesProps = PageProps & {
  posts?: Post[]
}

function Date(props: { date: Date }) {
  function yyyy() {
    return props.date.getFullYear().toString();
  }
  function mm() {
    return (props.date.getMonth() + 1).toString().padStart(2, "0");
  }
  function dd() {
    return props.date.getDate().toString().padStart(2, "0");
  }

  /// yyyy
  /// mmdd
  return (<span className="date">
    <div className="year">{yyyy()}</div>
    <div className="mmdd">
      <span className="mm">{mm()}</span>
      <span className="dd">{dd()}</span>
    </div>
  </span>)
}

export default function(props: PageIssuesProps) {
  return (
    <>
      <h1>Posts</h1>
      <ul>
        {props.posts?.map((item, index) => (
          <li key={index}>
            <Date date={item.date} />
            <a href={`${item.path}`}>{item.title}</a>
          </li>
        ))}
      </ul>
    </>
  )
}
