import React from 'react';
import { observer } from 'mobx-react';
import './reset-password-request.scss';
import { TextField, Button } from '@material-ui/core';
import { translationUtil } from 'app/translation/translation-util';
import { observable, computed } from 'mobx';
import { passwordManagementApi } from 'app/api/reset-password';
import { IActivateProps } from 'app/modules/account/activate/activate';
import { snackbarStore } from 'app/stores/snackbar-store';
import { SnackbarTypeEnum } from 'app/enums/SnackbarEnum';

@observer
export class ResetPasswordView extends React.Component<IActivateProps> {
  @observable
  password = '';

  @observable
  passwordConfirmation = '';

  render() {
    return (
      <div className="reset-password-view">
        <div className="reset-password-description">{translationUtil.translate('passwordManagement.resetPassword.reset.description')}</div>

        <TextField
          label={translationUtil.translate('passwordManagement.resetPassword.reset.fields.password.placeholder')}
          onChange={this.handleOnChange('password')}
          onKeyPress={this.fireLoginOnEnterKey}
          margin="normal"
          variant="outlined"
          type="password"
          required
        />

        <TextField
          label={translationUtil.translate('passwordManagement.resetPassword.reset.fields.confirmationPassword.placeholder')}
          onChange={this.handleOnChange('passwordConfirmation')}
          onKeyPress={this.fireLoginOnEnterKey}
          margin="normal"
          variant="outlined"
          type="password"
          required
        />

        <Button variant="contained" color="primary" onClick={this.resetPassword}>
          {translationUtil.translate('passwordManagement.resetPassword.request.buttons.confirm')}
        </Button>
      </div>
    );
  }

  handleOnChange = name => event => {
    this[name] = event.target.value.trim();
  };

  fireLoginOnEnterKey = event => {
    if (event.key === 'Enter') {
      this.resetPassword();
    }
  };

  @computed
  get hasWarning() {
    return this.password !== this.passwordConfirmation || this.password === '' || this.passwordConfirmation === '';
  }

  resetPassword = async () => {
    const key = this.props.location.search.split('=')[1];
    if (this.hasWarning) {
      this.showWarningSnackbar();
    } else if (key) {
      await passwordManagementApi.resetPassword(key, this.password);
    }
  };

  showWarningSnackbar() {
    if (this.password !== this.passwordConfirmation) {
      snackbarStore.openSnackbar(
        SnackbarTypeEnum.WARNING,
        translationUtil.translate('passwordManagement.resetPassword.reset.messages.warningNotEqual')
      );
    } else if (this.password === '' || this.passwordConfirmation === '') {
      snackbarStore.openSnackbar(
        SnackbarTypeEnum.WARNING,
        translationUtil.translate('passwordManagement.resetPassword.reset.messages.warningEmptyField')
      );
    }
  }
}
