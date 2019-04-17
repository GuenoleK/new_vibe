import React from 'react';
import { ArticleCard } from 'app/components/article/article-card/article-card';
import './article.scss';
import { AudioCard } from 'app/components/article/audio-card/audio-card';

export class ArticleView extends React.Component {
  render() {
    return (
      <div data-component="vibe-article">
        <ArticleCard />

        <div className="audio-list">
          <AudioCard />
          <AudioCard />
          <AudioCard />
          <AudioCard />
        </div>
      </div>
    );
  }
}
