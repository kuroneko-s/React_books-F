import { createAction, handleActions } from "redux-actions";

// action type
const CHANGE_INPUT = "todos/CHANGE_INPUT";
const INSERT = "todos/INSERT";
const TOGGLE = "todos/TOGGLE";
const REMOVE = "todos/REMOVE";

// action create function
/* export const createChangeInput = (input) => ({ type: CHANGE_INPUT, input });
export const createInsert = (text) => ({
  type: INSERT,
  todo: {
    id: id++,
    text,
    done: false,
  },
});
export const createToggle = (id) => ({
  type: TOGGLE,
  id,
});
export const createRemove = (id) => ({
  type: REMOVE,
  id,
}); */
let id = 4;

// 두번째 인자에서 굳이 명시를 안하면 인풋 받은 값을 {payload: input_value}로 저장함
export const createChangeInput = createAction(CHANGE_INPUT, (input) => input);
export const createInsert = createAction(INSERT, (text) => ({
  id: id++,
  text,
  done: false,
}));
export const createToggle = createAction(TOGGLE, (id) => id);
export const createRemove = createAction(REMOVE, (id) => id);

const initState = {
  input: "",
  todos: [
    {
      id: 1,
      text: "리덕스 기초",
      done: true,
    },
    {
      id: 2,
      text: "리덕스 중급",
      done: false,
    },
    {
      id: 3,
      text: "리덕스 고급",
      done: false,
    },
  ],
};

// reducer
/* function todos(state = initState, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        input: action.input,
      };
    case INSERT:
      return {
        ...state,
        todos: [...state.todos, action.todo],
      };
    case TOGGLE:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, done: !todo.done } : todo
        ),
      };
    case REMOVE:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    default:
      return state;
  }
} */
const todos = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: input }) => ({
      ...state,
      input,
    }),
    [INSERT]: (state, { payload: todo }) => ({
      ...state,
      todos: [...state.todos, todo],
    }),
    [TOGGLE]: (state, { payload: id }) => ({
      ...state,
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      ),
    }),
    [REMOVE]: (state, { payload: id }) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id !== id),
    }),
  },
  initState
);

export default todos;
