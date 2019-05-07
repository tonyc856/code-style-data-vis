import React, { Component } from 'react';
import Axios from 'axios';
import { debounce } from "throttle-debounce";

import Select from "react-select";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { VictoryPie } from 'victory';

import AnalysisList from '../AnalysisList/AnalysisList';

export default class Visualization extends Component {
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
    options: [], // list of repositories found
    selectedAnalysis: {
      name: "Summary"
    }
  };

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
  };

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
  };

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
    this.onSelectAnalysis(this.state.selectedAnalysis);
  };

  onSelectAnalysis = (item) => {
    let data;
    if (item) {
      if (item.name === "Summary") {
        data = this.getSummary();
      } else {
        data = this.selectItem(item);
      }
      if (item.name !== this.state.selectedAnalysis.name) {
        this.setState({selectedAnalysis: item});
      }
      this.setChartData(data, item.name);
    }
  };

  getSummary = () => {
    const summary = this.state.summary;
    const totalCategoryRrrors = summary.total_category_errors;
    let data = [
      {y: totalCategoryRrrors.naming, label: "Naming: " + totalCategoryRrrors.naming}, 
      {y: totalCategoryRrrors.indentation, label: "Indentation: " + totalCategoryRrrors.indentation}, 
      {y: totalCategoryRrrors.tabs_vs_spaces, label: "Tabs vs Spaces: " + totalCategoryRrrors.tabs_vs_spaces},
      {y: totalCategoryRrrors.line_length, label: "Line Length: " + totalCategoryRrrors.line_length}, 
      {y: totalCategoryRrrors.blank_lines, label: "Blank Lines: " + totalCategoryRrrors.blank_lines}, 
      {y: totalCategoryRrrors.import, label: "Import: " + totalCategoryRrrors.import}
    ];
    return data;
  };

  selectItem = (item) => {
    const property = item.property;
    const repositoryAnalysis = this.state.repositoryAnalysis;
    let data;
    let result1 = 0;
    let result2 = 0;

    let keys = Object.keys(repositoryAnalysis);
    keys.forEach(key => {
        let analysis = repositoryAnalysis[key];
        if (item.parent) {
          analysis = analysis[item.parent];
        }
        if (analysis[property].pep && analysis[property].google) {
          result1++;
        } else {  
          result2++;
        }
      }
    );
    data = [
      {y: result1, label: item.labels[0] + ": " + result1},
      {y: result2, label: item.labels[1] + ": " + result2}
    ];
    return data;
  };

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
      <div className="visualization">
        <div className="content-body">
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
                      <AnalysisList summary={ this.state.summary } repositoryAnalysis={ this.state.repositoryAnalysis } onSelect={ this.onSelectAnalysis } />
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
