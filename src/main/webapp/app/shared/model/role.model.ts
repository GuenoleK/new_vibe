import { IStructure } from 'app/shared/model/structure.model';
import { IVibeUser } from 'app/shared/model/vibe-user.model';

export const enum RoleType {
  ADMIN = 'ADMIN',
  VIEWER = 'VIEWER',
  EDITOR = 'EDITOR'
}

export interface IRole {
  id?: number;
  roleType?: RoleType;
  structure?: IStructure;
  vibeUser?: IVibeUser;
}

export const defaultValue: Readonly<IRole> = {};
