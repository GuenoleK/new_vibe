import { IArticle } from 'app/shared/model/article.model';
import { IVibeUser } from 'app/shared/model/vibe-user.model';

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
  vibeUser?: IVibeUser;
}

export const defaultValue: Readonly<IArticleMedia> = {};
