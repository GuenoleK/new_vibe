import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';

export interface IArticle {
  id?: number;
  title?: string;
  description?: string;
  content?: string;
  creationDate?: Moment;
  editionDate?: Moment;
  user?: IUser;
}

export const defaultValue: Readonly<IArticle> = {};
