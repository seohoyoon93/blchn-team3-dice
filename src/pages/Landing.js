import React, { Component } from 'react'
import MetaMaskOnboarding from '@metamask/onboarding'

const forwarderOrigin = 'http://localhost:3000'
const onboarding = new MetaMaskOnboarding({ forwarderOrigin })

const isMetaMaskInstalled = () => {
  const { ethereum } = window

  return Boolean(ethereum && ethereum.isMetaMask);
}


class Landing extends Component {
  state = {
    signInBtnText: "Sign in with Metamask"
  }

  installMetamask() {
    onboarding.startOnboarding()
  }

  async signInWithMetamask() {
    try {
      const Web3 = require('web3')
      const web3 = new Web3(Web3.givenProvider)
      const response = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const balance = await web3.eth.getBalance(response[0])
      console.log(response)
      console.log(balance)
    } catch (e) {
      console.error(e)
    }
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

export default Landing