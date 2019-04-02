import React from 'react';
import { VibeHeader } from 'app/components/layout-components/header/vibe-header';
import './layout.scss';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AppRoutes } from 'app/routes/routes';
import { HashRouter as Router } from 'react-router-dom';

export class VibeLayout extends React.Component {
  render() {
    return (
      <Router>
        <div data-component="vibe-layout">
          <VibeHeader />
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </div>
      </Router>
    );
  }
}
