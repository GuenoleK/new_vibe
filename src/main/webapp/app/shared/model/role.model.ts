import { IUser } from 'app/shared/model/user.model';

export interface IRole {
  id?: number;
  code?: string;
  user?: IUser;
  users?: IUser[];
}

export const defaultValue: Readonly<IRole> = {};
