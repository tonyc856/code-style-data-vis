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
    summaryProperty: "tabs_vs_spaces",
    labels: ["Spaces", "Tabs"],
    parent: null
  },
  {
    name: "Line Length",
    property: "line_length_analysis",
    summaryProperty: "line_length",
    labels: ["Files <= 79/80 columns", "Files > 79/80 columns"],
    parent: null
  },
  {
    name: "Blank Lines",
    property: "blank_lines_analysis",
    summaryProperty: "blank_lines",
    labels: ["Files Passed", "Files Failed"],
    parent: null
  },
  {
    name: "Imports",
    property: "import_analysis",
    summaryProperty: "import",
    labels: ["Files Passed", "Files Failed"],
    parent: null
  },
  {
    name: "Indentation",
    property: "indentation_analysis",
    summaryProperty: "indentation",
    labels: ["Files Passed", "Files Failed"],
    parent: null
  },
  {
    name: "Class Naming",
    property: "classes",
    summaryProperty: "naming",
    labels: ["Files Passed", "Files Failed"],
    parent: "naming_analysis"
  },
  {
    name: "Function Naming",
    property: "functions",
    summaryProperty: "naming",
    labels: ["Files Passed", "Files Failed"],
    parent: "naming_analysis"
  }
];

export default class AnalysisList extends Component {
  state = {
    selectedItem: null
  };

  componentWillMount() {
    this.onClick(this.props.selected);
  }

  onClick = (item) => {
    this.setState({selectedItem: item})
  }

  renderListItem = () => {
    return listItems.map((item) => {
      return (
        <ListItem
          key={item.name} 
          onClick={ () => this.onClick(item) }
          selected={ this.state.selectedItem === item.name }
          button
          divider>
          <ListItemText inset primary={ item.name } onClick={ () => this.props.onSelect(item) } />
        </ListItem>
      );
    });
  };
  
  render() {
    return (
      <>
        <List dense>
          <ListItem
            onClick={ () => this.onClick(summaryItem) }
            selected={ this.state.selectedItem === summaryItem.name }
            button
            divider>
            <ListItemText inset primary={ summaryItem.name } onClick={ () => this.props.onSelect(summaryItem) } />
          </ListItem>
          { listItems.length > 0 ? this.renderListItem() : null }
        </List>
      </>
    );
  }
}
