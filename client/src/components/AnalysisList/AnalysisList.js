import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { summaryItem, listItems } from './AnalysisItems';


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
