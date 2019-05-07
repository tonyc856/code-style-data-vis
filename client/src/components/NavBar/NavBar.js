import React, { Component } from 'react';
import { Link } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Assessment, Info } from '@material-ui/icons';

const routes = [
  {
    name: "Code Style Visualization", 
    path: "/", 
    icon: <Assessment />
  },
  {
    name: "About", 
    path: "/about", 
    icon: <Info />
  }
];

export default class NavBar extends Component {
  state = {
    title: "Code Style Mining Analysis",
    isDrawerOpen: false
  }

  toggleDrawer = () => {
    this.setState({isDrawerOpen: !this.state.isDrawerOpen});
  };

  renderDrawerMenu = () => {
    return (
      <div id="drawer-menu">
        <List>
          {routes.map(route => {
            return (
              <ListItem 
                button 
                key={ route.name } 
                component={ 
                  props => <Link to={ route.path } {...props} /> 
                }
              >
                <ListItemIcon>{ route.icon }</ListItemIcon>
                <ListItemText primary={ route.name } />
              </ListItem>
            )
          })}
        </List>
      </div>
    );
  }

  render() {
    return (
      <>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu" onClick={ this.toggleDrawer }>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              { this.state.title }
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer open={ this.state.isDrawerOpen } onClose={ this.toggleDrawer }>
          <div
            tabIndex={0}
            role="button"
            onClick={ this.toggleDrawer }
            onKeyDown={ this.toggleDrawer }
          >
            { this.renderDrawerMenu() }
          </div>
        </Drawer>
      </>
    );
  }
}
