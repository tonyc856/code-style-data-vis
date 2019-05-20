import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SyntaxHighlighter from 'react-syntax-highlighter';


export default class CodeStyleExamples extends Component {
  render() {
    return (
      <Grid item container id="code-style-examples" justify="flex-start" direction="column">
        <Grid item>
          <Typography variant="subheading" color="inherit">
              Good: 
          </Typography>
          <SyntaxHighlighter
              className="code-example"
              language={ this.props.language }>
              { this.props.selectedAnalysis.codeExample.correct }
          </SyntaxHighlighter>
        </Grid>
        <Grid item>
          <Typography variant="subheading" color="inherit">
            Bad: 
          </Typography>
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