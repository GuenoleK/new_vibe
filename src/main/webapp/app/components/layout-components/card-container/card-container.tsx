import React from 'react';
import './card-container.scss';
import { VibeCard } from '../card/vibe-card';
import { articleStore } from 'app/stores/article-store';
import { observer } from 'mobx-react';
import { computed } from 'mobx';

@observer
export class CardContainer extends React.Component {
  render() {
    return <div data-component="card-container">{this.ArticleList}</div>;
  }

  @computed
  get ArticleList() {
    return (
      <div>
        {articleStore.searchableArticleList.map((article, idx) => (
          <VibeCard article={article} key={`article-list-card-${idx}`} />
        ))}
      </div>
    );
  }
}
