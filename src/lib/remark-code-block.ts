import type { Code } from "mdast";
import { visit } from "unist-util-visit";

export default function remarkCodeBlock() {
  return (tree: any) => {
    visit(tree, "code", function(node) {
      console.log(node)
      // const { lang, meta, value } = node as Code;
      // const title = meta;
      //
      // node.type = "paragraph";
      // node.data = {
      //   hName: "code-block",
      //   hProperties: {
      //     code: value,
      //     ...(lang ? { lang } : {}),
      //     ...(title ? { title } : {}),
      //   },
      // };
      // node.children = [];
    });
  };
}
