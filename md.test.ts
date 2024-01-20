import { expect, test } from "vitest";
import {
  type Extension,
  type TokenizeContext,
  type Effects,
  type State,
} from "micromark-util-types";
import { fromMarkdown } from "mdast-util-from-markdown";
import { codes, types } from "micromark-util-symbol";
import assert from "node:assert";

const SRC = `
:::info 情報！
ほげほげ
:::
`;

// override default options
const defaultOptions = {
  customTypes: [],
  useDefaultTypes: true,
  infima: true,
  tag: ":::",
  icons: "svg",
};
const configure = (options) => {
  const { customTypes, ...baseOptions } = {
    ...defaultOptions,
    ...options,
  };

  return {
    ...baseOptions,
    types: { ...types, ...customTypes },
  };
};
const config = configure({});

// escape regex special characters
function escapeRegExp(s: string) {
  return s.replace(new RegExp(`[-[\\]{}()*+?.\\\\^$|/]`, "g"), "\\$&");
}

// match to determine if the line is an opening tag
const keywords = Object.keys(config.types).map(escapeRegExp).join("|");
const tag = escapeRegExp(config.tag);
const regex = new RegExp(`${tag}(${keywords})(?: *(.*))?\n`);
const escapeTag = new RegExp(escapeRegExp(`\\${config.tag}`), "g");

// port from https://github.com/elviswolcott/remark-admonitions/blob/master/lib/index.js
function blockTokenizer(eat, value, silent) {
  // stop if no match or match does not start at beginning of line
  const match = regex.exec(value);
  if (!match || match.index !== 0) return false;
  // if silent return the match
  if (silent) return true;

  const now = eat.now();
  const [opening, keyword, title] = match;
  const food = [];
  const content = [];

  // consume lines until a closing tag
  let idx = 0;
  while ((idx = value.indexOf(NEWLINE)) !== -1) {
    // grab this line and eat it
    const next = value.indexOf(NEWLINE, idx + 1);
    const line =
      next !== -1 ? value.slice(idx + 1, next) : value.slice(idx + 1);
    food.push(line);
    value = value.slice(idx + 1);
    // the closing tag is NOT part of the content
    if (line.startsWith(config.tag)) break;
    content.push(line);
  }

  // consume the processed tag and replace escape sequences
  const contentString = content.join(NEWLINE).replace(escapeTag, config.tag);
  const add = eat(opening + food.join(NEWLINE));

  // parse the content in block mode
  const exit = this.enterBlock();
  const contentNodes = element(
    "div",
    "admonition-content",
    this.tokenizeBlock(contentString, now),
  );
  exit();
  // parse the title in inline mode
  const titleNodes = this.tokenizeInline(title || formatKeyword(keyword), now);
  // create the nodes for the icon
  const entry = config.types[keyword];
  const settings = typeof entry === "string" ? config.types[entry] : entry;
  const iconNodes =
    config.icons === "svg" ? nodes(settings.svg) : text(settings.emoji);
  const iconContainerNodes =
    config.icons === "none"
      ? []
      : [element("span", "admonition-icon", [iconNodes])];

  // build the nodes for the full markup
  const admonition = element(
    "div",
    ["admonition", `admonition-${keyword}`].concat(
      settings.ifmClass ? ["alert", `alert--${settings.ifmClass}`] : [],
    ),
    [
      element("div", "admonition-heading", [
        element("h5", "", iconContainerNodes.concat(titleNodes)),
      ]),
      contentNodes,
    ],
  );

  return add(admonition);
}

function tokenize(
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State,
): (code: number) => State {
  const self = this;

  return start;

  /** @type {State} */
  function start(code: number): State {
    console.log("start:", code, effects);
    // assert(code === codes.colon, "expected `:`");
    // assert(previous.call(self, self.previous), "expected correct previous");
    // effects.enter("admonition");
    // effects.enter("admonitionMarker");
    // effects.consume(code);
    // effects.exit("admonitionMarker");
    // return blockTokenizer(self, effects, nok);
    return nok(code);
  }
}

function previous(this: TokenizeContext, code: number): boolean {
  // If there is a previous code, there will always be a tail.
  return (
    code !== codes.colon ||
    this.events[this.events.length - 1][1].type === types.characterEscape
  );
}

const admonition: Extension = {
  text: {
    [codes.colon]: {
      name: "admonition",
      tokenize,
    },
  },
};

test("micromark", () => {
  const result = fromMarkdown(SRC, {
    extensions: [admonition],
  });
  // console.log(JSON.stringify(result, null, 2));
  expect(result.type).toEqual("root");
  // expect(result.children[0].type).toEqual("heading");
});
