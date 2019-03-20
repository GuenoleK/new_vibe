import { IRole } from 'app/shared/model/role.model';

export interface IStructure {
  id?: number;
  name?: string;
  roles?: IRole[];
}

export const defaultValue: Readonly<IStructure> = {};
