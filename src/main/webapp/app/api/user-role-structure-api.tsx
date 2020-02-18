import { userStore } from 'app/stores/user-store';
import axios from 'axios';
import { Storage } from 'react-jhipster';
import { snackbarStore } from 'app/stores/snackbar-store';
import { SnackbarTypeEnum } from 'app/enums/SnackbarEnum';

export const AUTH_TOKEN_KEY = 'jhi-authenticationToken';
const apiURl = 'api/user-role-structures';

class UserRoleStructureApi {
  public getUserRoleStructureListByUserId = async (userId: number) => {
    let error;
    let headers = {};

    if (userStore.hasCookie) {
      headers = { Authorization: 'Bearer ' + Storage.session.get(AUTH_TOKEN_KEY) };
    } else if (userStore.hasSession) {
      headers = { Authorization: 'Bearer ' + Storage.local.get(AUTH_TOKEN_KEY) };
    }

    try {
      return axios.get(`${apiURl}/user/${userId}`, headers).then(response => {
        if (response && response.status === 200) {
          return response.data;
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

export const userRoleStructureApi = new UserRoleStructureApi();
