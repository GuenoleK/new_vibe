import { RoleEnum } from 'app/enums/RoleEnum';
import { userStore } from 'app/stores/user-store';

class RoleUtils {
  public canEdit() {
    return this.hasRole(this.rolesForEdition);
  }
  public hasRole = (roleEnumList: RoleEnum[]) => {
    const role = roleEnumList.find(data => data === userStore.userRole.name);
    return role ? true : false;
  };

  public get rolesForEdition() {
    return [RoleEnum.ADMIN, RoleEnum.EDITOR, RoleEnum.MANAGER];
  }
}

export const roleUtils = new RoleUtils();
