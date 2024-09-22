import { type Frontmatter } from '../mymd-vite-plugin';
import DateFormat from './DateFormat';

export function Tag({ tag }: { tag: string }) {
  return <a className="button" href={`/tags/${tag}/`}>{tag}</a>
}

export default function Title({ path, frontmatter, className }: {
  path: string,
  frontmatter: Frontmatter,
  className?: string
}) {
  return (<div className={className ? className : "item"}>
    <header className="title">
      <DateFormat date={frontmatter.date} />
      {frontmatter.tags ? frontmatter.tags.map((tag, i) => <Tag key={i} tag={tag} />) : ''}
    </header>
    <main>
      <h2><a href={path}>
        {frontmatter.title}
      </a></h2>
    </main>
  </div>);
}
