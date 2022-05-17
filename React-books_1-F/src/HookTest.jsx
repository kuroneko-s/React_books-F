import { useEffect, useState } from "react";

function HookTest() {
  const [name, setName] = useState("");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    console.log("effect");
    console.log(name);
    return () => {
      console.log("clreanUP");
      console.log(name);
    };
  }, [name]);

  return (
    <>
      <button type="button" onClick={() => setClicked((prev) => !prev)}>
        {clicked ? "보이기" : "숨기기"}
      </button>
      {clicked ? <hr /> : null}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </>
  );
}

export default HookTest;
