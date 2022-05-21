import { createAction, handleActions } from "redux-actions";
import {
  select,
  delay,
  put,
  takeEvery,
  throttle,
  takeLatest,
} from "redux-saga/effects";

// action type
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";
const INCREASE_ASYNC = "counter/INCREASE_ASYNC";
const DECREASE_ASYNC = "counter/DECREASE_ASYNC";

// action function
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// 얘네들은 마우스 클릭 이벤트로 동작할 얘들이 아니라서 파라미터를 안받게 해야함
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

// saga function
function* increaseSage() {
  yield delay(1000);
  yield put(increase()); // 해당 함수를 dispatch!
  const number = yield select((state) => state.counter); // select는 스토어의 state 값
  console.log(`현재 값은 ${number}이다.`);
}

function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
}

export function* counterSaga() {
  // takeEvery는 들어오는 모든 액션에 대해 특정 작업을 처리해 준다
  // INCREASE_ASYNC <- 이 액션이 들어오면 increaseSage <- 얘가 동작
  // yield takeEvery(INCREASE_ASYNC, increaseSage);

  // n초에 단 한번만 호출되도록 수정
  yield throttle(10000, INCREASE_ASYNC, increaseSage);

  // 기존에 진행 중이던 작업이 있으면 취소 처리하고 가장 마지막으로 실행된 작업만 수행한다/
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

const initState = 0;

// reducer
const counter = handleActions(
  {
    [INCREASE]: (number) => number + 1,
    [DECREASE]: (number) => number - 1,
  },
  initState
);

export default counter;
