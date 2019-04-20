import { IUser } from 'app/shared/model/user.model';
import { IStructure } from 'app/shared/model/structure.model';

export interface IExtendedUser {
  id?: number;
  user?: IUser;
  currentStructure?: IStructure;
}

export const defaultValue: Readonly<IExtendedUser> = {};
