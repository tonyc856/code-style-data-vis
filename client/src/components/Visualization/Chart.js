import React, { Component } from 'react';

import { VictoryPie } from 'victory';
import { CheckCircle } from '@material-ui/icons';
import { Typography, Grid } from '@material-ui/core';

export default class Chart extends Component {
  checkCompliance = () => {
    let isCompliant = false;
    const selectedAnalysis = this.props.selectedAnalysis;

    if (this.props.summary) {
      const summaryErrors = this.props.summary.total_category_errors;
      if (this.props.data) {
        if (selectedAnalysis.name === "Summary") {
          if (summaryErrors) {
            const keys = Object.keys(summaryErrors);
            const result = keys.filter(key => {
              return summaryErrors[key] > 0;
            });
            isCompliant = result.length === 0;
          }
        } else {
          isCompliant = summaryErrors[selectedAnalysis.summaryProperty] === 0;
        }
      }
    }
    return isCompliant;
  };

  render() {
    return (
      <div id="chart">
        { this.checkCompliance() ?
        <Grid container justify="center" direction="column" alignItems="center" alignContent="center">
          <Grid item>
            <CheckCircle
              className="compliant-check"
              color="primary" />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" color="inherit">
              Compliant
            </Typography>
          </Grid>
        </Grid>
        : 
        <VictoryPie
          data={ this.props.data }
          colorScale="qualitative" /> 
        }
      </div>
    );
  }
}