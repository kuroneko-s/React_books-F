import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import express from "express";
import App from "./App";
import path from "path";
import fs from "fs";

const app = express();

const manifest = JSON.parse(
  fs.readFileSync(path.resolve("./build/asset-manifest.json"), "utf8")
);

const chunks = Object.keys(manifest.files)
  .filter((key) => /chunk\.js$/.exec(key)) // chunk.js로 끝나는 키를 찾아옴
  .map((key) => `<script src="${manifest.files[key]}"> </script>`)
  .join("");

function createPage(root) {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>React App</title>
            <link href="${manifest.files["main.css"]}" rel="stylesheet" />
        </head>
        <body>
            <noscript>You need to enable JS to run this app.</noscript>
            <div id="root">
                ${root}
            </div>
            <script src="${manifest.files["runtime-main.js"]}"> </script>
            ${chunks}
            <script src="${manifest.files["main.js"]}"> </script>
        </body>
        </html>
    `;
}

const serverRender = (req, res, next) => {
  const context = {};
  const jsx = (
    // 주로 서버 사이드 렌더링 용도로 사용되는 라우터
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const root = ReactDOMServer.renderToString(jsx);

  res.send(createPage(root));
};

app.use(
  express.static(path.resolve("./build"), {
    index: false,
  })
);
app.use(serverRender);

app.listen(5000, () => {
  console.log("Running on http:localhost:5000");
});
