import React from 'react';
import { Card, Typography, CardContent, IconButton, CardMedia, Button } from '@material-ui/core';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import './audio-card.scss';
import { articleStore } from 'app/stores/article-store';
import { observer } from 'mobx-react';
import AddIcon from '@material-ui/icons/Add';
import Dropzone from 'react-dropzone';
import { articleMediaApi } from 'app/api/article-media-api';
import { articleMediaStore } from 'app/stores/article-media-store';
import { articleApi } from 'app/api/article-api';

@observer
export class AudioCard extends React.Component<{ name: string }> {
  render() {
    return (
      <div data-component="audio-card">
        <Card className="audio-card">
          <div>
            <CardContent>
              <Typography component="h5" variant="h5">
                {this.props.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {this.articleName}
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
          <CardMedia className="media" image="../static/images/Music-icon.png" />
        </Card>
        <div className="audio-upload-dropzone">
          <Dropzone multiple={false} accept="audio/wav, audio/mpeg, audio/aac, audio/midi, audio/x-midi, audio/mp3" onDrop={this.onDrop}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Button color="secondary" variant="fab" className="add-audio-button">
                  <AddIcon />
                </Button>
                {/* {isDragActive ? "Drop it like it's hot!" : 'Click me or drag a file to upload!'} */}
              </div>
            )}
          </Dropzone>
        </div>
      </div>
    );
  }

  get article() {
    return articleStore.article;
  }

  get articleName() {
    return this.article ? this.article.title : '';
  }

  onDrop = async acceptedFiles => {
    await articleMediaApi.saveArticleMedia(acceptedFiles[0], this.article.id);
    articleStore.article = await articleApi.getArticle(this.article.id);
    articleMediaStore.articleMediaList = await articleMediaApi.getArticleMediaListByArticleId(this.article.id);
  };
}
