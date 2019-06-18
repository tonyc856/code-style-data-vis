import React, { Component } from 'react';
import Axios from 'axios';
import { debounce } from "throttle-debounce";

import Select from "react-select";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Search } from '@material-ui/icons';

import AnalysisList from '../AnalysisList/AnalysisList';
import Chart from '../Visualization/Chart';
import CodeStyleExamples from './CodeStyleExamples';
import { summaryItem } from '../AnalysisList/AnalysisItems';

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
    selectedAnalysis: summaryItem
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
    let data = [];

    if (summary) {
      const totalCategoryErrors = summary.total_category_errors;
      data = [
        {y: totalCategoryErrors.naming, label: "Naming: " + totalCategoryErrors.naming}, 
        {y: totalCategoryErrors.indentation, label: "Indentation: " + totalCategoryErrors.indentation}, 
        {y: totalCategoryErrors.tabs_vs_spaces, label: "Tabs vs Spaces: " + totalCategoryErrors.tabs_vs_spaces},
        {y: totalCategoryErrors.line_length, label: "Line Length: " + totalCategoryErrors.line_length}, 
        {y: totalCategoryErrors.blank_lines, label: "Blank Lines: " + totalCategoryErrors.blank_lines}, 
        {y: totalCategoryErrors.import, label: "Import: " + totalCategoryErrors.import}
      ];
      data = data.filter(dataPoint => {
        const value = dataPoint.y;
        return value > 0;
      });
    }
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
        if (analysis[property].pep) {
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

  renderSearchBar = () => {
    return (
      <Grid container justify="center" alignItems="center" alignContent="center">
        <Grid item>
          <Search className="icon" fontSize="large" />
        </Grid>
        <Grid item>
          <Paper className="search-bar-container" elevation={1}>
            <Select 
              id="search-bar"
              value={ this.state.selectedRepository }
              options={ this.state.options }
              inputValue={ this.state.queryString }
              onInputChange={ this.handleSearch }
              onChange={ this.onRepositorySelect } 
              placeholder="alexjc/neural-doodle"
              menuIsOpen={ this.state.queryString }
              autoFocus
            />
          </Paper>
        </Grid>
      </Grid>
    );
  };

  renderAnalysisList = () => {
    return (
      <Paper id="anaylsis-list">
        <AnalysisList
          summary={ this.state.summary }
          selected={ this.state.selectedAnalysis }
          repositoryAnalysis={ this.state.repositoryAnalysis } 
          onSelect={ this.onSelectAnalysis } />
      </Paper>
    );
  };

  render() {
    return (
      <div className="visualization">
        <div className="content-body">
          <Grid container justify="center" direction="column"  alignContent="center" alignItems="center">
            <Grid item>
              { this.renderSearchBar() }
            </Grid>
            { this.state.selectedRepository ? 
            <Grid item>
              <Typography gutterBottom variant="h6" color="inherit">
                Repository:{' '} 
                <Link target="_blank" rel="noopener noreferrer" href={ this.state.htmlURL }>
                  { this.state.repositoryFullName }
                </Link>
              </Typography>
            </Grid> : null }
            { this.state.selectedRepository ?
            <>
              <Grid item container justify="center" direction="row">
                { this.state.repositoryAnalysis ? ( <Grid item>{ this.renderAnalysisList() } </Grid>) : null }
                <Grid item>
                  <Grid container justify="center" direction="column" alignItems="center">
                    <Grid item>
                      <Typography gutterBottom variant="h4" color="inherit">
                        { this.state.title }
                      </Typography>
                    </Grid>
                    <Grid item container justify="center" alignItems="center" alignContent="center" className="chart-container">
                      <Chart
                        data={ this.state.data }
                        summary={ this.state.summary }
                        selectedAnalysis={ this.state.selectedAnalysis }/>
                    </Grid>
                    { this.state.selectedAnalysis.codeExample ? 
                    <CodeStyleExamples 
                      language={ this.state.language }
                      selectedAnalysis={ this.state.selectedAnalysis } /> : null}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography gutterBottom variant="body2" className="analysis-details">
                  <u><b>Summary</b></u> <br /> 
                  Language: { this.state.language } <br /> 
                  Total Files: { this.state.fileCount } <br /> 
                  Total Files Analyzed: {this.state.analyzedFileCount } <br /> 
                  Total Repository Errors: {this.state.totalRepositoryErrors } <br /> 
                </Typography>
              </Grid>
            </> : null }
          </Grid>
        </div>
      </div>
    );
  }
}
