import { userStore } from 'app/stores/user-store';
import axios from 'axios';
import { Storage } from 'react-jhipster';
import { snackbarStore } from 'app/stores/snackbar-store';
import { SnackbarTypeEnum } from 'app/enums/SnackbarEnum';
import { articleStore } from 'app/stores/article-store';
import { translationUtil } from 'app/translation/translation-util';

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
            // LOGIN NOW ?
            snackbarStore.openSnackbar(SnackbarTypeEnum.SUCCESS, `Inscription réussi`);
            // articleStore.articleList = response.data;
          } else if (response && response.status !== 200) {
            snackbarStore.openSnackbar(SnackbarTypeEnum.ERROR, `Status error ${response.status}`);
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
      snackbarStore.openSnackbar(SnackbarTypeEnum.WARNING, `You have to fill all the inputs`);
      throw new Error(`You have to fill all the inputs`);
    }
  };
}

export const registerApi = new RegisterApi();
