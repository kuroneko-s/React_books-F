import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";
import rootReducer from "./modules";
import reportWebVitals from "./reportWebVitals";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./modules/index";
import { loadableReady } from "@loadable/component";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  preloadedState: window.__PRELOADED_STATE__, // 이 값을 초기 상태로 사용
  middleware: [thunk, sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

const Root = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};
const rootEl = document.getElementById("root");

// hydrate는 SSR된 값이 있으면 리액트가 싹다 덮어쓰는게 아니라 다른부분만 바꿔서 끼워줌
// render는 처음에 싹다 갈아 끼는듯
// pd 환경에서는 hydrate, 개발환경에서는 render
if (process.env.NODE_ENV === "production") {
  ReactDOM.hydrate(<Root />, rootEl);
} else {
  ReactDOM.render(<Root />, rootEl);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
