import { userStore } from 'app/stores/user-store';
import axios from 'axios';
import { Storage } from 'react-jhipster';
import { snackbarStore } from 'app/stores/snackbar-store';
import { SnackbarTypeEnum } from 'app/enums/SnackbarEnum';
import { articleMediaStore } from 'app/stores/article-media-store';

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
      axios.get(`${apiURl}/article/${articleId}`, headers).then(response => {
        if (response && response.status === 200) {
          articleMediaStore.articleMediaList = response.data;
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

    return axios
      .post(`${apiURl}/${articleId}`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log('RESPONSE', response);
      });
  };
}

export const articleMediaApi = new ArticleMediaApi();
