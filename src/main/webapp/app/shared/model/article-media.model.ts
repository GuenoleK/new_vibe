import { IArticle } from 'app/shared/model/article.model';
import { IArticleMediaType } from 'app/shared/model/article-media-type.model';
import { IUser } from 'app/shared/model/user.model';

export interface IArticleMedia {
  id?: number;
  name?: string;
  article?: IArticle;
  articleMediaType?: IArticleMediaType;
  user?: IUser;
}

export const defaultValue: Readonly<IArticleMedia> = {};
