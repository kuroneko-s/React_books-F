import { createAction, handleActions } from "redux-actions";

// action type 정의
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

// action 생성 function
export const createIncrease = createAction(INCREASE);
export const createDecrease = createAction(DECREASE);

const initState = {
  number: 0,
};

// reducer
/* function counter(state = initState, action) {
  console.log(action);
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        number: state.number + 1,
      };
    case DECREASE:
      return {
        ...state,
        number: state.number - 1,
      };
    default:
      return state;
  }
} */

// libarary 사용 시
const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({
      number: state.number + 1,
    }),
    [DECREASE]: (state, action) => ({
      number: state.number - 1,
    }),
  },
  initState
);

export default counter;
