import { userStore } from 'app/stores/user-store';
import axios from 'axios';
import { Storage } from 'react-jhipster';
import { snackbarStore } from 'app/stores/snackbar-store';
import { SnackbarTypeEnum } from 'app/enums/SnackbarEnum';
import { articleMediaStore } from 'app/stores/article-media-store';
import * as ArticleMediaInterface from 'app/shared/model/article-media.model';

type IArticleMedia = ArticleMediaInterface.IArticleMedia;

export const AUTH_TOKEN_KEY = 'jhi-authenticationToken';
const apiURl = 'api/article-media';

class ArticleMediaApi {
  /**
   * Authenticate the user
   */
  public getArticleMediaListByArticleId = async (articleId: number) => {
    let error;
    let headers = {};

    if (userStore.hasCookie) {
      headers = { Authorization: 'Bearer ' + Storage.session.get(AUTH_TOKEN_KEY) };
    } else if (userStore.hasSession) {
      headers = { Authorization: 'Bearer ' + Storage.local.get(AUTH_TOKEN_KEY) };
    }

    try {
      return axios.get(`${apiURl}/article/${articleId}`, headers).then(response => {
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

  public saveArticleMedia = (file, articleId) => {
    const formData = new FormData();
    formData.append('articleMediaFile', file);
    formData.append('name', file.name);
    formData.append('fileType', file.type);

    return axios.post(`${apiURl}/${articleId}`, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  public updateArticleMedia = (file, articleMediaId) => {
    const formData = new FormData();
    formData.append('articleMediaFile', file);
    formData.append('name', file.name);
    formData.append('fileType', file.type);

    return axios.put(`${apiURl}/${articleMediaId}`, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  public getArticleMediaSrcFile = async articleMediaId => {
    const response = await axios.get(`${apiURl}/file/src/${articleMediaId}`);
    return response.data;
  };

  public deleteArticleMedia = async articleMediaId => {
    const response = await axios.delete(`${apiURl}/${articleMediaId}`);
    return response.data;
  };
}

export const articleMediaApi = new ArticleMediaApi();
