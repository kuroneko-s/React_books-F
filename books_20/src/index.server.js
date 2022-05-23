import ReactDOMServer, { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import express from "express";
import App from "./App";
import path from "path";
import fs from "fs";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./modules/index";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import PreloadContext from "./lib/PreloadContext";

const app = express();

const manifest = JSON.parse(
  fs.readFileSync(path.resolve("./build/asset-manifest.json"), "utf8")
);

const chunks = Object.keys(manifest.files)
  .filter((key) => /chunk\.js$/.exec(key)) // chunk.js로 끝나는 키를 찾아옴
  .map((key) => `<script src="${manifest.files[key]}"> </script>`)
  .join("");

function createPage(root, stateScript) {
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
            ${stateScript}
            <script src="${manifest.files["runtime-main.js"]}"> </script>
            ${chunks}
            <script src="${manifest.files["main.js"]}"> </script>
        </body>
        </html>
    `;
}

const serverRender = async (req, res, next) => {
  const context = {};
  const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
  }); // Requst가 올때마다 store를 생성해준다.

  const preloadContext = {
    done: false,
    promises: [],
  };

  // StaticRouter - 주로 서버 사이드 렌더링 용도로 사용되는 라우터
  const jsx = (
    <PreloadContext.Provider value={preloadContext}>
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    </PreloadContext.Provider>
  );

  // renderToStaticMarkup - 리액트로 정적인 페이지를 만들 때 사용한다.
  // 이 렌더링으로 나온 결과값은 클라쪽에서 HTML DOM 인터렉션을 지원하기 힘들다.
  // 얘를 사용한 이유는 Preloader로 넣어준 함수를 호출하기 위해서 그리고 조금 더 빨라서
  ReactDOMServer.renderToStaticMarkup(jsx); // 한번 렌더링 해주고

  try {
    await Promise.all(preloadContext.promises); // 모든 Promise를 기다려 준다
  } catch (e) {
    return res.status(500);
  }

  preloadContext.done = true;

  const root = ReactDOMServer.renderToString(jsx);

  // 악성 스크립트가 실행되는 것을 방지하기 위해서 <를 치환 처리
  // https://redux.js.org/usage/server-rendering#security-considerations
  const stateString = JSON.stringify(store.getState()).replace(/</g, "\\u003c");
  const stateScript = `<script>__PRELOADED_STATE__=${stateString}</script>`; // 리덕스 초기 상태를 스크립트로 주입한다.

  res.send(createPage(root, stateScript));
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
