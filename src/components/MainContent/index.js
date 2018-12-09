import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Statistics from '../Statistics'
import Logger from '../Logger'
import UserStatistics from '../UserStatistics'


export default class MainContent extends Component {
  render() {
    return (
        <Switch>
          <Route path='/' exact component={Statistics} />
          <Route path='/logs' component={Logger} />
          <Route path='/userStatistics/:id' component={UserStatistics} />
        </Switch>
    )
  }
}
