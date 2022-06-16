import React, { Suspense, useState } from "react";
import loadable from "@loadable/component";

// const SplitMe = React.lazy(() => import("./SplitMe"));
const SplitMe = loadable(() => import("./SplitMe"), {
  fallback: <div>Loading...</div>,
});

function App() {
  const [visible, setVisible] = useState(false);

  const onClick = () => {
    // notify();

    // dynamic import
    // import("./notify").then((result) => result.default());

    setVisible(true);
  };

  const onMouseOver = () => {
    SplitMe.preload();
  };

  return (
    <div>
      <h1 onClick={onClick} onMouseOver={onMouseOver}>
        Hello!
      </h1>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      {visible && <SplitMe />}
      {/* </Suspense> */}
    </div>
  );
}

/* import React, { Component } from "react";

class App extends Component {
  state = {
    SplitMe: null,
  };

  handleClick = async () => {
    const loadedModule = await import("./SplitMe");
    this.setState({
      SplitMe: loadedModule.default,
    });
  };

  render() {
    const { SplitMe } = this.state;
    return (
      <div>
        <p onClick={this.handleClick}>WOW</p>
        {SplitMe && <SplitMe />}
      </div>
    );
  }
} */

export default App;
