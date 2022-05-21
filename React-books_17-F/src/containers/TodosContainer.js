import React, { useCallback } from "react";
import {
  useDispatch,
  useSelector,
} from "../../node_modules/react-redux/es/exports";
import Todos from "../components/Todos";
import { useActions } from "../lib/useActions";
import {
  createChangeInput,
  createInsert,
  createToggle,
  createRemove,
} from "../modules/todos";

const TodosContainer = () => {
  const { input, todos } = useSelector(({ todos }) => ({
    input: todos.input,
    todos: todos.todos,
  }));

  /* const dispatch = useDispatch();
  const onChangeInput = useCallback(
    (input) => dispatch(createChangeInput(input)),
    [dispatch]
  );
  const onInsert = useCallback(
    (text) => dispatch(createInsert(text)),
    [dispatch]
  );
  const onToggle = useCallback((id) => dispatch(createToggle(id)), [dispatch]);
  const onRemove = useCallback((id) => dispatch(createRemove(id)), [dispatch]); */
  const [onChangeInput, onInsert, onToggle, onRemove] = useActions(
    [createChangeInput, createInsert, createToggle, createRemove],
    []
  );

  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
      onToggle={onToggle}
      onRemove={onRemove}
    />
  );
};

// store를 TodosContainer Component에서 접근 가능
/* export default connect(
  ({ todos }) => ({
    input: todos.input,
    todos: todos.todos,
  }),
  {
    createChangeInput,
    createInsert,
    createToggle,
    createRemove,
  }
)(TodosContainer);
 */

// connect는 React.memo를 자동으로 적용해주는데 Hooks는 별도로 적용을 시켜주는 코드가 들어가있어야 한다.
export default React.memo(TodosContainer);
