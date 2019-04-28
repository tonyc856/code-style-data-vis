import React, { Component } from 'react';
import Axios from 'axios';
import { debounce } from "throttle-debounce";

import Select from "react-select";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
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
    queryString: "", // search string for the autocomplete search box
    selectedRepository: null, // option selected from the autocomplete search box
    options: [] // list of repositories found
  }

  getRepositories(fullName) {
    let options = {
      params: {
        fullName: fullName
      }
    };
    try {
      if (options.params.fullName) {
        Axios.get('api/repositories', options).then(response => {
          const data = response.data.data;
          if (data) {
            this.setState({options: data});
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  getRepositoryAnalysis = (fullName) => {
    let options = {
      params: {
        fullName: fullName
      }
    };
    try {
      if (options.params.fullName) {
        Axios.get('api/repositories/get_analysis', options).then(response => {
          const data = response.data.data;
          if (data) {
            this.setAnalysis(data);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  setAnalysis = data => {
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

  handleSearch = queryString => {
    this.setState({queryString: queryString});
    this.getRepositoriesDebounced(queryString);
  };

  onRepositorySelect = (selectedRepository) => {
    this.setState({selectedRepository});
    this.getRepositoryAnalysis(selectedRepository.value);
  };

  componentWillMount = () => {
    this.getRepositoriesDebounced = debounce(500, this.getRepositories);
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
            <Select id="search-bar"
              value={ this.state.selectedRepository }
              options={ this.state.options }
              inputValue={ this.state.queryString }
              onInputChange={ this.handleSearch }
              onChange={ this.onRepositorySelect } 
              placeholder="alexjc/neural-doodle"
              menuIsOpen={ this.state.queryString }
            />
          </Paper>
          { this.state.selectedRepository ? (
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
                  </Grid>) : null
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
