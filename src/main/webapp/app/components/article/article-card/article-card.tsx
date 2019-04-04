import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './article-card.scss';
import { VibePdfDocument } from 'app/components/article/article-card/vibe-pdf/vibe-pdf';

export class ArticleCard extends React.Component {
  render() {
    return (
      <Card data-component="article-card">
        <VibePdfDocument />
        <CardContent className="content">
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
