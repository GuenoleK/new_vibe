import React from 'react';
import { userStore } from 'app/stores/user-store';
import axios from 'axios';
import { snackbarStore } from 'app/stores/snackbar-store';
import { SnackbarTypeEnum } from 'app/enums/SnackbarEnum';
import { translationUtil } from 'app/translation/translation-util';
import { EmptyState } from 'app/components/empty-state/empty-state';

export const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

class RegisterApi {
  /**
   * Authenticate the user
   */
  public register = async (structureName: string) => {
    if (userStore.user.login && userStore.user.password && userStore.user.email && userStore.user.langKey && structureName.trim() !== '') {
      axios
        .post(`api/register/${structureName}`, {
          login: userStore.user.login,
          password: userStore.user.password,
          email: userStore.user.email,
          langKey: userStore.user.langKey
        })
        .then(response => {
          if (response && response.status >= 200 && response.status <= 300) {
            snackbarStore.openSnackbar(SnackbarTypeEnum.SUCCESS, translationUtil.translate('registration.message.success'));
          } else if (response && response.status !== 200) {
            snackbarStore.openSnackbar(SnackbarTypeEnum.ERROR, translationUtil.translate('registration.message.error'));
            throw new Error(`Status error ${response.status}`);
          }
        })
        .catch(e => {
          const error = e.response;
          snackbarStore.openSnackbar(SnackbarTypeEnum.ERROR, translationUtil.translate(error.data.message));
          throw new Error(`Error status: ${error.status}, error text: ${error.statusText}`);
        });
    } else {
      // When the user has filled no input, we inform him to do so
      snackbarStore.openSnackbar(SnackbarTypeEnum.WARNING, translationUtil.translate('registration.message.warningFields'));
      throw new Error(`You have to fill all the inputs`);
    }
  };

  public activateAccount = (activationKey: string) => {
    // tslint:disable-next-line: ter-arrow-body-style
    return axios.get(`api/activate/?key=${activationKey}`);
  };
}

export const registerApi = new RegisterApi();
