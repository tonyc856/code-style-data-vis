import React, { Component } from 'react';
import Axios from 'axios';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { Cloud, Code, Error } from '@material-ui/icons';

import { formatNumber } from "../../utils/utils";

export default class Home extends Component {

  state = {
    stats: {
      totalRepositories: {
        label: "",
        value: 0
      },
      totalFilesAnalyzed: {
        label: "",
        value: 0
      },
      totalErrors: {
        label: "",
        value: 0
      }
    },
    isLoaded: false
  }

  async componentWillMount() {
    try {
      const response = await this.getStats();
      if (response.data.success) {
        const data = response.data.data;
        const state = { 
          stats: {
            primary: {
              totalRepositories: {
                label: "Total Repositories", 
                value: data.totalRepositories,
                icon: <Cloud className="icon" color="primary" />
              },
              totalNoErrorRepositories: {
                label: "Total Repositories: No Errors", 
                value: data.totalNoErrorRepositories,
                icon: <Cloud className="icon" color="primary" />
              },
              totalFilesAnalyzed: {
                label: "Total Files Analyzed", 
                value: data.totalFilesAnalyzed,
                icon: <Code className="icon"/>
              },
            },
            secondary: {
              totalErrors: {
                label: "Total Violations (Errors)", 
                value: data.totalErrors,
                icon: <Error className="icon" color="error" />
              },
              averageErrorsPerRepository: {
                label: "Average Violations per Reposirory", 
                value: data.averageErrorsPerRepository,
                icon: <Error className="icon" color="error" />
              },
              averageErrorsPerFile: {
                label: "Average Violations per File", 
                value: data.averageErrorsPerFile,
                icon: <Error className="icon" color="error" />
              }
            }
          }, 
          isLoaded: true
        };
        this.setState(state);
      }
    } catch (err) {
      console.error(err);
    }
  }

  getStats = async () => {
    try {
      const result = await Axios.get('api/stats');
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  renderStats = (stats) => {
    const keys = Object.keys(stats);
    return keys.map(key => {
      return (
        <Grid key={key} item className="grid-item">
          <Card>
            <CardContent>
              <Grid container alignItems="center" alignContent="center" wrap="nowrap">
                <Grid item>
                  { stats[key].icon }
                </Grid>
                <Grid item>
                  <Typography variant="title" color="textPrimary" gutterBottom>
                    { stats[key].label }
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="body1" color="default" gutterBottom>
                { formatNumber(stats[key].value) }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    });
  };

  render() {
    return (
      <Grid container direction="column" justify="space-between" alignItems="center" alignContent="center">
        <Grid item>
          <Typography variant="h4" color="textPrimary">
            Dashboard
          </Typography>
        </Grid>
        { this.state.isLoaded ? 
        <Grid id="stats" item container direction="row" justify="center" alignItems="center" alignContent="center">
          <Grid item>
            { this.state.isLoaded ? this.renderStats(this.state.stats.primary) : null }
          </Grid>
          <Grid item>
            { this.state.isLoaded ? this.renderStats(this.state.stats.secondary) : null }
          </Grid>
        </Grid> :
        <Grid item>
          <CircularProgress />
        </Grid> }
      </Grid>
    );
  }
}
