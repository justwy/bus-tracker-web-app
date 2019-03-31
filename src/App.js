import React, { Component } from "react";
import "./App.css";
import SayHelloContainer from "./containers/SayHelloContainer";

class App extends Component {
  render() {
    return (
      <div>
        <SayHelloContainer/>
      </div>
    );
  }
}

export default App;
