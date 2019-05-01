import * as ArticleInterface from 'app/shared/model/article.model';
import { computed, observable } from 'mobx';

type IArticle = ArticleInterface.IArticle;

class ArticleStore {
  @observable
  private innerArticleList: IArticle[] = [];

  @computed
  get articleList(): IArticle[] {
    return this.innerArticleList;
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
