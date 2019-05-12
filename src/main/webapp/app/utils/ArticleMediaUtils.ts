import { ArticleMediaTypeCodeEnum } from 'app/enums/ArticleMediaTypeCodeEnum';
import * as ArticleMediaInterface from 'app/shared/model/article-media.model';
import { snackbarStore } from 'app/stores/snackbar-store';
import { SnackbarTypeEnum } from 'app/enums/SnackbarEnum';

type IArticleMedia = ArticleMediaInterface.IArticleMedia;

class ArticleMediaUtils {
  buildPDFMedia(media: IArticleMedia, mediaTypeCode: ArticleMediaTypeCodeEnum): string {
    if (media) {
      if (mediaTypeCode === ArticleMediaTypeCodeEnum.PDF) {
        return `${media.name}.pdf`;
      }
    }
    snackbarStore.openSnackbar(SnackbarTypeEnum.INFO, `A problem occured with the PDF media`);
    return '';
  }

  public buildMediaPath(media: IArticleMedia): string {
    if (media) {
      if (media.articleMediaType.code === ArticleMediaTypeCodeEnum.PDF) {
        return `${media.article.structure.name}/${media.article.title}/${media.name}`;
      }
    }
    return '';
  }

  public processArticleMediaName(media: IArticleMedia) {
    const stringArray = media.name.split('.');
    return stringArray[0];
  }
}

export const articleMediaUtils = new ArticleMediaUtils();
