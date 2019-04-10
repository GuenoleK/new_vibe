import { userStore } from 'app/stores/user-store';
import axios from 'axios';
import { Storage } from 'react-jhipster';

const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

class ApiUtil {
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
        console.error('Status error:', response.status);
      } else {
        // When it failed, we inform the user something wrong append
        console.error('ERROR', error);
      }
    } else {
      // When the user has filled no input, we inform him to do so
      console.error('You have to fill all the inputs');
    }
  };

  login = () => {
    let error;

    try {
      axios.get('api/account').then(response => {
        if (response && response.status === 200) {
          userStore.user = response.data;
        } else if (response && response.status !== 200) {
          console.error('Response status:', response.status);
        }
      });
    } catch (e) {
      error = e.response;
    }

    if (error) {
      console.error('Error', error);
    }
  };
}

export const apiUtil = new ApiUtil();
