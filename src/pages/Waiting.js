import React, { Component } from "react";
import logo from "../logo.svg";
import "../stylesheets/waiting.css";

class Waiting extends Component {
  render() {
    return (
      <div className="Wait">
        <header className="Wait-header">
          <img src={logo} className="dice" alt="logo" />
          <p>Rolling the Dice...</p>
        </header>
      </div>
    );
  }
}

export default Waiting;
