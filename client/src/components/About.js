import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default class About extends Component {
  render() {
    return (
      <div id="about-page">
        <Typography gutterBottom align="center" variant="h4" color="inherit">
          About the Project
        </Typography>
        <Typography gutterBottom paragraph align="left" variant="body1">
          Software Development has become an increasingly collaborative process. 
          Employees from one team may collaborate with each other, another team, 
          or independent developers on the other side of the globe. As more and 
          more files are written by more and more coders, the importance of program 
          comprehension and code readability have also grown. Moreover, little is known 
          about how developers around the world actually use different coding styles. 
          In order to solve this problem, the goal of the project is to mine a large 
          dataset of thousands of software repositories from GitHub to provide a broad 
          view of developers’ coding style choices in various projects and programming 
          languages. GitHub is a web-based hosting service for version control. 
          It’s mostly used by programmers around the world to allow work and issues to 
          be tracked on a project so that small or large teams working together can 
          collaborate more efficiently. Furthermore, the project will also aim to analyze 
          whether developers’ coding styles comply with well-known coding style sources, 
          such as Google’s and Oracle’s style guidelines. By the end of the year, the project 
          aims to be the first to mine developers’ coding style over an expansive dataset of 
          public projects and showcase that data to enable future analysis work.
        </Typography>
        <Typography paragraph gutterBottom align="left" variant="body1">
          For the latest information about the project:&nbsp;
          <Link target="_blank" rel="noopener noreferrer" href="https://github.com/bcdasilv/code-style-mining/wiki/SURP-2018-Poster">
            https://github.com/bcdasilv/code-style-mining/wiki/SURP-2018-Poster
          </Link>
        </Typography>
      </div>
    );
  }
}
