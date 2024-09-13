import { markdownParser, markdownModifyAsync, isParent } from './src/mdast_utils.tsx';
import fs from 'node:fs';
import type { Node, Parent, Text, Code, InlineCode } from 'mdast';

if (process.argv.length < 3) {
  console.log(`usage: ${process.argv[1]} {path_to.md}`);
  process.exit();
}

const file = process.argv[2];
console.log(file);

const src = fs.readFileSync(file, { encoding: 'utf-8' });

function indent(level: number): string {
  return ''.padStart(level * 2, ' ');
}

function printNode(node: Node, level = 0) {
  if (isParent(node)) {
    console.log(`${indent(level)}${node.type}: [`);
    for (const child of node.children) {
      printNode(child, level + 1);
    }
    console.log(`${indent(level)}]`);
  }
  else {
    switch (node.type) {
      case "text":
        {
          const typed = node as Text;
          console.log(`${indent(level)}${node.type}: ${typed.value}`);
          break;
        }

      case 'code':
        {
          const typed = node as Code;
          console.log(`${indent(level)}${node.type}: ${typed.lang}`);
          // console.log(node.html);
          break;
        }

      case 'inlineCode':
        {
          const typed = node as InlineCode;
          console.log(`${indent(level)}${node.type}: ${typed.value}`);
          break;
        }

      case 'yaml':
        {
          console.log(`${indent(level)}${node.type}:`);
          break;
        }

      default: throw node.type;
    }
  }
}

const ast = await markdownParser(src);
await markdownModifyAsync(ast);
printNode(ast);
