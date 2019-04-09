import React from 'react';
import { observer } from 'mobx-react';
import { TextField, Button } from '@material-ui/core';
import './login.scss';
import { apiUtil } from 'app/api/api';
import { userStore } from 'app/stores/user-store';

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
        <Button variant="contained" color="primary" onClick={apiUtil.authenticate}>
          Login
        </Button>
        {/* <ButtonLink variant="contained" color="primary" label="Article list" link="article-list" />; */}
      </form>
    );
  }

  handleChange = name => event => {
    userStore.user[name] = event.target.value;
  };
}
