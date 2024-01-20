// sum.test.js
import { expect, test } from "vitest";
import { fromMarkdown } from "mdast-util-from-markdown";

function sum(a: number, b: number) {
  return a + b;
}

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("micromark", () => {
  const result = fromMarkdown("## Hello, *world*!");
  // console.log(result);
  expect(result.type).toEqual("root");
  expect(result.children[0].type).toEqual("heading");
});
