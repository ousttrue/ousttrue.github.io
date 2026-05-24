import { TAGS } from "../../pages";
import { Tag } from "../../Title.tsx";

export default function(_) {
    const tags = [...TAGS];
    tags.sort();
  return (
    <div className="items">
      {tags
        .map((tag) => {
          // let date = `${typeof (post.frontmatter.date)}: ${post.frontmatter.date}`;
          return (
            <div className="item" key={tag}>
              <Tag tag={tag} />
            </div>
          );
        })}
    </div>
  );
}
