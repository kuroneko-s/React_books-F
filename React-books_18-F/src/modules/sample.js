import { handleActions, createAction } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import * as api from "../lib/api";
import createRequestSaga from "../lib/createRequestSaga";

// action types
const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";
// const GET_POST_FAILURE = "sample/GET_POST_FAILURE";

const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";
// const GET_USERS_FAILURE = "sample/GET_USERS_FAILEURE";

export const getPost = createAction(GET_POST, (id) => id);
export const getUsers = createAction(GET_USERS);

// Saga function
/*
function* getPostSaga(action) {
  yield put(startLoading(GET_POST));
  // action 파라미터를 받아오게 하면 액션 정보를 조회할 수 있다.

  try {
    // call을 사용하면 Promise를 반환하는 함수를 호출하고, 기다릴 수 있다. (await)
    const post = yield call(api.getPost, action.payload); // api.getPost(action.payload)
    yield put({
      type: GET_POST_SUCCESS,
      payload: post.data,
    });
  } catch (e) {
    yield put({
      type: GET_POST_FAILURE,
      payload: e,
      error: true,
    });
  }
  yield put(finishLoading(GET_POST));
}

function* getUsersSaga() {
  yield put(startLoading(GET_USERS));
  // action 파라미터를 받아오게 하면 액션 정보를 조회할 수 있다.

  try {
    // call을 사용하면 Promise를 반환하는 함수를 호출하고, 기다릴 수 있다. (await)
    const post = yield call(api.getUsers); // api.getUsers()
    yield put({
      type: GET_USERS_SUCCESS,
      payload: post.data,
    });
  } catch (e) {
    yield put({
      type: GET_USERS_FAILURE,
      payload: e,
      error: true,
    });
  }
  yield put(finishLoading(GET_USERS));
}
*/
const getPostSaga = createRequestSaga(GET_POST, api.getPost);
const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);

export function* sampleSaga() {
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_USERS, getUsersSaga);
}

const initState = {
  post: null,
  users: null,
};

const sample = handleActions(
  {
    [GET_POST_SUCCESS]: (state, { payload }) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false,
      },
      post: payload,
    }),
    [GET_USERS_SUCCESS]: (state, payload) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: false,
      },
      users: payload.payload,
    }),
  },
  initState
);

export default sample;
