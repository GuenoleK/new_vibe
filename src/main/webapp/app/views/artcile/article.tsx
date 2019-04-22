import React from 'react';
import { ArticleCard } from 'app/components/article/article-card/article-card';
import { AudioCard } from 'app/components/article/audio-card/audio-card';
import './article.scss';
import { observer } from 'mobx-react';

@observer
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

  componentWillMount() {
    // Here call the web service that will give the file names
  }
}
