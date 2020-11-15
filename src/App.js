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

  render() {
    return (
      <div className="App">
        <PageView />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(setUser(user))
  }
}

export default connect(null, mapDispatchToProps)(App);

