import * as UserInterface from 'app/shared/model/user.model';
import * as ExtendedUserInterface from 'app/shared/model/extended-user.model';
import { computed, observable, action } from 'mobx';
import { AUTH_TOKEN_KEY, loginApi } from 'app/api/login-api';
import { Storage } from 'react-jhipster';
import { LanguageEnum } from 'app/enums/LanguageEnum';

type IUser = UserInterface.IUser;
type IExtendedUser = ExtendedUserInterface.IExtendedUser;

class UserStore {
  @observable
  private innerExtendedUser: IExtendedUser = {};

  @computed
  get extendedUser(): IExtendedUser {
    return this.innerExtendedUser;
  }

  set extendedUser(extendedUser: IExtendedUser) {
    this.innerExtendedUser = { ...this.innerExtendedUser, ...extendedUser };
  }

  @observable
  private innerUser: IUser = {};

  @computed
  get user(): IUser {
    return this.innerUser;
  }

  set user(user: IUser) {
    this.innerUser = { ...this.innerUser, ...user };
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

  async initUserStore() {
    if (this.hasCookie) {
      return loginApi.getAccountWithHeaderToken({ Authorization: 'Bearer ' + Storage.session.get(AUTH_TOKEN_KEY) });
    } else if (this.hasSession) {
      return loginApi.getAccountWithHeaderToken({ Authorization: 'Bearer ' + Storage.local.get(AUTH_TOKEN_KEY) });
    }
  }

  clearUser() {
    this.innerUser = {};
  }

  changeLanguage = (language: LanguageEnum) => {
    this.user.langKey = language;
    loginApi.updateUser(userStore.user).then(() => {
      window.location.reload();
    });
  };
}

export const userStore = new UserStore();
