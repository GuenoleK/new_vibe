import { userStore } from 'app/stores/user-store';
import axios from 'axios';
import { Storage } from 'react-jhipster';
import { snackbarStore } from 'app/stores/snackbar-store';
import { SnackbarTypeEnum } from 'app/enums/SnackbarEnum';

export const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

class ApiUtil {
  /**
   * Authenticate the user
   */
  public authenticate = async () => {
    // The user have to fill all inputs to try a login
    if (userStore.user.login || userStore.user.password) {
      const rememberMe = false;

      let response;
      let error;

      // We try to connect the user
      try {
        response = await axios.post('api/authenticate', {
          username: userStore.user.login,
          password: userStore.user.password,
          rememberMe
        });
      } catch (e) {
        error = e.response;
      }

      // When the connection is ok, we set the connection
      if (response && response.status === 200) {
        const bearerToken = response.headers.authorization;
        if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
          const jwt = bearerToken.slice(7, bearerToken.length);
          if (rememberMe) {
            Storage.local.set(AUTH_TOKEN_KEY, jwt);
          } else {
            Storage.session.set(AUTH_TOKEN_KEY, jwt);
          }
        }
        this.login();
      } else if (response && response.status !== 200) {
        snackbarStore.openSnackbar(SnackbarTypeEnum.ERROR, `Status error ${response.status}`);
        throw new Error(`Status error ${response.status}`);
      } else {
        // When it failed, we inform the user something wrong append
        snackbarStore.openSnackbar(SnackbarTypeEnum.ERROR, `Error status: ${error.status}, error text: ${error.statusText}`);
        throw new Error(`Error status: ${error.status}, error text: ${error.statusText}`);
      }
    } else {
      // When the user has filled no input, we inform him to do so
      snackbarStore.openSnackbar(SnackbarTypeEnum.INFO, `You have to fill all the inputs`);
      throw new Error(`You have to fill all the inputs`);
    }
  };

  login = () => {
    let error;

    try {
      axios.get('api/account').then(response => {
        if (response && response.status === 200) {
          userStore.user = response.data;
        } else if (response && response.status !== 200) {
          snackbarStore.openSnackbar(SnackbarTypeEnum.INFO, `Status error ${response.status}`);
          throw new Error(`Status error ${response.status}`);
        }
      });
    } catch (e) {
      error = e.response;
    }

    if (error) {
      snackbarStore.openSnackbar(SnackbarTypeEnum.INFO, `Error status: ${error.status}, error text: ${error.statusText}`);
      throw new Error(`Error status: ${error.status}, error text: ${error.statusText}`);
    }
  };
}

export const apiUtil = new ApiUtil();
