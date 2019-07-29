import { error } from './en/error-translation';
import { articleMedia } from './en/article-media-translation';
import { article } from './en/article-translation';
import { articleList, createArticlePopin } from './en/article-list-translation';
import { header } from './en/header-translation';
import { home } from './en/home-translation';
import { registration } from './en/registration-translation';
import { common } from './common-translation';
import { account } from './en/account-translation';
import { loader } from './en/loader-translation';

export const englishTranslation = {
  lng: 'en',
  resources: {
    en: {
      translation: {
        account,
        article,
        articleList,
        articleMedia,
        createArticlePopin,
        common,
        error,
        header,
        home,
        loader,
        registration
      }
    }
  }
};
