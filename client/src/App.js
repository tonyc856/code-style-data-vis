import React, { Component } from 'react';
import Axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import { VictoryPie } from 'victory';

import AnalysisList from './components/AnalysisList/AnalysisList';
import './App.scss';


export default class App extends Component {

  state = {
    title: "",
    summary: null,
    repositoryAnalysis: null,
    repositoryFullName: "",
    htmlURL: "",
    language: "",
    fileCount: 0,
    analyzedFileCount: 0,
    totalRepositoryErrors: 0,
    data: null,
    queryString: "alexjc/neural-doodle"
  }

  getRepositoryAnalysis = () => {
    let options = {
      params: {
        fullName: this.state.queryString
      }
    };

    try {
      if (options.params.fullName) {
        Axios.get('api/get_repository_analysis', options).then(response => {
          console.log(response);
          const data = response.data.data;
          if (data) {
            this.updateAnalysis(data);
          }
          //console.log(this.state);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  updateAnalysis = data => {
    const summary = data.summary;
    this.setState({
      summary: summary,
      repositoryAnalysis: data.repo_analysis,
      repositoryFullName: data.full_name,
      htmlURL: data.html_url,
      language: data.language, 
      fileCount: summary.file_count,
      analyzedFileCount: summary.analyzed_file_count,
      totalRepositoryErrors: summary.total_repo_errors
    });
  }

  setChartData = (data, title) => {
    this.setState({data: data, title: title});
  };

  handleSearch = event => {
    this.setState({queryString: event.target.value});
  };

  handleKeyPress = event => {
    const ENTER_KEY_CODE = 13;
    if (event.keyCode === ENTER_KEY_CODE) {
      this.getRepositoryAnalysis();
    }
  }

  componentDidMount = () => {
    this.getRepositoryAnalysis();
  };
  
  render() {
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Code Style Mining Analysis
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="App-body">
          <Paper className="search-bar-container" elevation={1}>
            <InputBase className="input" 
              value={ this.state.queryString } 
              placeholder="bcdasilv/code-style-mining" 
              onChange={ this.handleSearch } 
              onKeyDown={ this.handleKeyPress } />
            <IconButton className="icon-button" aria-label="Search" onClick={ this.getRepositoryAnalysis } disabled={ !this.state.queryString }> 
              <SearchIcon />
            </IconButton>
          </Paper>
          { this.state.queryString ? (
          <>  
            <h3>Repository:{' '}
              <a href={ this.state.htmlURL }>{ this.state.repositoryFullName }</a>
            </h3>
            <Grid container justify="center" spacing={40}>
              { this.state.repositoryAnalysis ? 
                (<Grid item>
                  <Paper>
                    <AnalysisList summary={ this.state.summary } repositoryAnalysis={ this.state.repositoryAnalysis } onSelect={ this.setChartData } />
                  </Paper>
                </Grid>) : 
                null
              }
              <Grid item>
                <Grid container justify="center">
                  <h3>{ this.state.title }</h3>
                </Grid>
                <div className="chart-container">
                  <VictoryPie 
                    data={ this.state.data }
                    colorScale="qualitative" />
                </div>
              </Grid>
            </Grid>
            <div className="analysis-details">
              <u><b>Summary</b></u>
              <div>Language: { this.state.language }</div>
              <div>File Count: { this.state.fileCount } </div>
              <div>Analyzed File Count: {this.state.analyzedFileCount } </div>  
              <div>Total Repository Errors: {this.state.totalRepositoryErrors } </div>
            </div>
          </>) : null
          }    
        </div>
      </div>
    );
  }
}
