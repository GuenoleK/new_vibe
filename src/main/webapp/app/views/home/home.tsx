import { Button, TextField } from '@material-ui/core';
import { loginApi } from 'app/api/login-api';
import { userStore } from 'app/stores/user-store';
import { observer } from 'mobx-react';
import React from 'react';
import './home.scss';
import { ButtonLink } from 'app/components/button-link/button-link';

@observer
export class VibeHome extends React.Component {
  render() {
    return (
      <form className="login-form" method="post" autoComplete="off">
        <TextField
          label="Username"
          onChange={this.handleChange('login')}
          onKeyPress={this.fireLoginOnEnterKey}
          margin="normal"
          variant="outlined"
          required
        />

        <TextField
          label="Password"
          onChange={this.handleChange('password')}
          onKeyPress={this.fireLoginOnEnterKey}
          margin="normal"
          variant="outlined"
          type="password"
          required
        />
        <div className="buttons">
          <Button variant="contained" color="primary" onClick={this.login}>
            Login
          </Button>
          <ButtonLink buttonClassName="register-redirection-button" variant="text" link="/register" label="register" />
        </div>
      </form>
    );
  }

  componentWillMount() {
    userStore.clearUser();
  }

  /**
   * Call the auth + login function
   * When everything is ok, we redirect the user to the article list
   */
  login() {
    loginApi.authenticate().then(() => {
      window.location.reload();
    });
  }

  handleChange = name => event => {
    userStore.user[name] = event.target.value;
  };

  fireLoginOnEnterKey = event => {
    if (event.key === 'Enter') {
      this.login();
    }
  };
}
