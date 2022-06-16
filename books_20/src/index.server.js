import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import express from "express";
import App from "./App";
import path from "path";
import fs from "fs";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer, { rootSaga } from "./modules/index";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import PreloadContext from "./lib/PreloadContext";
import createSagaMiddleware, { END } from "redux-saga";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";

const app = express();

const manifest = JSON.parse(
  fs.readFileSync(path.resolve("./build/asset-manifest.json"), "utf8")
);
// SSR 하면 build의 결과물에 chunk.js로 파편화 될거니깐 해당 포맷으로 끝나는 파일들을 가져옴
const chunks = Object.keys(manifest.files)
  .filter((key) => /chunk\.js$/.exec(key)) // chunk.js로 끝나는 키를 찾아옴
  .map((key) => `<script src="${manifest.files[key]}"> </script>`)
  .join("");

const statsFile = path.resolve("./build/loadable-stats.json");

function createPage(root, tags) {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>React App</title>
            ${tags.styles}
            ${tags.links}
        </head>
        <body>
            <noscript>You need to enable JS to run this app.</noscript>
            <div id="root">
                ${root}
            </div>
            ${tags.scripts}
        </body>
        </html>
    `;
}

const serverRender = async (req, res, next) => {
  // 이 함수가 404가 안뜨고 서버 렌더링 하게끔  해준다고 함
  const context = {};
  const sagaMiddle = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk, sagaMiddle],
  }); // Requst가 올때마다 store를 생성해준다.

  // sagaMiddle.run(rootSaga) <- 이 작업을 Promise로 변환해줌. 별도의 작업이 없으면 해당 프로미스는 종료되지 않음
  const sagaPromise = sagaMiddle.run(rootSaga).toPromise();

  const preloadContext = {
    done: false,
    promises: [],
  };

  const extractor = new ChunkExtractor({ statsFile });

  // StaticRouter - 주로 서버 사이드 렌더링 용도로 사용되는 라우터
  const jsx = (
    <ChunkExtractorManager extractor={extractor}>
      <PreloadContext.Provider value={preloadContext}>
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      </PreloadContext.Provider>
    </ChunkExtractorManager>
  );

  // renderToStaticMarkup - 리액트로 정적인 페이지를 만들 때 사용한다.
  // 이 렌더링으로 나온 결과값은 클라쪽에서 HTML DOM 인터렉션을 지원하기 힘들다.
  // 얘를 사용한 이유는 Preloader로 넣어준 함수를 호출하기 위해서 그리고 조금 더 빨라서
  ReactDOMServer.renderToStaticMarkup(jsx); // 한번 렌더링 해주고
  store.dispatch(END); // redux-saga의 END 액션을 발생시키면 액션을 모니터링하는 사가들이 모두 종료된다.

  try {
    await sagaPromise; // 기존에 진행 중이던 사가들이 끝날때까지 대기
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

  const tags = {
    scripts: stateScript + extractor.getScriptTags(), // 스크립트 앞부분에 리덕스 상태 넣기
    links: extractor.getLinkTags(),
    styles: extractor.getStyleTags(),
  };

  res.send(createPage(root, tags));
};

app.use(
  express.static(path.resolve("./build"), {
    index: false, // / 경로에서 index.html을 보여주지 않도록 설정
  })
);
app.use(serverRender);

app.listen(5000, () => {
  console.log("Running on http:localhost:5000");
});
