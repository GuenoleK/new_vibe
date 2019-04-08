import React from 'react';
import { Card, Typography, CardContent, IconButton, CardMedia } from '@material-ui/core';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import './audio-card.scss';

export class AudioCard extends React.Component {
  render() {
    return (
      <Card data-component="audio-card">
        <div>
          <CardContent>
            <Typography component="h5" variant="h5">
              Live From Space
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Mac Miller
            </Typography>
          </CardContent>
          <div>
            <IconButton aria-label="Previous">
              <SkipPreviousIcon />
            </IconButton>
            <IconButton aria-label="Play/pause">
              <PlayArrowIcon />
            </IconButton>
            <IconButton aria-label="Next">
              <SkipNextIcon />
            </IconButton>
          </div>
        </div>
        <CardMedia className="media" image="https://material-ui.com/static/images/cards/live-from-space.jpg" />
      </Card>
    );
  }
}
