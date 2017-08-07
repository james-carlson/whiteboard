import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Welcome from './../Welcome-Login/Welcome';
import Dashboard from './../Dashboard/Dashboard';
import Whiteboard from './../Whiteboard/Whiteboard';

class App extends Component {
  render() {
    return (
      <div id='App'>
        App
        <Switch>
          <Route component={Welcome} path='/' exact />
          <Route component={Dashboard} path='/dashboard' />
          <Route component={Whiteboard} path='/board/:boardid' />
        </Switch>
      </div>
    )
  }
}
export default App;