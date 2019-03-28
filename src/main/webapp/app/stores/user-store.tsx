import { computed } from 'mobx';
import * as VibeUserInterface from 'app/shared/model/vibe-user.model';

type IVibeUser = VibeUserInterface.IVibeUser;

class UserStore {
  private innerUser: IVibeUser = {
    user: {}
  };

  @computed
  get vibeUser(): IVibeUser {
    return this.innerUser;
  }

  set vibeUser(user: IVibeUser) {
    this.innerUser = user;
  }
}

export const userStore = new UserStore();
