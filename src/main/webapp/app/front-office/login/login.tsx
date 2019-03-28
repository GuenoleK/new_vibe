import React from 'react';
import { userStore } from 'app/stores/user-store';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

export class VibeLogin extends React.Component {
  render() {
    const { vibeUser } = userStore;
    vibeUser.id = 2;
    vibeUser.user.firstName = 'Guénolé';
    vibeUser.user.lastName = 'Kikabou';
    vibeUser.username = 'guenole_k';
    const MyLink = props => <Link to="/" className="alert-link" {...props} />;

    return (
      <div>
        <p>ID: {vibeUser.id}</p>
        <p>Username: {vibeUser.username}</p>
        <p>First name: {vibeUser.user.firstName}</p>
        <p>Last name: {vibeUser.user.lastName}</p>
        <Button component={MyLink} variant="contained" color="primary">
          To home
        </Button>
      </div>
    );
  }
}
