import { createAction, handleActions } from "redux-actions";

// action type
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

// action function
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

export const increaseAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(increase());
  }, 1000);
};

export const decreaseAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(decrease());
  }, 1000);
};

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
