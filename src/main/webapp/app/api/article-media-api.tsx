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
import { translationUtil } from 'app/translation/translation-util';

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
        snackbarStore.openSnackbar(SnackbarTypeEnum.SUCCESS, translationUtil.translate('articleMedia.api.audio.save.success'));
      } else if (mediaTypeCode === ArticleMediaTypeCodeEnum.PDF) {
        snackbarStore.openSnackbar(SnackbarTypeEnum.SUCCESS, translationUtil.translate('articleMedia.api.pdf.save.success'));
      }
    } catch (e) {
      if (mediaTypeCode === ArticleMediaTypeCodeEnum.AUDIO) {
        snackbarStore.openSnackbar(SnackbarTypeEnum.ERROR, translationUtil.translate('articleMedia.api.audio.save.fail'));
      } else if (mediaTypeCode === ArticleMediaTypeCodeEnum.PDF) {
        snackbarStore.openSnackbar(SnackbarTypeEnum.ERROR, translationUtil.translate('articleMedia.api.pdf.save.fail'));
      }
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
          snackbarStore.openSnackbar(SnackbarTypeEnum.ERROR, translationUtil.translate('articleMedia.api.common.multipleSave.fail'));
        }
      });
      if (hasSuccessMessage) {
        if (fileList.length > 1) {
          snackbarStore.openSnackbar(SnackbarTypeEnum.SUCCESS, translationUtil.translate('articleMedia.api.common.multipleSave.success'));
        } else {
          snackbarStore.openSnackbar(
            SnackbarTypeEnum.SUCCESS,
            translationUtil.translate('articleMedia.api.common.multipleSave.singleSuccess')
          );
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
        snackbarStore.openSnackbar(SnackbarTypeEnum.SUCCESS, translationUtil.translate('articleMedia.api.audio.update.success'));
      } else if (articleMedia.articleMediaType.code === ArticleMediaTypeCodeEnum.PDF) {
        snackbarStore.openSnackbar(SnackbarTypeEnum.SUCCESS, translationUtil.translate('articleMedia.api.pdf.update.success'));
      }
    } catch (e) {
      if (articleMedia.articleMediaType.code === ArticleMediaTypeCodeEnum.AUDIO) {
        snackbarStore.openSnackbar(SnackbarTypeEnum.ERROR, translationUtil.translate('articleMedia.api.audio.update.fail'));
      } else if (articleMedia.articleMediaType.code === ArticleMediaTypeCodeEnum.PDF) {
        snackbarStore.openSnackbar(SnackbarTypeEnum.ERROR, translationUtil.translate('articleMedia.api.pdf.update.fail'));
      }
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
        snackbarStore.openSnackbar(SnackbarTypeEnum.SUCCESS, translationUtil.translate('articleMedia.api.audio.delete.success'));
      } else if (articleMedia.articleMediaType.code === ArticleMediaTypeCodeEnum.PDF) {
        snackbarStore.openSnackbar(SnackbarTypeEnum.SUCCESS, translationUtil.translate('articleMedia.api.pdf.delete.success'));
      }
    } catch (e) {
      if (articleMedia.articleMediaType.code === ArticleMediaTypeCodeEnum.AUDIO) {
        snackbarStore.openSnackbar(SnackbarTypeEnum.ERROR, translationUtil.translate('articleMedia.api.audio.delete.fail'));
      } else if (articleMedia.articleMediaType.code === ArticleMediaTypeCodeEnum.PDF) {
        snackbarStore.openSnackbar(SnackbarTypeEnum.ERROR, translationUtil.translate('articleMedia.api.pdf.delete.fail'));
      }
    }
  };

  public downloadFile = (articleMediaUrl: string) => {
    window.location.href = articleMediaUrl;
    // window.open(articleMediaUrl, '_blank');
  };
}

export const articleMediaApi = new ArticleMediaApi();
