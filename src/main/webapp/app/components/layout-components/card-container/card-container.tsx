import React from 'react';
import './card-container.scss';
import { VibeCard } from '../card/vibe-card';

export class CardContainer extends React.Component {
  render() {
    return (
      <div data-component="card-container">
        <VibeCard />
        <VibeCard />
        <VibeCard />
        <VibeCard />
        <VibeCard />
        <VibeCard />
        <VibeCard />
        <VibeCard />
      </div>
    );
  }
}
