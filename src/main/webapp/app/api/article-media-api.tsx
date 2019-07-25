import { userStore } from 'app/stores/user-store';
import axios from 'axios';
import { Storage } from 'react-jhipster';
import { snackbarStore } from 'app/stores/snackbar-store';
import { SnackbarTypeEnum } from 'app/enums/SnackbarEnum';
import { articleMediaStore } from 'app/stores/article-media-store';
import * as ArticleMediaInterface from 'app/shared/model/article-media.model';
import { articleStore } from 'app/stores/article-store';
import { articleApi } from './article-api';
import { ArticleMediaTypeCodeEnum } from 'app/enums/ArticleMediaTypeCodeEnum';

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

  public saveArticleMedia = async (file, articleId, mediaTypeCode: ArticleMediaTypeCodeEnum) => {
    const formData = new FormData();
    formData.append('articleMediaFile', file);
    formData.append('name', file.name);
    formData.append('fileType', file.type);

    try {
      await axios.post(`${apiURl}/${articleId}`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      articleStore.article = await articleApi.getArticle(articleId);
      articleMediaStore.articleMediaList = await articleMediaApi.getArticleMediaListByArticleId(articleId);
      if (mediaTypeCode === ArticleMediaTypeCodeEnum.AUDIO) {
        snackbarStore.openSnackbar(SnackbarTypeEnum.SUCCESS, 'Le fichier audio a bien été ajouté');
      } else if (mediaTypeCode === ArticleMediaTypeCodeEnum.PDF) {
        snackbarStore.openSnackbar(SnackbarTypeEnum.SUCCESS, 'Le fichier des paroles a bien été ajouté');
      }
    } catch (e) {
      snackbarStore.openSnackbar(SnackbarTypeEnum.ERROR, e.response.data.detail);
    }
  };

  public saveArticleMediaMultiple = async (fileList, articleId, hasSuccessMessage = true) => {
    if (fileList.length > 0) {
      fileList.map(async file => {
        const formData = new FormData();
        formData.append('articleMediaFile', file);
        formData.append('name', file.name);
        formData.append('fileType', file.type);

        try {
          await axios.post(`${apiURl}/${articleId}`, formData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          articleStore.article = await articleApi.getArticle(articleId);
          articleMediaStore.articleMediaList = await articleMediaApi.getArticleMediaListByArticleId(articleId);
        } catch (e) {
          snackbarStore.openSnackbar(SnackbarTypeEnum.ERROR, e.response.data.detail);
        }
      });
      if (hasSuccessMessage) {
        if (fileList.length > 1) {
          snackbarStore.openSnackbar(SnackbarTypeEnum.SUCCESS, 'Les fichiers ont bien été ajoutés');
        } else {
          snackbarStore.openSnackbar(SnackbarTypeEnum.SUCCESS, 'Le fichier a bien été ajouté');
        }
      }
    }
  };

  public updateArticleMedia = async (file, articleMedia: IArticleMedia, articleId: number) => {
    const formData = new FormData();
    formData.append('articleMediaFile', file);
    formData.append('name', file.name);
    formData.append('fileType', file.type);

    try {
      await axios.put(`${apiURl}/${articleMedia.id}`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      articleStore.article = await articleApi.getArticle(articleId);
      articleMediaStore.articleMediaList = await articleMediaApi.getArticleMediaListByArticleId(articleId);
      if (articleMedia.articleMediaType.code === ArticleMediaTypeCodeEnum.AUDIO) {
        snackbarStore.openSnackbar(SnackbarTypeEnum.SUCCESS, 'Le fichier audio a bien été mis à jour');
      } else if (articleMedia.articleMediaType.code === ArticleMediaTypeCodeEnum.PDF) {
        snackbarStore.openSnackbar(SnackbarTypeEnum.SUCCESS, 'Le fichier des paroles a bien été mis à jour');
      }
    } catch (e) {
      snackbarStore.openSnackbar(SnackbarTypeEnum.ERROR, e.response.data.detail);
    }
  };

  public getArticleMediaSrcFile = async articleMediaId => {
    const response = await axios.get(`${apiURl}/file/src/${articleMediaId}`);
    return response.data;
  };

  public deleteArticleMedia = async (articleMedia: IArticleMedia, articleId: number) => {
    try {
      await axios.delete(`${apiURl}/${articleMedia.id}`);
      articleStore.article = await articleApi.getArticle(articleId);
      articleMediaStore.articleMediaList = await articleMediaApi.getArticleMediaListByArticleId(articleId);
      if (articleMedia.articleMediaType.code === ArticleMediaTypeCodeEnum.AUDIO) {
        snackbarStore.openSnackbar(SnackbarTypeEnum.SUCCESS, 'Le fichier audio a bien été supprimé');
      } else if (articleMedia.articleMediaType.code === ArticleMediaTypeCodeEnum.PDF) {
        snackbarStore.openSnackbar(SnackbarTypeEnum.SUCCESS, 'Le fichier des paroles a bien été supprimé');
      }
    } catch (e) {
      snackbarStore.openSnackbar(SnackbarTypeEnum.ERROR, e.response.data.detail);
    }
  };
}

export const articleMediaApi = new ArticleMediaApi();
