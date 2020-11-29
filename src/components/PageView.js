import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Landing from "../pages/Landing";
import Roll from "../pages/Roll";
import Waiting from "../pages/Waiting";
import Result from "../pages/Result";

const PageView = (props) => {
  return (
    <div className="pageview">
      <Route exact path="/">
        {props.account !== null ? <Redirect to="/roll" /> : <Landing />}
      </Route>
      <Route exact path="/roll">
        {props.account !== null ? <Roll /> : <Redirect to="/" />}
      </Route>
      <Route exact path="/waiting">
        {props.account !== null ? <Waiting /> : <Redirect to="/" />}
      </Route>
      <Route exact path="/result">
        {props.account !== null ? <Result /> : <Redirect to="/" />}
      </Route>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.user.account,
    balance: state.user.balance,
  };
};

export default connect(mapStateToProps)(PageView);
