import { VibeHeader } from 'app/components/layout-components/header/vibe-header';
import { AppRoutes } from 'app/routes/routes';
import React from 'react';
import './layout.scss';
import { VibeSnackbar } from 'app/components/snackbar/custommized-snackbars';

export class VibeLayout extends React.Component {
  render() {
    return (
      <div data-component="vibe-layout">
        <VibeHeader />
        <AppRoutes />
        <VibeSnackbar />
      </div>
    );
  }
}
