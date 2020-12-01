import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../logo.svg";
import RollDice from "../contracts/RollDice.json";
import { setUser } from "../store/actions/userActions";

const Web3 = require("web3");

const WEI_TO_ETH = 1000000000000000000;

class Roll extends Component {
  state = {
    web3: null,
    selectedAmount: null,
    idx: null,
    contract: undefined,
    pending: false,
    winAmount: null,
    diceNum: null,
  };

  async componentDidMount() {
    try {
      // Get the contract instance.

      const web3 = new Web3(Web3.givenProvider);
      // const networkId = await web3.eth.net.getId();
      // console.log("networkId: ", networkId)
      // console.log("RollDice: ", RollDice)
      // const deployedNetwork = RollDice.networks[Object.keys(RollDice.networks)[0]];
      // console.log("Rolldice networks: ", RollDice.networks[Object.keys(RollDice.networks)[0]])
      // console.log("deployedNetwork: ", deployedNetwork)
      const instance = new web3.eth.Contract(
        RollDice.abi,
        "0x466566a3DB0e8C8d75E2402a55f7C44D0468CdB6"
      );

      this.setState({ web3: web3, contract: instance });
    } catch (err) {
      console.log(err);
    }
  }

  // watchEvent = (event) => {
  //   // console.log(event.returnValues);
  //   const { web3 } = this.state;
  //   const reveal = parseInt(event.returnValues.reveal);
  //   const reward = web3.utils.fromWei(event.returnValues.amount.toString(), 'ether');
  //   this.setState({ reveal, reward });
  // };

  handleBoxClick = (e) => {
    const ariaLabel = e.target.ariaLabel;
    const selectedAmount = parseFloat(ariaLabel);
    switch (ariaLabel) {
      case "0.1":
        this.setState({ selectedAmount, idx: 0 });
        break;
      case "0.2":
        this.setState({ selectedAmount, idx: 1 });
        break;
      case "0.5":
        this.setState({ selectedAmount, idx: 2 });
        break;
      case "1":
        this.setState({ selectedAmount, idx: 3 });
        break;
      case "2":
        this.setState({ selectedAmount, idx: 4 });
        break;
      default:
        break;
    }
  };

  handleRollBtnClick = (e) => {
    const { web3, contract } = this.state;
    const account = this.props.account;

    this.setState({ pending: true, winAmount: null, diceNum: null });
    contract.methods
      .revealResult()
      .send({
        from: account,
        value: web3.utils.toWei(String(this.state.selectedAmount), "ether"),
      })
      .then((result) => {
        this.setState({
          pending: false,
          winAmount: result.events.Reveal.returnValues.amount / WEI_TO_ETH,
          diceNum: result.events.Reveal.returnValues.diceNum,
        });

        web3.eth.getBalance(account).then((weiBalance) => {
          const balance = weiBalance / WEI_TO_ETH;
          this.props.setUser({ account, balance });
        });
      })
      .catch((err) => {
        this.setState({
          pending: false,
          winAmount: null,
          diceNum: null,
        });
      });
  };

  render() {
    const boxClass1 = this.state.idx === 0 ? "Box selected" : "Box";
    const boxClass2 = this.state.idx === 1 ? "Box selected" : "Box";
    const boxClass3 = this.state.idx === 2 ? "Box selected" : "Box";
    const boxClass4 = this.state.idx === 3 ? "Box selected" : "Box";
    const boxClass5 = this.state.idx === 4 ? "Box selected" : "Box";
    const resultDiv =
      this.state.winAmount !== null ? (
        <div className="result">
          <div className="win-amount">{this.state.winAmount} ETH</div>
          <div className="dice-number">{this.state.diceNum}</div>
        </div>
      ) : null;

    return this.state.pending ? (
      <div className="Wait">
        <header className="Wait-header">
          <img src={logo} className="dice" alt="logo" />
          <p>Rolling the Dice...</p>
        </header>
      </div>
    ) : (
      <div className="roll">
        <header className="roll-header">
          <p className="balance">My Balance: {this.props.balance} ETH</p>
          {resultDiv}
          <p>I want to bet for...</p>
          <div className="Boxes">
            <button
              aria-label="0.1"
              onClick={this.handleBoxClick}
              className={boxClass1}
            >
              0.1 ETH
            </button>
            <button
              aria-label="0.2"
              onClick={this.handleBoxClick}
              className={boxClass2}
            >
              0.2 ETH
            </button>
            <button
              aria-label="0.5"
              onClick={this.handleBoxClick}
              className={boxClass3}
            >
              0.5 ETH
            </button>
            <button
              aria-label="1"
              onClick={this.handleBoxClick}
              className={boxClass4}
            >
              1 ETH
            </button>
            <button
              aria-label="2"
              onClick={this.handleBoxClick}
              className={boxClass5}
            >
              2 ETH
            </button>
          </div>
          <img src={logo} className="dice2" alt="logo" />
          {/* <Link to="/Waiting" className="rollButton"> */}
          <button className="rollButton" onClick={this.handleRollBtnClick}>
            Roll the Dice!
          </button>
          {/* </Link> */}
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.user.account,
    balance: state.user.balance,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Roll);
