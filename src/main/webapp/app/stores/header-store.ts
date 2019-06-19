import { observable } from 'mobx';

class HeaderStore {
  @observable
  canShowSearchBar: boolean;

  @observable
  headerTitle: string;
}

export const headerStore = new HeaderStore();
