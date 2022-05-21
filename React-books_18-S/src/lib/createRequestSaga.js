import { call, put } from "redux-saga/effects";
import { finishLoading, startLoading } from "../modules/loading";

export default function createRequestSaga(type, request) {
  // action type
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  // saga function
  return function* (action) {
    yield put(startLoading(type));

    try {
      const response = call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: response.data,
      }); // dispatch
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      }); // dispatch
    }

    yield put(finishLoading(type));
  };
}
