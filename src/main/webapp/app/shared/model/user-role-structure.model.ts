import { IUser } from 'app/shared/model/user.model';
import { IRole } from 'app/shared/model/role.model';
import { IStructure } from 'app/shared/model/structure.model';

export interface IUserRoleStructure {
  id?: number;
  user?: IUser;
  role?: IRole;
  structure?: IStructure;
}

export const defaultValue: Readonly<IUserRoleStructure> = {};
