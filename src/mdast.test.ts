import { expect, test } from "vitest";
// import { fromMarkdown } from "mdast-util-from-markdown";
import { markdownParser } from "./mdast_utils";
import { inspect } from "unist-util-inspect";

test("admonition simple text", async () => {
  const SRC = `
:::info 情報！
ほげほげ
:::
`;

  const result = await markdownParser(SRC);
  console.log(inspect(result));
  expect(result.type).toEqual("root");
  expect(result.children[0].type).toEqual("msg");
  expect(result.children[0].children[0].value).toEqual("ほげほげtext");
});

// test("admonition", async () => {
//   const SRC = `
// :::info 情報！
// ほげほげ
// :::
// `;
//
//   const result = await markdownParser(SRC);
//   // console.log(JSON.stringify(result, null, 2));
//   expect(result.type).toEqual("root");
//   expect(result.children[0].type).toEqual("msg");
// });
