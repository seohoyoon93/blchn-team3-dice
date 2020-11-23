import React from 'react'
import PageView from './components/PageView';
import { connect } from 'react-redux'
import { setUser } from './store/actions/userActions'

class App extends React.Component {
  state = {
    loading: true
  }

  componentDidMount() {
    const account = localStorage.getItem('eth-account-address')
    const balance = localStorage.getItem('eth-balance')

    if (account !== null) {
      this.props.setUser({ account, balance })
      this.setState({ loading: false })
    } else {
      localStorage.removeItem('eth-account-address');
      localStorage.removeItem('eth-balance');
      this.setState({ loading: false })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.account !== this.props.account) {

    }
  }
  // if (window.ethereum.on('accountsChanged', function (accounts) {
  //     // Time to reload your interface with accounts[0]!
  //   })
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

