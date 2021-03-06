import * as UserInterface from 'app/shared/model/user.model';
import * as ExtendedUserInterface from 'app/shared/model/extended-user.model';
import * as RoleInterface from 'app/shared/model/role.model';
import { computed, observable, toJS } from 'mobx';
import { AUTH_TOKEN_KEY, loginApi } from 'app/api/login-api';
import { Storage } from 'react-jhipster';
import { LanguageEnum } from 'app/enums/LanguageEnum';
import { IStructure } from 'app/shared/model/structure.model';

type IUser = UserInterface.IUser;
type IExtendedUser = ExtendedUserInterface.IExtendedUser;
type IRole = RoleInterface.IRole;

class UserStore {
  @observable
  private innerUserRole: IRole = {};

  @computed
  get userRole(): IRole {
    return this.innerUserRole;
  }

  set userRole(userRole: IRole) {
    this.innerUserRole = { ...this.innerUserRole, ...userRole };
  }

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

  changeCurrentStructure = (structure: IStructure) => {
    const extendedUser = toJS(this.extendedUser);
    extendedUser.currentStructure = structure;

    loginApi.updateExtendedUser(extendedUser).then(() => {
      window.location.reload();
    });
  };
}

export const userStore = new UserStore();
