import { Component, useState } from "react";

function ExampleFn(props) {
  const [number, setNumber] = useState(0);
  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => setNumber((prev) => prev + 1)}>+1</button>
    </>
  );
}

ExampleFn.defaultProps = {
  value: "Defualt value",
};

class Example extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    number: 0,
    fixedNumber: 0,
  };

  render() {
    return (
      <>
        <h1>{this.state.number}</h1>
        <h1>{this.state.fixedNumber}</h1>
        <button onClick={() => this.setState((prev, props) => prev.number + 1)}>
          +1
        </button>
        <button
          onClick={() => {
            this.setState({ fixedNumber: this.state.fixedNumber + 1 }, () => {
              console.log("callback? - ", this.state.fixedNumber);
            });
          }}
        >
          +1
        </button>
      </>
    );
  }
}

export default Example;
