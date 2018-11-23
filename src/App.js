import React, { Component, Fragment } from 'react';
import './App.css';
import MainBar from './components/MainBar'
import MainContent from './components/MainContent'
import { BrowserRouter } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Fragment>
            <MainBar />
            <MainContent />
          </Fragment>
        </BrowserRouter>
      </div>

    );
  }
}

export default App;
