import { observable } from 'mobx';
import { SnackbarTypeEnum } from 'app/enums/SnackbarEnum';

class SnackbarStore {
  @observable
  private isOpen = false;
  @observable
  private messageContent = '';
  @observable
  private internalSnackbarType: SnackbarTypeEnum;

  get isSnackbarOpen() {
    return this.isOpen;
  }

  get snackbarMessage() {
    return this.messageContent;
  }

  get snackbarType() {
    return this.internalSnackbarType;
  }

  /**
   * Defines the snackbar datas
   */
  openSnackbar(snackbarType: SnackbarTypeEnum, messageContent: string) {
    this.internalSnackbarType = snackbarType;
    this.messageContent = messageContent;
    this.isOpen = true;
  }

  /**
   * handled when the snackbar is closing
   * Resets the snackbar values
   */
  onSnackbarClose() {
    this.resetValues();
  }

  resetValues() {
    this.isOpen = false;
    this.messageContent = '';
  }
}

export const snackbarStore = new SnackbarStore();
