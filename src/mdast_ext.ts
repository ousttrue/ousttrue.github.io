import { Node, Parent, Literal } from "unist";
import { Paragraph, Text } from "mdast";
import unified from "unified";
import { Node, Parent } from "unist";
import { VFileCompatible } from "vfile";
import { visit } from "unist-util-visit";
import { Paragraph } from "mdast";
// import { inspect } from "unist-util-inspect";

function isObject(target: unknown): target is { [key: string]: unknown } {
  return typeof target === "object" && target !== null;
}

// https://github.com/syntax-tree/unist#node
export function isNode(node: unknown): node is Node {
  return isObject(node) && "type" in node;
}

// https://github.com/syntax-tree/unist#parent
export function isParent(node: unknown): node is Parent {
  return isObject(node) && Array.isArray(node.children);
}

// https://github.com/syntax-tree/unist#literal
export function isLiteral(node: unknown): node is Literal {
  return isObject(node) && "value" in node;
}

// https://github.com/syntax-tree/mdast#paragraph
export function isParagraph(node: unknown): node is Paragraph {
  return isNode(node) && node.type === "paragraph";
}

// https://github.com/syntax-tree/mdast#text
export function isText(node: unknown): node is Text {
  return (
    isLiteral(node) && node.type === "text" && typeof node.value === "string"
  );
}

const MESSAGE_BEGGINING = /^:::([^\n]*)\n(.*)/;
const MESSAGE_ENDING = "\n:::";

function isMessage(node: unknown): node is Paragraph {
  if (!isParagraph(node)) {
    return false;
  }

  const { children } = node;

  const firstChild = children[0];
  if (!(isText(firstChild) && firstChild.value.match(MESSAGE_BEGGINING))) {
    return false;
  }

  const lastChild = children[children.length - 1];
  if (!(isText(lastChild) && lastChild.value.endsWith(MESSAGE_ENDING))) {
    return false;
  }

  return true;
}

function processFirstChild(children: Array<Node>, identifier: RegExp) {
  const firstChild = children[0];
  const firstValue = firstChild.value as string;
  // if (firstValue === identifier) {
  //   children.shift();
  // } else 

  const m = firstValue.match(identifier);

  {
    children[0] = {
      ...firstChild,
      value: m[2],
    };
  }

  return m[1];
}

function processLastChild(children: Array<Node>, identifier: string) {
  const lastIndex = children.length - 1;
  const lastChild = children[lastIndex];
  const lastValue = lastChild.value as string;
  if (lastValue === identifier) {
    children.pop();
  } else {
    children[lastIndex] = {
      ...lastChild,
      value: lastValue.slice(0, lastValue.length - identifier.length),
    };
  }
}

function visitor(node: Paragraph, index: number, parent: Parent | undefined) {
  if (!isParent(parent)) {
    return;
  }

  const children = [...node.children];
  const m = processFirstChild(children, MESSAGE_BEGGINING);
  processLastChild(children, MESSAGE_ENDING);

  parent.children[index] = {
    type: "msg",
    msg: m,
    children,
  };
}

export const plugin: unified.Plugin = () => {
  return (tree: Node, _file: VFileCompatible) => {
    visit(tree, isMessage, visitor);
  };
};
