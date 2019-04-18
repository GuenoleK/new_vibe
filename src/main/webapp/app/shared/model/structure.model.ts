import { IRole } from 'app/shared/model/role.model';
import { IUser } from 'app/shared/model/user.model';

export interface IStructure {
  id?: number;
  name?: string;
  roles?: IRole[];
  users?: IUser[];
}

export const defaultValue: Readonly<IStructure> = {};
