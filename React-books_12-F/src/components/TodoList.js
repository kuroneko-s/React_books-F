import React from "react";
import styled from "styled-components";
import { List } from "react-virtualized";
import TodoListItem from "./TodoListItem";
import { useCallback } from "react";

const Container = styled(List)`
  min-height: 320px;
  max-height: 513px;
  overflow-y: auto;
`;

function TodoList({ todos, onRemove, onToggle }) {
  const rowRenderer = useCallback(
    (props) => {
      const { index, key, style } = props;
      console.log(props);
      const todo = todos[index];
      return (
        <TodoListItem
          key={key}
          todo={todo}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      );
    },
    [onRemove, onToggle, todos]
  );

  return (
    <Container
      width={512}
      height={513}
      rowCount={todos.length}
      rowHeight={57}
      rowRenderer={rowRenderer}
      list={todos}
      style={{ outline: "none" }}
    />
  );
}

export default React.memo(TodoList);
