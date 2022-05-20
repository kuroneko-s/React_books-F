import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import App from "./App";
import rootReducer from "./modules/index";
import reportWebVitals from "./reportWebVitals";
import loggerMiddleware from "./lib/loggerMiddleware";
import { createLogger } from "redux-logger";
import ReduxThunk from "redux-thunk";

const reduxLogger = createLogger({
  duration: true,
  timestamp: true,
});

// const store = createStore(rootReducer);
const store = configureStore({
  reducer: rootReducer,
  middleware: [ReduxThunk],
});

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
