import React, { Component } from 'react'
import MetaMaskOnboarding from '@metamask/onboarding'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { setUser } from '../store/actions/userActions'
const forwarderOrigin = 'http://localhost:3000'
const onboarding = new MetaMaskOnboarding({ forwarderOrigin })

const isMetaMaskInstalled = () => {
  const { ethereum } = window

  return Boolean(ethereum && ethereum.isMetaMask);
}


class Landing extends Component {
  installMetamask() {
    onboarding.startOnboarding()
  }

  signInWithMetamask = () => {
    const Web3 = require('web3')
    const web3 = new Web3(Web3.givenProvider)
    window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(response => {
        const account = response[0]
        web3.eth.getBalance(account)
          .then(balance => {
            this.props.setUser({ account, balance })
            localStorage.setItem(
              "eth-account-address",
              account
            );
            localStorage.setItem(
              "eth-balance",
              balance
            );
            this.props.history.push('/roll')
          })
      })
  }

  render() {
    const signInBtn = isMetaMaskInstalled() ? (
      <button onClick={this.signInWithMetamask}>
        Sign in with Metamask
      </button>
    ) : (
        <button onClick={this.installMetamask}>
          Install Metamask
      </button>
      )
    return (
      <div className="landing">
        <h1>Roll Dice and Win Ethereum!</h1>
        <div className="signin-btn">
          {signInBtn}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(setUser(user))
  }
}

export default connect(null, mapDispatchToProps)(withRouter(Landing));