import { userStore } from 'app/stores/user-store';
import axios from 'axios';
import { Storage } from 'react-jhipster';
import { snackbarStore } from 'app/stores/snackbar-store';
import { SnackbarTypeEnum } from 'app/enums/SnackbarEnum';
import { toJS } from 'mobx';

export const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

class UserApi {
  getExtendedUser = (userId: number) => axios.get(`api/extended-users/user/${userId}`).then(response => response.data);
}

export const userApi = new UserApi();
