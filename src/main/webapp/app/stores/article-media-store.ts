import * as ArticleMediaInterface from 'app/shared/model/article-media.model';
import { computed, observable } from 'mobx';

type IArticleMedia = ArticleMediaInterface.IArticleMedia;

class ArticleMediaStore {
  @observable
  private innerArticleMediaList: IArticleMedia[] = [];

  @computed
  get articleMediaList(): IArticleMedia[] {
    return this.innerArticleMediaList;
  }

  set articleMediaList(articleMediaList: IArticleMedia[]) {
    this.innerArticleMediaList = articleMediaList;
  }
}

export const articleMediaStore = new ArticleMediaStore();
