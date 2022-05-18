import { createContext, useState } from "react";

const ColorContext = createContext({
  state: { color: "", subcolor: "" },
  action: {
    setColor: () => {},
    setSubcolor: () => {},
  },
});

// <> {이 값을 넘겨 받음} </>
// render props
const ColorProvider = ({ children }) => {
  const [color, setColor] = useState("black");
  const [subcolor, setSubcolor] = useState("red");

  const value = {
    state: { color, subcolor },
    action: { setColor, setSubcolor },
  };

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

const { Consumer: ColorConsumer } = ColorContext;

export { ColorProvider, ColorConsumer };

export default ColorContext;
