import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import { ButtonLink } from 'app/components/button-link/button-link';
import React from 'react';
import { Link } from 'react-router-dom';
import './vibe-card.scss';

export class VibeCard extends React.Component {
  render() {
    return (
      <Card data-component="vibe-card">
        <Link to="/article/2">
          <CardActionArea>
            <CardMedia className="media" image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg" />
          </CardActionArea>
        </Link>
        <CardContent className="content">
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions className="actions">
          <div className="button-actions">
            <ButtonLink buttonClassName="card-consult-button" label="Voir" link="/article/2" />
          </div>
        </CardActions>
      </Card>
    );
  }
}
