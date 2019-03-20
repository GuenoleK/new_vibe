import { IUser } from 'app/shared/model/user.model';

export interface IVibeUser {
  id?: number;
  username?: string;
  user?: IUser;
}

export const defaultValue: Readonly<IVibeUser> = {};
