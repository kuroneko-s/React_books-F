import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { rootSaga } from './modules';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { check, tempSetUser } from './modules/user';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga); // saga를 먼저 실행시켜줘야 함

function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if (!user) return;

    store.dispatch(tempSetUser(JSON.parse(user)));
    store.dispatch(check());
  } catch (e) {
    console.log('localStorage is not working');
  }
}

loadUser();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
