import React from 'react';
import { Badge, Card, Link } from 'react-daisyui'


export type PostType = {
  title: string;
  slug: string;
  date: Date;
  tags?: string[];
}


function Day(props: { date: Date | string }) {
  const date = (typeof (props.date) == 'string')
    ? new Date(props.date)
    : props.date
    ;
  function yyyy() {
    return date.getFullYear().toString();
  }
  function mm() {
    return (date.getMonth() + 1).toString().padStart(2, "0");
  }
  function dd() {
    return date.getDate().toString().padStart(2, "0");
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

function Tag(props: { tag: string }) {
  return <Badge color="secondary">{props.tag}</Badge>;
}

export default function PostHeader(props: { post: PostType }) {
  const post = props.post;

  return (
    <Card>
      <span style={{ display: 'inline-block' }}>
        <Card.Title>
          <Day date={post.date} />
          <a href={`/posts/${post.slug}`}>{post.title}</a>
        </Card.Title>
        {post.tags ? post.tags.map((x, i) => <Tag tag={x} key={i} />) : ''}
      </span>
    </Card>
  )
}