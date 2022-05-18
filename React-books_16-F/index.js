const { createStore } = require("redux");

const divToggle = document.querySelector(".toggle");
const counter = document.querySelector("h1");
const btnIncrease = document.querySelector("#increase");
const btnDecrease = document.querySelector("#decrease");

// action type
const TOGGLE_SWITCH = "TOGGLE_SWITCH";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

const createToggleSwitch = () => ({ type: TOGGLE_SWITCH });
const createIncrease = (difference) => ({ type: INCREASE, difference });
const createDecrease = () => ({ type: DECREASE });

// Reducer가 동작하면 값이 변할 타입 형태
/* 
    interface IInitState {
        toggle: Boolean;
        counter: Number;
    } 
*/

const initState = {
  toggle: false,
  counter: 0,
};

// reducer (값을 변하게 하는 핵심 함수)
function reducer(state = initState, action) {
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state,
        toggle: !state.toggle,
      };
    case INCREASE:
      return {
        ...state,
        counter: action.difference + state.counter,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

const render = () => {
  const state = store.getState(); // 현재 상태 가져옴

  if (state.toggle) {
    divToggle.classList.add("active");
  } else {
    divToggle.classList.remove("active");
  }

  counter.innerText = state.counter;
};

render();

// store의 상태 값이 바뀔때마다 render 함수가 동작한다.
store.subscribe(render);

divToggle.onclick = () => {
  store.dispatch(createToggleSwitch());
};

btnIncrease.onclick = () => {
  store.dispatch(createIncrease(2));
};

btnDecrease.onclick = () => {
  store.dispatch(createDecrease());
};
