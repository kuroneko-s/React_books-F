import React, { Component } from "react";

class RefExample extends Component {
  state = {
    password: "",
    clicked: false,
    validate: false,
  };

  handleBtnClick = () => {
    this.setState({
      clicked: true,
      validate: this.state.password === "0000",
    });

    this.input.focus();
  };

  handleChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  // ref={(ref) => this.input = ref}
  // React.createRef();

  // input = React.createRef();
  render() {
    return (
      <div>
        <input
          ref={(ref) => (this.input = ref)}
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
          className={
            this.state.clicked ? (this.state.validate ? "success" : "fail") : ""
          }
        />
        <button onClick={this.handleBtnClick}>click</button>
      </div>
    );
  }
}

export default RefExample;
