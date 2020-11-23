import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import logo from "../logo.svg";

class Roll extends Component {
  state = {
    selectedAmount: null,
    idx: null
  }

  handleBoxClick = e => {
    const ariaLabel = e.target.ariaLabel
    const selectedAmount = parseFloat(ariaLabel)
    switch (ariaLabel) {
      case "0.1":
        this.setState({ selectedAmount, idx: 0 })
        break;
      case "0.2":
        this.setState({ selectedAmount, idx: 1 })
        break;
      case "0.5":
        this.setState({ selectedAmount, idx: 2 })
        break;
      case "1":
        this.setState({ selectedAmount, idx: 3 })
        break;
      case "2":
        this.setState({ selectedAmount, idx: 4 })
        break;
      default:
        break;
    }
  }

  render() {
    const boxClass1 = this.state.idx === 0 ? "Box selected" : "Box"
    const boxClass2 = this.state.idx === 1 ? "Box selected" : "Box"
    const boxClass3 = this.state.idx === 2 ? "Box selected" : "Box"
    const boxClass4 = this.state.idx === 3 ? "Box selected" : "Box"
    const boxClass5 = this.state.idx === 4 ? "Box selected" : "Box"
    return (
      <div className="roll">
        <header className="roll-header">
          <p className="balance">My Balance: {this.props.balance} ETH</p>
          <p>I want to bet for...</p>
          <div className="Boxes">
            <button aria-label="0.1" onClick={this.handleBoxClick} className={boxClass1}>
              0.1 ETH
            </button>
            <button aria-label="0.2" onClick={this.handleBoxClick} className={boxClass2}>0.2 ETH</button>
            <button aria-label="0.5" onClick={this.handleBoxClick} className={boxClass3}>0.5 ETH</button>
            <button aria-label="1" onClick={this.handleBoxClick} className={boxClass4}>1 ETH</button>
            <button aria-label="2" onClick={this.handleBoxClick} className={boxClass5}>2 ETH</button>
          </div>
          <img src={logo} className="dice2" alt="logo" />
          <Link to="/Waiting" className="rollButton">
            <button className="rollButton">
              Roll the Dice!
            </button>
          </Link>
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
