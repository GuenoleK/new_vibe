import * as ArticleInterface from 'app/shared/model/article.model';
import { computed, observable } from 'mobx';
import { orderBy } from 'lodash';

type IArticle = ArticleInterface.IArticle;

class ArticleStore {
  @observable
  private innerArticleList: IArticle[] = [];

  @computed
  get articleList(): IArticle[] {
    return orderBy(this.innerArticleList, ['title'], ['asc']);
  }

  set articleList(articleList: IArticle[]) {
    this.innerArticleList = articleList;
  }

  @observable
  private innerArticle: IArticle;

  @computed
  get article(): IArticle {
    return this.innerArticle;
  }

  set article(article: IArticle) {
    this.innerArticle = article;
  }
}

export const articleStore = new ArticleStore();
