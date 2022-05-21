import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import App from "./App";
import rootReducer, { rootSaga } from "./modules/index";
import reportWebVitals from "./reportWebVitals";
import loggerMiddleware from "./lib/loggerMiddleware";
import { createLogger } from "redux-logger";
import ReduxThunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "../node_modules/redux-devtools-extension/index";

const sagaMiddleware = createSagaMiddleware();

const reduxLogger = createLogger({
  duration: true,
  timestamp: true,
});

// const store = createStore(rootReducer);
const store = configureStore({
  reducer: rootReducer,
  // devTools: true,
  middleware: [ReduxThunk, sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
