import * as UserInterface from 'app/shared/model/user.model';
import { computed, observable, toJS } from 'mobx';

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
}

export const userStore = new UserStore();
