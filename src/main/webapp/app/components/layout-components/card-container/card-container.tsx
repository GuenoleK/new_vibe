import React from 'react';
import './card-container.scss';
import { VibeCard } from '../card/vibe-card';
import { articleStore } from 'app/stores/article-store';
import { observer } from 'mobx-react';

@observer
export class CardContainer extends React.Component {
  render() {
    return <div data-component="card-container">{this.ArticleList}</div>;
  }

  get ArticleList() {
    if (articleStore.articleList.length > 0) {
      return <VibeCard />;
    }
    return <div />;
  }
}
