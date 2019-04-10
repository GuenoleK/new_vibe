import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { IconButtonProps } from '@material-ui/core/IconButton';

interface IButtonLinkProps extends IconButtonProps {
  link: string;
  buttonClassName?: string;
  linkClassName?: string;
}

export class IconButtonLink extends React.Component<IButtonLinkProps> {
  render() {
    const { link, buttonClassName, ...otherProps } = this.props;
    const CustomLink = props => <Link to={link} className={this.linkClassName} {...props} />;
    return (
      <IconButton {...otherProps} color="inherit" className={this.buttonClassName} component={CustomLink}>
        {this.props.children}
      </IconButton>
    );
  }

  get buttonClassName() {
    if (this.props.buttonClassName) {
      return this.props.buttonClassName;
    }
    return '';
  }

  get linkClassName() {
    if (this.props.linkClassName) {
      return this.props.linkClassName;
    }
    return '';
  }
}
