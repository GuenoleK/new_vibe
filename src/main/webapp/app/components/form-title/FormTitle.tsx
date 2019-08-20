import React from 'react';
import './form-title.scss';

interface IFormTitleProps {
  text: string | JSX.Element;
}

export class FormTitle extends React.Component<IFormTitleProps> {
  render() {
    return <div className="form-title">{this.props.text}</div>;
  }
}
