import { Button, TextField, CircularProgress } from '@material-ui/core';
import { loginApi } from 'app/api/login-api';
import { userStore } from 'app/stores/user-store';
import { observer } from 'mobx-react';
import React from 'react';
import './home.scss';
import { ButtonLink } from 'app/components/button-link/button-link';
import { observable } from 'mobx';
import { headerStore } from 'app/stores/header-store';
import { translationUtil } from 'app/translation/translation-util';

@observer
export class HomeView extends React.Component {
  @observable
  isLoading = false;

  @observable
  usernameTextField;

  @observable
  passwordTextfield;

  // Component life cycle
  componentWillMount() {
    userStore.clearUser();
    headerStore.headerTitle = 'Vibe';
  }

  render() {
    return (
      <form className="login-form" method="post" autoComplete="off">
        <TextField
          inputProps={{ autoCorrect: 'off', autoCapitalize: 'none' }}
          label={translationUtil.translate('home.fields.username.placeholder')}
          onChange={this.handleChange('login')}
          onKeyPress={this.fireLoginOnEnterKey}
          margin="normal"
          variant="outlined"
          required
          disabled={this.isLoading}
          ref={this.createRef('usernameTextField')}
        />

        <TextField
          label={translationUtil.translate('home.fields.password.placeholder')}
          onChange={this.handleChange('password')}
          onKeyPress={this.fireLoginOnEnterKey}
          margin="normal"
          variant="outlined"
          type="password"
          required
          disabled={this.isLoading}
          ref={this.createRef('passwordTextfield')}
        />

        <div className="buttons">
          <Button disabled={this.isLoading} variant="contained" color="primary" onClick={this.login}>
            {translationUtil.translate('home.buttons.login')}
          </Button>
          <ButtonLink
            disabled={this.isLoading}
            buttonClassName="register-redirection-button"
            variant="text"
            link="/register"
            label={translationUtil.translate('home.buttons.register')}
          />
        </div>
        <ButtonLink
          disabled={this.isLoading}
          buttonClassName="reset-password-request-button"
          variant="text"
          link="/reset-password-request"
          label={translationUtil.translate('home.buttons.resetPassword')}
        />
        <div className="loading-zone" data-loading={this.isLoading}>
          <CircularProgress className="circular-progress" variant={this.isLoading ? 'indeterminate' : 'static'} />
        </div>
      </form>
    );
  }

  createRef = name => target => {
    this[name] = target;
  };

  /**
   * Call the auth + login function
   * When everything is ok, we redirect the user to the article list
   */
  login = () => {
    this.isLoading = true;
    loginApi
      .authenticate()
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        this.isLoading = false;
      });
  };

  handleChange = name => event => {
    userStore.user[name] = event.target.value.toLowerCase();
  };

  fireLoginOnEnterKey = event => {
    if (event.key === 'Enter') {
      this.login();
    }
  };
}
