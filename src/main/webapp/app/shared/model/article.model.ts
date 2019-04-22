import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { IStructure } from 'app/shared/model/structure.model';

export interface IArticle {
  id?: number;
  title?: string;
  description?: string;
  content?: string;
  creationDate?: Moment;
  editionDate?: Moment;
  user?: IUser;
  structure?: IStructure;
}

export const defaultValue: Readonly<IArticle> = {};
