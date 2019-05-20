import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ThumbUp, ThumbDown } from '@material-ui/icons';
import SyntaxHighlighter from 'react-syntax-highlighter';


export default class CodeStyleExamples extends Component {
  render() {
    return (
      <Grid item container id="code-style-examples" justify="flex-start" direction="column">
        <Grid item>
          <Grid container justify="flex-start" direction="row">
            <Grid item>
              <ThumbUp className="icon valid-color" />
            </Grid>
            <Grid item>
              <Typography variant="subheading" color="inherit">
                  Good Example: 
              </Typography>
            </Grid>
          </Grid>
          <SyntaxHighlighter
              className="code-example"
              language={ this.props.language }>
              { this.props.selectedAnalysis.codeExample.correct }
          </SyntaxHighlighter>
        </Grid>
        <Grid item>
        <Grid container justify="flex-start" direction="row">
          <Grid item>
              <ThumbDown className="icon" color="error" />
            </Grid>
            <Grid item>
              <Typography variant="subheading" color="inherit">
                  Bad Example: 
              </Typography>
            </Grid>
          </Grid>
          <SyntaxHighlighter
            className="code-example"
            language={ this.props.language }>
              { this.props.selectedAnalysis.codeExample.incorrect }
          </SyntaxHighlighter>
        </Grid>
      </Grid>
    );
  }
}