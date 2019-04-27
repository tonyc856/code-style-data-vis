import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const summaryItem = {
  name: "Summary"
};

const listItems = [
  {
    name: "Tabs vs. Space",
    property: "tabs_vs_spaces_analysis",
    labels: ["Tabs", "Spaces"],
    parent: null
  },
  {
    name: "Line Length",
    property: "line_length_analysis",
    labels: ["Files <= 79/80 columns", "Files > 79/80 columns"],
    parent: null
  },
  {
    name: "Blank Lines",
    property: "blank_lines_analysis",
    labels: ["Files Passed", "Files Failed"],
    parent: null
  },
  {
    name: "Imports",
    property: "import_analysis",
    labels: ["Files Passed", "Files Failed"],
    parent: null
  },
  {
    name: "Indentation",
    property: "indentation_analysis",
    labels: ["Files Passed", "Files Failed"],
    parent: null
  },
  {
    name: "Class Naming",
    property: "classes",
    labels: ["Files Passed", "Files Failed"],
    parent: "naming_analysis"
  },
  {
    name: "Function Naming",
    property: "functions",
    labels: ["Files Passed", "Files Failed"],
    parent: "naming_analysis"
  }
];

export default class AnalysisList extends Component {
  state = {
    selected: null,
    data: null
  };

  componentDidMount() {
    this.getSummary();
  }

  getSummary = () => {
    const summary = this.props.summary;
    const total_category_errors = summary.total_category_errors;
    let data = [
      {y: total_category_errors.naming, label: "Naming: " + total_category_errors.naming}, 
      {y: total_category_errors.indentation, label: "Indentation: " + total_category_errors.indentation}, 
      {y: total_category_errors.tabs_vs_spaces, label: "Tabs vs Spaces: " + total_category_errors.tabs_vs_spaces},
      {y: total_category_errors.line_length, label: "Line Length: " + total_category_errors.line_length}, 
      {y: total_category_errors.blank_lines, label: "Blank Lines: " + total_category_errors.blank_lines}, 
      {y: total_category_errors.import, label: "Import: " + total_category_errors.import}
    ];
    this.setState({selected: summaryItem, data: data});
    this.props.onSelect(data, summaryItem.name);
  };

  selectItem = (item) => {
    const property = item.property;
    const repositoryAnalysis = this.props.repositoryAnalysis;
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
    this.setState({selected: item, data: data});
    this.props.onSelect(data, item.name);
  };

  renderListItem = () => {
    return listItems.map((item) => {
      return (
        <ListItem key={item.name} button>
          <ListItemText inset primary={ item.name } onClick={ () => this.selectItem(item) } />
        </ListItem>
      );
    });
  };
  
  render() {
    return (
      <>
        <List>
          <ListItem button>
            <ListItemText inset primary={ summaryItem.name } onClick={ this.getSummary } />
          </ListItem>
          { listItems.length > 0 ? this.renderListItem() : null }
        </List>
      </>
    );
  }
}
