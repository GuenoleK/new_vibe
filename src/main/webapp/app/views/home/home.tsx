import { ButtonLink } from 'app/components/button-link/button-link';
import React from 'react';
import { userStore } from 'app/stores/user-store';
import { observer } from 'mobx-react';
import { TextField, Button } from '@material-ui/core';
import './login.scss';
import axios from 'axios';

@observer
export class VibeHome extends React.Component {
  render() {
    return (
      <form className="login-form" method="post" autoComplete="off" onSubmit={this.handleSubmit}>
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
        <Button variant="contained" color="primary" onClick={this.login}>
          Login
        </Button>
        {/* <ButtonLink variant="contained" color="primary" label="Article list" link="article-list" />; */}
      </form>
    );
  }

  handleSubmit() {
    // console.log('Here', userStore.vibeUser.username, 'There', userStore.vibeUser.user.password);
    // const result = axios.post('api/authenticate', {
    //   username: userStore.vibeUser.username,
    //   password: userStore.vibeUser.user.password,
    //   rememberMe: false
    // }).then(data => console.log('Data', data))
    // .catch(error => console.log('Error', error));
  }

  handleChange = name => event => {
    if (name === 'username') {
      userStore.vibeUser.user.login = event.target.value;
    }
    userStore.vibeUser[name] = event.target.value;
  };

  async login() {
    console.log('Here', userStore.vibeUser.username, 'There', userStore.vibeUser.user.password);

    // const result = axios.post('api/authenticate', {
    //   username: userStore.vibeUser.username,
    //   password: userStore.vibeUser.user.password,
    //   rememberMe: false
    // }).then(data => console.log('Data', data))
    // .catch(error => console.log('Error', error));

    // const bearerToken = result.value.headers.authorization;
    // if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
    //   const jwt = bearerToken.slice(7, bearerToken.length);
    //   if (rememberMe) {
    //     Storage.local.set(AUTH_TOKEN_KEY, jwt);
    //   } else {
    //     Storage.session.set(AUTH_TOKEN_KEY, jwt);
    //   }
  }
}
