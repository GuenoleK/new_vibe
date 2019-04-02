import React from 'react';
import { VibeHeader } from 'app/components/layout-components/header/vibe-header';
import './layout.scss';
import { CardContainer } from './card-container/card-container';

export class VibeLayout extends React.Component {
  render() {
    return (
      <div data-component="vibe-layout">
        <VibeHeader />
        <CardContainer />
      </div>
    );
  }
}
