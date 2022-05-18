// action type 정의
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

// action 생성 function
export const createIncrease = () => ({ type: INCREASE });
export const createDecrease = () => ({ type: DECREASE });

const initState = {
  number: 0,
};

// reducer
function counter(state = initState, action) {
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
}

export default counter;
