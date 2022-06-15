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

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  preloadedState: window.__PRELOADED_STATE__, // 이 값을 초기 상태로 사용
  middleware: [thunk, sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
