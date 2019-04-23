import { Button, TextField } from '@material-ui/core';
import { userStore } from 'app/stores/user-store';
import { observer } from 'mobx-react';
import React from 'react';
import './home.scss';
import { observable, toJS } from 'mobx';
import { registerApi } from 'app/api/register-api';

@observer
export class RegisterView extends React.Component {
  @observable
  passwordValidation: string;

  render() {
    return (
      <form className="register-form" method="post" autoComplete="off">
        <TextField
          label="Username"
          value={userStore.user.login}
          onChange={this.handleChange('login')}
          onKeyPress={this.fireLoginOnEnterKey}
          margin="normal"
          variant="outlined"
          required
        />

        <TextField
          label="Email"
          value={userStore.user.email}
          onChange={this.handleChange('email')}
          onKeyPress={this.fireLoginOnEnterKey}
          margin="normal"
          variant="outlined"
          required
        />

        <TextField
          label="Password"
          value={userStore.user.password}
          onChange={this.handleChange('password')}
          onKeyPress={this.fireLoginOnEnterKey}
          margin="normal"
          variant="outlined"
          type="password"
          required
        />

        <TextField
          label="Validate Password"
          value={toJS(this.passwordValidation)}
          onChange={this.handleChange('validate_password')}
          onKeyPress={this.fireLoginOnEnterKey}
          margin="normal"
          variant="outlined"
          type="password"
          required
        />
        <Button variant="contained" color="primary" onClick={this.register}>
          Register
        </Button>
      </form>
    );
  }

  componentWillMount() {
    userStore.clearUser();
  }

  register() {
    registerApi.register();
  }

  handleChange = name => event => {
    if (name === 'validate_password') {
      this.passwordValidation = event.target.value;
    } else {
      userStore.user[name] = event.target.value;
    }
  };

  fireLoginOnEnterKey = event => {
    if (event.key === 'Enter') {
      this.register();
    }
  };
}
