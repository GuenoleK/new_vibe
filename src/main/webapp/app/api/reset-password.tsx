import React from 'react';
import { userStore } from 'app/stores/user-store';
import axios from 'axios';
import { snackbarStore } from 'app/stores/snackbar-store';
import { SnackbarTypeEnum } from 'app/enums/SnackbarEnum';
import { translationUtil } from 'app/translation/translation-util';
import SecurityIcon from '@material-ui/icons/Security';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { EmptyState } from 'app/components/empty-state/empty-state';

export const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

const apiUrl = 'api/account';
const apiResetPassword = `${apiUrl}/reset-password`;

class PasswordManagementApi {
  public requestResetPassword = (email: string) => {
    axios
      .post(`${apiResetPassword}/init`, email.trim(), {
        headers: {
          'Content-Type': 'text/plain'
        }
      })
      .then(() => {
        snackbarStore.openSnackbar(
          SnackbarTypeEnum.SUCCESS,
          translationUtil.translate('passwordManagement.resetPassword.request.messages.success')
        );
      })
      .catch(error => {
        if (error.response.data.title === 'Email address not registered') {
          snackbarStore.openSnackbar(
            SnackbarTypeEnum.ERROR,
            translationUtil.translate('passwordManagement.resetPassword.request.messages.error.emailDoesNotExist')
          );
        } else {
          snackbarStore.openSnackbar(
            SnackbarTypeEnum.ERROR,
            translationUtil.translate('passwordManagement.resetPassword.request.messages.error.error')
          );
        }
      });
  };

  public resetPassword = (key: string, newPassword: string) => {
    axios
      .post(`${apiResetPassword}/finish`, { key, newPassword })
      .then(() => {
        snackbarStore.openSnackbar(
          SnackbarTypeEnum.SUCCESS,
          translationUtil.translate('passwordManagement.resetPassword.reset.messages.success')
        );
      })
      .catch(e => {
        if (e.response.data.title === 'No user was found for this reset key') {
          snackbarStore.openSnackbar(
            SnackbarTypeEnum.ERROR,
            translationUtil.translate('passwordManagement.resetPassword.reset.messages.noRequestPasswordError')
          );
        } else {
          snackbarStore.openSnackbar(
            SnackbarTypeEnum.ERROR,
            translationUtil.translate('passwordManagement.resetPassword.reset.messages.error')
          );
        }
      });
  };

  public changePassword = (currentPassword: string, newPassword: string) => {
    axios.post(`${apiUrl}/change-password`, { currentPassword, newPassword });
  };
}

export const passwordManagementApi = new PasswordManagementApi();
