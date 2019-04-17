import { IStructure } from 'app/shared/model/structure.model';
import { IUser } from 'app/shared/model/user.model';

export const enum RoleType {
  ADMIN = 'ADMIN',
  VIEWER = 'VIEWER',
  EDITOR = 'EDITOR'
}

export interface IRole {
  id?: number;
  roleType?: RoleType;
  structure?: IStructure;
  user?: IUser;
}

export const defaultValue: Readonly<IRole> = {};
