import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Visualization from './components/Visualization/Visualization';
import About from './components/About';
import NavBar from './components/NavBar/NavBar';
import './App.scss';

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
});

class App extends Component {

  render() {
    const { classes } = this.props;
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Paper>
            <div className={classes.toolbar} />
            <div className="App-body">
              <Route path="/" exact component={Visualization} />
              <Route path="/about" component={About} />
            </div>
          </Paper>
        </div>
      </Router>
    );
  }
}

export default withStyles(styles)(App);
