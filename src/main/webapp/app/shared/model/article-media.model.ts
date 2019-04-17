import { IArticle } from 'app/shared/model/article.model';
import { IUser } from 'app/shared/model/user.model';

export const enum ArticleMediaType {
  IMAGE = 'IMAGE',
  PDF = 'PDF',
  AUDIO = 'AUDIO'
}

export interface IArticleMedia {
  id?: number;
  name?: string;
  articleMediaType?: ArticleMediaType;
  article?: IArticle;
  user?: IUser;
}

export const defaultValue: Readonly<IArticleMedia> = {};
