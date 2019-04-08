import { VibeHeader } from 'app/components/layout-components/header/vibe-header';
import { AppRoutes } from 'app/routes/routes';
import React from 'react';
import './layout.scss';

export class VibeLayout extends React.Component {
  render() {
    return (
      <div data-component="vibe-layout">
        <VibeHeader />
        <AppRoutes />
      </div>
    );
  }
}
