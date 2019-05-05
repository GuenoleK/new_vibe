import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { VibeLayout } from 'app/components/layout-components/layout';
import './container.scss';
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from '.';

export class Container extends React.Component {
  render() {
    return (
      <div data-component="vibe-container">
        <MuiThemeProvider theme={theme}>
          <Router>
            <VibeLayout />
          </Router>
        </MuiThemeProvider>
      </div>
    );
  }
}
