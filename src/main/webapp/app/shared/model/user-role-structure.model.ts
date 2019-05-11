import { IUser } from 'app/shared/model/user.model';
import { IRole } from 'app/shared/model/role.model';
import { IStructure } from 'app/shared/model/structure.model';

export interface IUserRoleStructure {
  id?: number;
  users?: IUser[];
  roles?: IRole[];
  structures?: IStructure[];
}

export const defaultValue: Readonly<IUserRoleStructure> = {};
