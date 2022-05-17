import { useReducer } from "react";

const reducer = (state, action) => {
  console.log("state - ", state);
  console.log("action - ", action);
  return {
    ...state,
    [action.name]: action.value,
  };
};

function ReducerExample() {
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    nickname: "",
  });

  const { name, nickname } = state;

  const onChange = (e) => {
    dispatch(e.target);
  };

  return (
    <>
      <div>
        <input type="text" name="name" value={name} onChange={onChange} />
        <input
          type="text"
          name="nickname"
          value={nickname}
          onChange={onChange}
        />
      </div>
      <div>
        <h1>이름: {name}</h1>
      </div>
      <div>
        <h1>닉네임: {nickname}</h1>
      </div>
    </>
  );
}

export default ReducerExample;
