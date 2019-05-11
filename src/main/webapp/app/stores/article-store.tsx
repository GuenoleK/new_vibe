import * as ArticleInterface from 'app/shared/model/article.model';
import { computed, observable } from 'mobx';
import { orderBy } from 'lodash';

type IArticle = ArticleInterface.IArticle;

class ArticleStore {
  @observable
  private innerArticleList: IArticle[] = [];

  @observable
  private innerSearchableArticleList: IArticle[] = [];

  @computed
  get searchableArticleList(): IArticle[] {
    return orderBy(this.innerSearchableArticleList, ['title'], ['asc']);
  }

  set searchableArticleList(searchableArticleList: IArticle[]) {
    this.innerSearchableArticleList = searchableArticleList;
  }

  @computed
  get articleList(): IArticle[] {
    return orderBy(this.innerArticleList, ['title'], ['asc']);
  }

  /**
   * Can only change when:
   * The list is loaded
   * We add an article
   * We remove an article
   *
   */
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
