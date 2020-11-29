import React from 'react'
import PageView from './components/PageView';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setUser } from './store/actions/userActions'

const WEI_TO_ETH = 1000000000000000000
const Web3 = require('web3')

class App extends React.Component {
  componentDidMount() {
    window.ethereum.on('accountsChanged', accounts => {
      if (accounts[0]) {
        const account = accounts[0]
        const web3 = new Web3(Web3.givenProvider)
        web3.eth.getBalance(account)
          .then(weiBalance => {
            const balance = weiBalance / WEI_TO_ETH
            this.props.setUser({ account, balance })
            this.props.history.push('/roll')
          })
      } else {
        this.props.setUser({ account: null, balance: 0 })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <PageView />
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

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(setUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

