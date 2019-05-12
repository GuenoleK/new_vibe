import React from 'react';
import { ArticleCard } from 'app/components/article/article-card/article-card';
import './article.scss';
import { observer } from 'mobx-react';
import { articleMediaApi } from 'app/api/article-media-api';
import { RouteComponentProps } from 'react-router';
import { articleApi } from 'app/api/article-api';
import { articleStore } from 'app/stores/article-store';
import { articleMediaStore } from 'app/stores/article-media-store';
import { computed, toJS } from 'mobx';
import { ArticleMediaTypeCodeEnum } from 'app/enums/ArticleMediaTypeCodeEnum';
import { AudioCardList } from './article-audio-list';

@observer
export class ArticleView extends React.Component<RouteComponentProps<any>> {
  render() {
    return (
      <div data-component="vibe-article">
        <ArticleCard />
        <div className="audio-list">
          <AudioCardList audioList={this.audioList} />
        </div>
      </div>
    );
  }

  @computed
  get audioList() {
    return articleMediaStore.articleMediaList.filter(media => media.articleMediaType.code === ArticleMediaTypeCodeEnum.AUDIO);
  }

  get articleId() {
    return this.props.match.params.id;
  }
  async componentDidMount() {
    // Here call the web service that will give the file names
    if (this.articleId) {
      articleStore.article = await articleApi.getArticle(this.articleId);
      articleMediaStore.articleMediaList = await articleMediaApi.getArticleMediaListByArticleId(this.articleId);
    }
  }

  componentWillUnMount() {
    // Here clear articleMediaList in the store
    articleStore.article = undefined;
    articleMediaStore.articleMediaList = [];
  }
}
