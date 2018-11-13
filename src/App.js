import React, { Component } from 'react';
import './App.css';
import MainBar from './components/MainBar'
import UserDbData from './components/UserDbData'

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainBar/>
        <UserDbData/>
      </div>
    );
  }
}

export default App;
