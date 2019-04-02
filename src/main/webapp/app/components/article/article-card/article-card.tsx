import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import { AudioCard } from 'app/components/article/audio-card/audio-card';
import './article-card.scss';

export class ArticleCard extends React.Component {
  render() {
    return (
      <Card data-component="article-card">
        <CardMedia className="media" image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg" />
        <CardContent className="content">
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
          </Typography>

          <AudioCard />
        </CardContent>
      </Card>
    );
  }
}
