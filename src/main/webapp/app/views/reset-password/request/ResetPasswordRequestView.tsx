import React from 'react';
import { observer } from 'mobx-react';
import './reset-password-request.scss';
import { TextField, Button } from '@material-ui/core';
import { translationUtil } from 'app/translation/translation-util';
import { observable } from 'mobx';
import { passwordManagementApi } from 'app/api/reset-password';
import { snackbarStore } from 'app/stores/snackbar-store';
import { SnackbarTypeEnum } from 'app/enums/SnackbarEnum';
import { FormTitle } from 'app/components/form-title/FormTitle';

@observer
export class ResetPasswordRequestView extends React.Component {
  @observable
  email = '';

  @observable
  isEmailSent = false;
  render() {
    return (
      <div className="reset-password-request-view">
        <FormTitle text={translationUtil.translate('passwordManagement.resetPassword.request.title')} />
        <div className="request-password-description">
          {translationUtil.translate('passwordManagement.resetPassword.request.description')}
        </div>

        <TextField
          label={translationUtil.translate('passwordManagement.resetPassword.request.fields.email.placeholder')}
          onChange={this.handleOnChange()}
          onKeyPress={this.fireLoginOnEnterKey}
          margin="normal"
          variant="outlined"
          type="email"
          required
          disabled={this.isEmailSent}
        />

        <Button disabled={this.isEmailSent} variant="contained" color="primary" onClick={this.requestResetPassword}>
          {translationUtil.translate('passwordManagement.resetPassword.request.buttons.confirm')}
        </Button>
      </div>
    );
  }

  handleOnChange = () => event => {
    this.email = event.target.value.trim();
  };

  fireLoginOnEnterKey = event => {
    if (event.key === 'Enter') {
      this.requestResetPassword();
    }
  };

  requestResetPassword = async () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
      await passwordManagementApi.requestResetPassword(this.email);
      this.isEmailSent = true;
    } else {
      snackbarStore.openSnackbar(
        SnackbarTypeEnum.WARNING,
        translationUtil.translate('passwordManagement.resetPassword.request.messages.warning.emailValidation')
      );
    }
  };
}
