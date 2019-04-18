import { IStructure } from 'app/shared/model/structure.model';
import { IUser } from 'app/shared/model/user.model';

export interface IRole {
  id?: number;
  code?: string;
  structure?: IStructure;
  user?: IUser;
  users?: IUser[];
}

export const defaultValue: Readonly<IRole> = {};
