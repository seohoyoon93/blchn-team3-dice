import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Landing from '../pages/Landing'
import Roll from '../pages/Roll'
import Waiting from '../pages/Waiting'
import Result from '../pages/Result'

const PageView = (props) => {
  console.log(props)
  return (
    <div className="pageview">
      <Route exact path="/">
        {props.account !== null ? <Redirect to="/roll" /> : <Landing />}
      </Route>
      <Route exact path="/roll">
        <Roll />
      </Route>
      <Route exact path="/rolling">
        <Waiting />
      </Route>
      <Route exact path="/result">
        <Result />
      </Route>
    </div>
  )
}

const mapStateToProps = state => {
  console.log(state)
  return {
    account: state.user.account
  };
};

export default connect(mapStateToProps)(PageView);