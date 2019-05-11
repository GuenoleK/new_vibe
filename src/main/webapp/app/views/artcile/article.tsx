import React from 'react';
import { ArticleCard } from 'app/components/article/article-card/article-card';
import { AudioCard } from 'app/components/article/audio-card/audio-card';
import './article.scss';
import { observer } from 'mobx-react';
import { articleMediaApi } from 'app/api/article-media-api';
import { RouteComponentProps } from 'react-router';
import { articleApi } from 'app/api/article-api';
import { articleStore } from 'app/stores/article-store';
import { articleMediaStore } from 'app/stores/article-media-store';

@observer
export class ArticleView extends React.Component<RouteComponentProps<any>> {
  render() {
    return (
      <div data-component="vibe-article">
        <ArticleCard />
        <div className="audio-list">
          <AudioCard name="Général" />
          <AudioCard name="Soprano" />
          <AudioCard name="Alto" />
          <AudioCard name="Ténor" />
        </div>
      </div>
    );
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
