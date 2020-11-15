import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import logo from "../logo.svg";
import "../stylesheets/roll.css";

class Roll extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
  }
  handleClick = () => {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  };
  render() {
    return (
      <div className="roll">
        <header className="roll-header">
          <p className="balance">My Balance: {this.props.balance} ETH</p>
          <p>I want to bet for...</p>
          <div className="Boxes">
            <button onClick={this.handleClick} className="Box">
              0.1 ETH
            </button>
            <button className="Box">0.2 ETH</button>
            <button className="Box">0.5 ETH</button>
            <button className="Box">1 ETH</button>
            <button className="Box">2 ETH</button>
          </div>
          <img src={logo} className="dice2" alt="logo" />
          <button className="rollButton">
            <Link to="/Waiting">Roll the Dice!</Link>
          </button>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    account: state.user.account,
    balance: state.user.balance,
  };
};

export default connect(mapStateToProps)(Roll);
