import { useEffect, useState } from "react";
import ChildComponent from "./ChildComponent";

function MemoExample({ name }) {
  console.log("parent 렌더링");

  return (
    <>
      <h1>{name}</h1>
      <hr />
      <ChildComponent />
    </>
  );
}

export default MemoExample;
