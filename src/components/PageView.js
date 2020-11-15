import React from 'react'
import { Route } from 'react-router-dom'

import Landing from '../pages/Landing'
import Roll from '../pages/Roll'
import Waiting from '../pages/Waiting'
import Result from '../pages/Result'

const PageView = (props) => {
  return (
    <div className="pageview">
      <Route exact path="/">
        <Landing />
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

export default PageView;