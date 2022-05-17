import { Component } from "react";
import MemoExample from "./MemoExample";
import ReducerExample from "./ReducerExample";

// function App(props = "Default Props") {
//   return <EventTest></EventTest>;
// }

class App extends Component {
  state = {
    name: "",
  };

  render() {
    return (
      <>
        <input
          type="text"
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.target.value })}
        />
        <hr />
        <MemoExample name={this.state.name} />
      </>
    );
  }
}

export default App;
