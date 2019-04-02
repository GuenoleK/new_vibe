import React from 'react';
import { ArticleCard } from 'app/components/article/article-card/article-card';
import './article.scss';

export class ArticleView extends React.Component {
  render() {
    return (
      <div data-component="vibe-article">
        <ArticleCard />
      </div>
    );
  }
}
