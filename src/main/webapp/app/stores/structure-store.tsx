import * as StructureInterface from 'app/shared/model/structure.model';
import { computed, observable } from 'mobx';

type IStructure = StructureInterface.IStructure;

class StructureStore {
  @observable
  private innerStructureList: IStructure[] = [];

  @computed
  get structureList(): IStructure[] {
    return this.innerStructureList;
  }

  set structureList(structureList: IStructure[]) {
    this.innerStructureList = { ...this.innerStructureList, ...structureList };
  }

  clearStructureList() {
    this.innerStructureList = [];
  }
}

export const structureStore = new StructureStore();
