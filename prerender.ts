import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

// prerender.jsの絶対パスを取得
// 後のファイル読み書きに使う
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

// src/pagesにあるファイルをそれぞれ読み取ってルート名を保持
const routesToPrerender = fs
  .readdirSync(toAbsolute("src/pages"))
  .map((file) => {

    // index.tsxの場合はページを追加する必要はない
    if (file == "index.tsx") {
      return;
    }

    // 拡張子のtsxを消去
    const name = file.replace(/\.tsx$/, "");

    // Homeは各々のrootになるpage名を指定
    return name === "Home" ? `/` : `/${name}`;
  });

// 先程作成したrenderを呼び出す
// build後のファイルから呼び出すため、以下のpathになっている
const { render } = await import("./dist/server/entry-server.js");

(async () => {

  // それぞれのルートをHTMLファイルとして書き出す
  for (const url of routesToPrerender) {

    // 空のurlがあった場合は何も行わない
    if (!url) {
      return;
    }

    // index.htmlをtemplateとして利用
    const template = fs.readFileSync(
      toAbsolute("dist/static/index.html"),
      "utf-8"
    );

    // renderからappHtmlを受け取り、index.htmlで指定した<!--outlet-->の部分に挿入
    const appHtml = await render(url);
    const html = template.replace(`<!--outlet-->`, appHtml);

    // ファイルを書き出す先のパス指定とファイルの名前指定
    const filePath = `dist/static${url === "/" ? "/index" : url}.html`;

    // 先程指定したファイルパスにファイルを書き出し
    fs.writeFileSync(toAbsolute(filePath), html);
  }
})();
