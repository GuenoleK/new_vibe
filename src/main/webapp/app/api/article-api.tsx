import { userStore } from 'app/stores/user-store';
import axios from 'axios';
import { Storage } from 'react-jhipster';
import { snackbarStore } from 'app/stores/snackbar-store';
import { SnackbarTypeEnum } from 'app/enums/SnackbarEnum';
import { articleStore } from 'app/stores/article-store';
import * as ArticleInterface from 'app/shared/model/article.model';
import { apiUtil } from 'app/utils/ApiUtil';

type IArticle = ArticleInterface.IArticle;

export const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

class ArticleApi {
  /**
   * Authenticate the user
   */
  public getArticleListByStructureId = async (structureId: number) => {
    let error;
    let headers = {};

    if (userStore.hasCookie) {
      headers = { Authorization: 'Bearer ' + Storage.session.get(AUTH_TOKEN_KEY) };
    } else if (userStore.hasSession) {
      headers = { Authorization: 'Bearer ' + Storage.local.get(AUTH_TOKEN_KEY) };
    }

    try {
      return axios.get(`api/articles/structure/${structureId}`, headers).then(response => {
        if (response && response.status === 200) {
          return response.data;
        } else if (response && response.status !== 200) {
          snackbarStore.openSnackbar(SnackbarTypeEnum.INFO, `Status error ${response.status}`);
          throw new Error(`Status error ${response.status}`);
        }
      });
    } catch (e) {
      error = e.response;
    }

    if (error) {
      snackbarStore.openSnackbar(SnackbarTypeEnum.INFO, `Error status: ${error.status}, error text: ${error.statusText}`);
      throw new Error(`Error status: ${error.status}, error text: ${error.statusText}`);
    }
  };

  /**
   * Authenticate the user
   */
  public getArticle = async (articleId: number) => {
    let error;
    let headers = {};

    if (userStore.hasCookie) {
      headers = { Authorization: 'Bearer ' + Storage.session.get(AUTH_TOKEN_KEY) };
    } else if (userStore.hasSession) {
      headers = { Authorization: 'Bearer ' + Storage.local.get(AUTH_TOKEN_KEY) };
    }

    try {
      return axios.get(`api/articles/${articleId}`, headers).then(response => {
        if (response && response.status === 200) {
          return response.data;
        } else if (response && response.status !== 200) {
          snackbarStore.openSnackbar(SnackbarTypeEnum.INFO, `Status error ${response.status}`);
          throw new Error(`Status error ${response.status}`);
        }
      });
    } catch (e) {
      error = e.response;
    }

    if (error) {
      snackbarStore.openSnackbar(SnackbarTypeEnum.INFO, `Error status: ${error.status}, error text: ${error.statusText}`);
      throw new Error(`Error status: ${error.status}, error text: ${error.statusText}`);
    }
  };

  public saveArticle = async (article: IArticle) => {
    let error;
    const header = apiUtil.getHeader();
    if (article.title) {
      try {
        return axios
          .post(`api/articles`, article)
          .then(response => {
            if (response && response.status === 201) {
              snackbarStore.openSnackbar(SnackbarTypeEnum.SUCCESS, "L'article a bien été créé");
              return response.data;
            } else if (response && response.status !== 201) {
              snackbarStore.openSnackbar(SnackbarTypeEnum.INFO, `Status error ${response.status}`);
              throw new Error(`Status error ${response.status}`);
            } else if (response && response.status === 500) {
              snackbarStore.openSnackbar(SnackbarTypeEnum.ERROR, `STATUS: ${response.status}`);
              throw new Error(`Status error ${response.status}`);
            }
          })
          .catch((err: any) => {
            snackbarStore.openSnackbar(SnackbarTypeEnum.ERROR, `${err}, Ce titre existe déjà`);
            throw new Error(`Regarder les logs pour plus de précision. ${err}`);
          });
      } catch (e) {
        error = e.response;
        snackbarStore.openSnackbar(SnackbarTypeEnum.INFO, `Error status: ${error.status}, error text: ${error.statusText}`);
        throw new Error(`Error status: ${error.status}, error text: ${error.statusText}`);
      }
    } else if (article.title === undefined || article.title.trim() === '') {
      snackbarStore.openSnackbar(SnackbarTypeEnum.INFO, 'Il faut remplir tous les champs');
      throw new Error('Il faut remplir tous les champs');
    }
  };
}

export const articleApi = new ArticleApi();
