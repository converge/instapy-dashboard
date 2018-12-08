import React, { Component, Fragment } from 'react';
import './App.css';
import MainBar from './components/MainBar'
import MainContent from './components/MainContent'
import { BrowserRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Helmet>
          <title>InstaPy Dashboard</title>
        </Helmet>
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
