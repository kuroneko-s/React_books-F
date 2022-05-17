import { Component } from "react";

class EventTest extends Component {
  state = {
    message: "",
  };

  handleChange = (e) => {
    console.log(this);
    this.setState({
      message: e.target.value,
    });
  };

  handleClick = () => {
    console.log(this);

    alert(this.state.message);
    this.setState({
      message: "",
    });
  };

  render() {
    return (
      <>
        <h1>Test</h1>
        <input
          type="text"
          name="message"
          value={this.state.message}
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>Click</button>
      </>
    );
  }
}

export default EventTest;
