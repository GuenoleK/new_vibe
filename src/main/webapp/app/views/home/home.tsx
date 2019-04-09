import React from 'react';
import { userStore } from 'app/stores/user-store';
import { observer } from 'mobx-react';
import { TextField, Button } from '@material-ui/core';
import './login.scss';
import { apiUtil } from 'app/api/api';

@observer
export class VibeHome extends React.Component {
  render() {
    return (
      <form className="login-form" method="post" autoComplete="off">
        <TextField
          label="Username"
          value={userStore.vibeUser.username}
          onChange={this.handleChange('username')}
          margin="normal"
          variant="outlined"
          required
        />

        <TextField
          label="Password"
          value={userStore.vibeUser.user.password}
          onChange={this.handleChange('password')}
          margin="normal"
          variant="outlined"
          type="password"
          required
        />
        <Button variant="contained" color="primary" onClick={apiUtil.login}>
          Login
        </Button>
        {/* <ButtonLink variant="contained" color="primary" label="Article list" link="article-list" />; */}
      </form>
    );
  }

  handleChange = name => event => {
    if (name === 'username') {
      userStore.vibeUser.user.login = event.target.value;
      userStore.vibeUser[name] = event.target.value;
    } else if (name === 'password') {
      userStore.vibeUser.user.password = event.target.value;
    }
  };
}
