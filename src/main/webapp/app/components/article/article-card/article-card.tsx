import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './article-card.scss';
import { VibePdfDocument } from 'app/components/article/article-card/vibe-pdf/vibe-pdf';
import { computed } from 'mobx';
import { articleStore } from 'app/stores/article-store';
import { observer } from 'mobx-react';

@observer
export class ArticleCard extends React.Component {
  render() {
    return (
      <Card data-component="article-card">
        <VibePdfDocument />
        {this.article && (
          <CardContent className="content">
            <Typography gutterBottom variant="h5" component="h2">
              {this.article.title}
            </Typography>
            <Typography component="p">{this.article.description}</Typography>
          </CardContent>
        )}
      </Card>
    );
  }

  @computed
  get article() {
    return articleStore.article;
  }
}
