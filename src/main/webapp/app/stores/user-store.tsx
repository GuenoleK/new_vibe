import { computed } from 'mobx';
import * as UserInterface from 'app/shared/model/user.model';

type IUser = UserInterface.IUser;

class UserStore {
  private innerUser: IUser = {};

  @computed
  get user(): IUser {
    return this.innerUser;
  }

  set user(user: IUser) {
    this.innerUser = user;
  }

  get() {
    return this.innerUser;
  }
}

export const userStore = new UserStore();
