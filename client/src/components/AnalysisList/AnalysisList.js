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
    labels: ["Spaces", "Tabs"],
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
    selected: null
  };

  renderListItem = () => {
    return listItems.map((item) => {
      return (
        <ListItem key={item.name} button>
          <ListItemText inset primary={ item.name } onClick={ () => this.props.onSelect(item) } />
        </ListItem>
      );
    });
  };
  
  render() {
    return (
      <>
        <List>
          <ListItem button>
            <ListItemText inset primary={ summaryItem.name } onClick={ () => this.props.onSelect(summaryItem) } />
          </ListItem>
          { listItems.length > 0 ? this.renderListItem() : null }
        </List>
      </>
    );
  }
}
