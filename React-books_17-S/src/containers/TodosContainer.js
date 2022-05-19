import { connect } from "react-redux";
import Todos from "../components/Todos";
import {
  createChangeInput,
  createInsert,
  createToggle,
  createRemove,
} from "../modules/todos";

const TodosContainer = ({
  input,
  todos,
  createChangeInput,
  createInsert,
  createToggle,
  createRemove,
}) => {
  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={createChangeInput}
      onInsert={createInsert}
      onToggle={createToggle}
      onRemove={createRemove}
    />
  );
};

// store를 TodosContainer Component에서 접근 가능
export default connect(
  ({ todos }) => {
    console.log("Container connect - ", todos.todos);
    return {
      input: todos.input,
      todos: todos.todos,
    };
  },
  {
    createChangeInput,
    createInsert,
    createToggle,
    createRemove,
  }
)(TodosContainer);
