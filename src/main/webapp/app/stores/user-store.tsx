import * as UserInterface from 'app/shared/model/user.model';
import { computed, observable, toJS } from 'mobx';
import { AUTH_TOKEN_KEY, loginApi } from 'app/api/login-api';
import { Storage } from 'react-jhipster';

type IUser = UserInterface.IUser;

class UserStore {
  @observable
  private innerUser: IUser = {};

  @computed
  get user(): IUser {
    return toJS(this.innerUser);
  }

  set user(user: IUser) {
    this.innerUser = user;
  }

  get hasCookie() {
    return Storage.session.get(AUTH_TOKEN_KEY) !== undefined;
  }

  get hasSession() {
    return Storage.local.get(AUTH_TOKEN_KEY) !== undefined;
  }

  get isConnected() {
    return this.hasCookie || this.hasSession;
  }

  initUserStore() {
    if (this.hasCookie) {
      loginApi.getAccountWithHeaderToken({ Authorization: 'Bearer ' + Storage.session.get(AUTH_TOKEN_KEY) });
    } else if (this.hasSession) {
      loginApi.getAccountWithHeaderToken({ Authorization: 'Bearer ' + Storage.local.get(AUTH_TOKEN_KEY) });
    }
  }

  clearUser() {
    this.innerUser = {};
  }
}

export const userStore = new UserStore();
