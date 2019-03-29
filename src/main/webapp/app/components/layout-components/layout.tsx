import React from 'react';
import { VibeHeader } from 'app/components/layout-components/header';
import './layout.scss';

export class VibeLayout extends React.Component {
  render() {
    return (
      <div data-component="vibe-layout">
        <VibeHeader />
        <div>Hello</div>
      </div>
    );
  }
}
