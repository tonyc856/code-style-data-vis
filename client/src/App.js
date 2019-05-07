import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Visualization from './components/Visualization/Visualization';
import About from './components/About';

import NavBar from './components/NavBar/NavBar';
import './App.scss';

export default class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <div className="App-body">
            <Route path="/" exact component={Visualization} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}
