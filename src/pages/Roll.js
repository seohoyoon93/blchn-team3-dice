import React, { Component } from "react";
import logo from "../logo.svg";
import "../stylesheets/roll.css";

class Roll extends Component {
  render() {
    return (
      <div className="roll">
        <header className="roll-header">
          <p className="balance">My Balance: ETH</p>
          <p>I want to bet for...</p>
          <div className="Boxes">
            <div className="Box">0.1 ETH</div>
            <div className="Box">0.2 ETH</div>
            <div className="Box">0.5 ETH</div>
            <div className="Box">1 ETH</div>
            <div className="Box">2 ETH</div>
          </div>
          <img src={logo} className="dice2" alt="logo" />
          <button className="rollButton">Roll the Dice!</button>
        </header>
      </div>
    );
  }
}

export default Roll;
