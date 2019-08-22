import { error } from './fr/error-translation';
import { articleMedia } from './fr/article-media-translation';
import { article } from './fr/article-translation';
import { articleList, createNewSongPopin } from './fr/article-list-translation';
import { header } from './fr/header-translation';
import { home } from './fr/home-translation';
import { registration } from './fr/registration-translation';
import { common } from './common-translation';
import { account } from './fr/account-translation';
import { loader } from './fr/loader-translation';
import { passwordManagement } from './fr/password-management-translation';

export const frenchTranslation = {
  lng: 'fr',
  resources: {
    fr: {
      translation: {
        account,
        article,
        articleList,
        articleMedia,
        createNewSongPopin,
        common,
        error,
        header,
        home,
        loader,
        registration,
        passwordManagement
      }
    }
  }
};
