import { error } from './error-translation';
import { articleMedia } from './article-media-translation';
import { article } from './article-translation';
import { articleList, createArticlePopin } from './article-list-translation';
import { header } from './header-translation';
import { home } from './home-translation';
import { registration } from './registration-translation';

export const englishTranslation = {
  lng: 'en',
  resources: {
    en: {
      translation: {
        article,
        articleList,
        articleMedia,
        createArticlePopin,
        error,
        header,
        home,
        registration
      }
    }
  }
};
