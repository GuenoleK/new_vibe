import { Button, TextField, CircularProgress } from '@material-ui/core';
import { loginApi } from 'app/api/login-api';
import { userStore } from 'app/stores/user-store';
import { observer } from 'mobx-react';
import React from 'react';
import './home.scss';
import { ButtonLink } from 'app/components/button-link/button-link';
import { observable } from 'mobx';

@observer
export class VibeHome extends React.Component {
  @observable
  isLoading = false;

  render() {
    return (
      <form className="login-form" method="post" autoComplete="off">
        <TextField
          label="Nom d'utilisateur"
          onChange={this.handleChange('login')}
          onKeyPress={this.fireLoginOnEnterKey}
          margin="normal"
          variant="outlined"
          required
          disabled={this.isLoading}
        />

        <TextField
          label="Mot de passe"
          onChange={this.handleChange('password')}
          onKeyPress={this.fireLoginOnEnterKey}
          margin="normal"
          variant="outlined"
          type="password"
          required
          disabled={this.isLoading}
        />
        <div className="buttons">
          <Button disabled={this.isLoading} variant="contained" color="primary" onClick={this.login}>
            Connexion
          </Button>
          <ButtonLink
            disabled={this.isLoading}
            buttonClassName="register-redirection-button"
            variant="text"
            link="/register"
            label="S'inscrire"
          />
        </div>
        <div className="loading-zone" data-loading={this.isLoading}>
          {this.isLoading && <CircularProgress className="circular-progress" />}
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
  login = () => {
    this.isLoading = true;
    loginApi.authenticate().then(() => {
      window.location.reload();
      this.isLoading = false;
    });
  };

  handleChange = name => event => {
    userStore.user[name] = event.target.value;
  };

  fireLoginOnEnterKey = event => {
    if (event.key === 'Enter') {
      this.login();
    }
  };
}
