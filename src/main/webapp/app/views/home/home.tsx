import { Button, TextField } from '@material-ui/core';
import { apiUtil } from 'app/api/api';
import { userStore } from 'app/stores/user-store';
import { observer } from 'mobx-react';
import React from 'react';
import './login.scss';
import { VibeSnackbar } from 'app/components/snackbar/custommized-snackbars';

@observer
export class VibeHome extends React.Component {
  render() {
    return (
      <form className="login-form" method="post" autoComplete="off">
        <TextField
          label="Username"
          value={userStore.user.login}
          onChange={this.handleChange('login')}
          margin="normal"
          variant="outlined"
          required
        />

        <TextField
          label="Password"
          value={userStore.user.password}
          onChange={this.handleChange('password')}
          margin="normal"
          variant="outlined"
          type="password"
          required
        />
        <Button variant="contained" color="primary" onClick={this.login}>
          Login
        </Button>
      </form>
    );
  }

  /**
   * Call the auth + login function
   * When everything is ok, we redirect the user to the article list
   */
  login() {
    apiUtil.authenticate().then(() => {
      window.location.href = '/#/article-list';
    });
  }

  handleChange = name => event => {
    userStore.user[name] = event.target.value;
  };
}
