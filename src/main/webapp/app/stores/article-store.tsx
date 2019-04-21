import * as ArticleInterface from 'app/shared/model/article.model';
import { computed, observable, toJS } from 'mobx';

type IArticle = ArticleInterface.IArticle;

class ArticleStore {
  @observable
  innerArticleList: IArticle[] = [];

  @computed
  get articleList(): IArticle[] {
    return toJS(this.innerArticleList);
  }

  set articleList(articleList: IArticle[]) {
    this.innerArticleList = articleList;
  }
}

export const articleStore = new ArticleStore();
