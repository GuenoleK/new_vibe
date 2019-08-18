import React from 'react';
import './empty-state.scss';

interface IEmptyStateProps {
  icon: JSX.Element;
  title: string;
  description: string | JSX.Element;
}

export class EmptyState extends React.Component<IEmptyStateProps> {
  render() {
    return (
      <div data-component="empty-state">
        {this.props.icon}
        <div className="title">{this.props.title}</div>
        <div className="description">{this.props.description}</div>
      </div>
    );
  }
}
