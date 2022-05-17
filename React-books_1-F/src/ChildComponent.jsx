import React, { useEffect, useMemo, useState } from "react";

function ChildComponent() {
  const [number, setNumber] = useState(0);

  console.log("child 렌더링");

  return (
    <div>
      {number}
      <button type="button" onClick={() => setNumber((prev) => prev + 1)}>
        +1
      </button>
    </div>
  );
}

export default React.memo(ChildComponent);
