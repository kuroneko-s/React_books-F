import { useCallback } from "react";
import {
  useDispatch,
  useSelector,
} from "../../node_modules/react-redux/es/exports";
import Todos from "../components/Todos";
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

  const dispatch = useDispatch();
  const onChangeInput = useCallback(
    (input) => dispatch(createChangeInput(input)),
    [dispatch]
  );
  const onInsert = useCallback(
    (text) => dispatch(createInsert(text)),
    [dispatch]
  );
  const onToggle = useCallback((id) => dispatch(createToggle(id)), [dispatch]);
  const onRemove = useCallback((id) => dispatch(createRemove(id)), [dispatch]);

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

export default TodosContainer;
