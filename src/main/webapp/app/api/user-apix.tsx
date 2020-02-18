import axios from 'axios';

export const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

class UserApi {
  getExtendedUser = (userId: number) => axios.get(`api/extended-users/user/${userId}`).then(response => response.data);
}

export const userApi = new UserApi();
