import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { VibeLayout } from 'app/components/layout-components/layout';
import './container.scss';

export class Container extends React.Component {
  render() {
    return (
      <div data-component="vibe-container">
        <Router>
          <VibeLayout />
        </Router>
      </div>
    );
  }
}
