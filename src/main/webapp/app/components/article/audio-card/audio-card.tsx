import React from 'react';
import { Card, Typography, CardContent, IconButton, CardMedia, Fab } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import './audio-card.scss';
import { articleStore } from 'app/stores/article-store';
import { observer } from 'mobx-react';
import AddIcon from '@material-ui/icons/Add';
import Dropzone from 'react-dropzone';
import { articleMediaApi } from 'app/api/article-media-api';
import { articleMediaStore } from 'app/stores/article-media-store';
import { articleApi } from 'app/api/article-api';
import * as ArticleMediaInterface from 'app/shared/model/article-media.model';
import { articleMediaUtils } from 'app/utils/ArticleMediaUtils';
import { observable, computed } from 'mobx';

type IArticleMedia = ArticleMediaInterface.IArticleMedia;

@observer
export class AudioCard extends React.Component<{ media: IArticleMedia | undefined }> {
  @observable
  isMusicPlaying = false;

  @observable
  audio: HTMLAudioElement;

  render() {
    return (
      <div data-component="audio-card">
        <Card className="audio-card">
          <div>
            <CardContent>
              <Typography className="audio-name" component="h5" variant="h5">
                {this.audioName}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {this.articleName}
              </Typography>
            </CardContent>
            <div className="media-button-zone">
              {this.props.media && (
                <div className="audio-buttons">
                  {this.PlayPauseIcon}
                  <IconButton onClick={this.stopMusic} aria-label="Stop">
                    <StopIcon />
                  </IconButton>
                </div>
              )}
            </div>
          </div>
          <CardMedia className="media" image="../static/images/Music-icon.png" />
        </Card>
        <div className="audio-upload-dropzone">
          <Dropzone multiple={false} accept="audio/wav, audio/mpeg, audio/aac, audio/midi, audio/x-midi, audio/mp3" onDrop={this.onDrop}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Fab color="secondary" className="add-audio-button">
                  <AddIcon />
                </Fab>
                {/* {isDragActive ? "Drop it like it's hot!" : 'Click me or drag a file to upload!'} */}
              </div>
            )}
          </Dropzone>
        </div>
      </div>
    );
  }

  get PlayPauseIcon() {
    if (this.isMusicPlaying) {
      return (
        <IconButton onClick={this.pauseMusic} aria-label="Pause">
          <PauseIcon />
        </IconButton>
      );
    }
    return (
      <IconButton onClick={this.playMusic} aria-label="Play">
        <PlayArrowIcon />
      </IconButton>
    );
  }

  get audioName() {
    if (this.props.media) {
      return articleMediaUtils.processArticleMediaName(this.props.media);
    }
    return 'Audio à uploader';
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

  get filePath() {
    return articleMediaUtils.buildMediaPath(this.props.media);
  }

  @computed
  get audioFile(): HTMLAudioElement {
    if (this.media && this.audio !== undefined) {
      return this.audio;
    }
    this.audio = new Audio(require(`D:/zz_perso/vibe-files/${this.filePath}`));
    return this.audio;
  }

  playMusic = () => {
    if (!this.isMusicPlaying) {
      this.audioFile.play();
      this.isMusicPlaying = true;
    }
  };

  pauseMusic = () => {
    if (this.isMusicPlaying) {
      this.audioFile.pause();
      this.isMusicPlaying = false;
    }
  };

  stopMusic = () => {
    this.audioFile.pause();
    this.audioFile.currentTime = 0;
    this.isMusicPlaying = false;
    console.log(this.audioFile, this.isMusicPlaying);
  };

  @computed
  get media() {
    return this.props.media;
  }
}
