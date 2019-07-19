import React from 'react';
import { CircularProgress } from '@material-ui/core';
import './spinner.scss';

interface ISpinnerProps {
  hasDescription: boolean;
  loadingText?: string;
}

export class Spinner extends React.Component<ISpinnerProps> {
  render() {
    return (
      <div className="spinner-component">
        <CircularProgress className="circular-progress" />
        {this.DescriptionComponent}
      </div>
    );
  }

  get DescriptionComponent() {
    if (this.hasDescription && this.loadingText) {
      return <div className="loading-text">{this.loadingText}</div>;
    }
    return;
  }

  get loadingText() {
    return this.props.loadingText;
  }

  get hasDescription() {
    return this.props.hasDescription;
  }
}
