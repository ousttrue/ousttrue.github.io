// import { markdownParser } from "./mdast_utils";
import { inspect } from "unist-util-inspect";
import { remark } from "remark";
import { Plugin } from "unified";
import { Root } from "mdast";
import {
    Code,
    Construct,
    Extension,
    Effects,
    HtmlExtension,
    Previous,
    State,
    Tokenizer,
} from "micromark-util-types";
import { Extension as FromMarkdownExtension } from "mdast-util-from-markdown";
import { codes } from "micromark-util-symbol"
import { msgBlock } from "./msg-block";


function exMd(): Extension {
    return {
        text: {
            [codes.colon]: msgBlock,
        },
    };
}

/** MDAST extension (tokens -> MDAST) */

function exFromMarkdown(): FromMarkdownExtension {
    // Initialize state
    let name: string | undefined;

    return {
        // enter: {
        //     [types.tag](token) {
        //         this.enter({ type: "tag", value: "", data: { name: "" } }, token);
        //     },
        //     [types.tagName](token) {
        //         name = this.sliceSerialize(token);
        //     },
        // },
        // exit: {
        //     [types.tag](token) {
        //         const node = this.stack[this.stack.length - 1];

        //         if (node.type === "tag") {
        //             node.data.name = name || "";
        //             node.value = `#${name}`;
        //         }

        //         this.exit(token);

        //         // Reset state
        //         name = undefined;
        //     },
        // },
    };
}

function plugin(): ReturnType<Plugin<[], Root>> {
    // @ts-ignore I'm not sure how to type `this`
    const data = this.data();

    add("micromarkExtensions", exMd());
    add("fromMarkdownExtensions", exFromMarkdown());

    function add(field: string, value: unknown) {
        const list = data[field] ? data[field] : (data[field] = []);
        list.push(value);
    }
}

async function main() {
    const SRC = `
:::info 情報！
ほげほげ
[go](http://go.x.com)
:::
`;

    const parseMarkdown = remark().use(plugin);
    const parsed = parseMarkdown.parse(SRC);
    const mdastRoot = await parseMarkdown.run(parsed);

    // const result = await markdownParser(SRC);
    console.log(inspect(mdastRoot));
}

main();
