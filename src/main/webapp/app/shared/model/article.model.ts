import { Moment } from 'moment';
import { IVibeUser } from 'app/shared/model/vibe-user.model';

export interface IArticle {
  id?: number;
  title?: string;
  description?: string;
  content?: string;
  creationDate?: Moment;
  editionDate?: Moment;
  vibeUser?: IVibeUser;
}

export const defaultValue: Readonly<IArticle> = {};
