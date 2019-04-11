import * as UserInterface from 'app/shared/model/user.model';
import { computed, observable, toJS } from 'mobx';
import { AUTH_TOKEN_KEY } from 'app/api/api';
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

  get icConnected() {
    return Storage.local.get(AUTH_TOKEN_KEY) !== undefined || Storage.session.get(AUTH_TOKEN_KEY) !== undefined;
  }
}

export const userStore = new UserStore();
