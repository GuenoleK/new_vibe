import { userStore } from 'app/stores/user-store';
import { Storage } from 'react-jhipster';
import { AUTH_TOKEN_KEY } from 'app/api/register-api';

class ApiUtil {
  getHeader() {
    if (userStore.hasCookie) {
      return { Authorization: 'Bearer ' + Storage.session.get(AUTH_TOKEN_KEY) };
    } else if (userStore.hasSession) {
      return { Authorization: 'Bearer ' + Storage.local.get(AUTH_TOKEN_KEY) };
    }
  }
}

export const apiUtil = new ApiUtil();
