import styled from "styled-components";
import {
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline,
  MdCheckBox,
} from "react-icons/md";
import React, { useCallback } from "react";

const Container = styled.div`
  /* padding: 1rem; */
  display: flex;
  align-items: center;
  &:nth-child(even) {
    background: #f8f9fa;
  }

  & + & {
    border-top: 1px solid #dee2e6;
  }
`;
const Todo = styled.div`
  cursor: pointer;
  display: flex;
  flex: 1;
  align-items: center;
  svg {
    font-size: 1.5rem;
    color: ${(props) => (props.checked ? "#22b8cf" : "black")};
  }
`;
const TodoContext = styled.div`
  margin-left: 0.5rem;
  flex: 1;
  color: ${(props) => (props.checked ? "#adb5bd" : "black")};
  text-decoration: ${(props) => (props.checked ? "line-through" : "black")};
`;
const Remove = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #ff6b6b;
  cursor: pointer;
  &:hover {
    color: #ff8787;
  }
`;

function TodoListItem({ todo, onRemove, onToggle, style }) {
  const { id, text, checked } = todo;

  return (
    <Container style={style}>
      <Todo checked={checked} onClick={() => onToggle(id)}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <TodoContext checked={checked}> {text} </TodoContext>
      </Todo>
      <Remove>
        <MdRemoveCircleOutline onClick={() => onRemove(id)} />
      </Remove>
    </Container>
  );
}

export default React.memo(
  TodoListItem,
  (prev, next) => prev.todo === next.todo
);
