import { IUser } from 'app/shared/model/user.model';

export interface IStructure {
  id?: number;
  name?: string;
  owner?: IUser;
  users?: IUser[];
}

export const defaultValue: Readonly<IStructure> = {};
