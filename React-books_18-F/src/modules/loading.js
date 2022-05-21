import { createAction, handleActions } from "redux-actions";

// action type
const START_LOADING = "loading/START_LOADING";
const FINISH_LOADING = "loading/FINISH_LOADING";

// 요청을 위한 액션 타입을 payload로 설정한다.
// 값의 여부에 따라서 payload에 있는 값으로 action을 한다 ?
export const startLoading = createAction(
  START_LOADING,
  (requestType) => requestType
);

export const finishLoading = createAction(
  FINISH_LOADING,
  (requestType) => requestType
);

/*
    type: loading/START_LOADING, // loading's type
    payload: "sample/GET_POST" // sample's type
*/

const initState = {};

// redux
const loading = handleActions(
  {
    [START_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: true,
    }),
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false,
    }),
  },
  initState
);

export default loading;
