import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Statistics from '../Statistics'
import Logger from '../Logger'

export default class MainContent extends Component {
  render() {
    return (
        <Switch>
          <Route path='/' exact component={Statistics} />
          <Route path='/logs' component={Logger} />
        </Switch>
    )
  }
}
