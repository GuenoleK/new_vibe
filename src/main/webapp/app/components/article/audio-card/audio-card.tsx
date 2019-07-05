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
import { articleMediaUtils } from 'app/utils/ArticleMediaUtils';
import { observable, computed, autorun } from 'mobx';
import * as ArticleMediaInterface from 'app/shared/model/article-media.model';

type IArticleMedia = ArticleMediaInterface.IArticleMedia;

@observer
export class AudioCard extends React.Component<{ media: IArticleMedia | undefined }> {
  @observable
  isMusicPlaying = false;

  @observable
  audio: HTMLAudioElement;

  reaction = autorun(async () => {
    if (this.media) {
      this.audio = new Audio(await articleMediaApi.getArticleMediaSrcFile(this.media.id));
      this.audio.addEventListener('ended', this.audioEnded);
    }
  });

  render() {
    return (
      <div data-component="audio-card">
        <Card className="audio-card">
          <div className="content">
            <CardContent>
              <Typography className="audio-name" component="h5" variant="h5">
                {this.audioName}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {this.articleName}
              </Typography>
            </CardContent>
            <div className="media-button-zone">
              <div className="audio-buttons">
                {this.PlayPauseIcon}
                <IconButton disabled={this.media === undefined} onClick={this.stopMusic} aria-label="Stop">
                  <StopIcon />
                </IconButton>
              </div>
            </div>
          </div>
          {/* <CardMedia className="media" image="../static/images/Music-icon.png" /> */}
        </Card>
        <div className="audio-upload-dropzone">
          <Dropzone multiple={false} accept="audio/wav, audio/mpeg, audio/aac, audio/midi, audio/x-midi, audio/mp3" onDrop={this.onDrop}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Fab color="secondary" className="add-audio-button">
                  <AddIcon />
                </Fab>
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
        <IconButton disabled={this.media === undefined} onClick={this.pauseMusic} aria-label="Pause">
          <PauseIcon />
        </IconButton>
      );
    }
    return (
      <IconButton disabled={this.media === undefined} onClick={this.playMusic} aria-label="Play">
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
    if (this.media) {
      await articleMediaApi.updateArticleMedia(acceptedFiles[0], this.media.id);
    } else {
      await articleMediaApi.saveArticleMedia(acceptedFiles[0], this.article.id);
    }

    articleStore.article = await articleApi.getArticle(this.article.id);
    articleMediaStore.articleMediaList = await articleMediaApi.getArticleMediaListByArticleId(this.article.id);
  };

  get filePath() {
    return articleMediaUtils.buildMediaPath(this.props.media);
  }

  playMusic = async () => {
    if (!this.isMusicPlaying) {
      this.audio.play();
      this.isMusicPlaying = true;
    }
  };

  pauseMusic = async () => {
    if (this.isMusicPlaying) {
      this.audio.pause();
      this.isMusicPlaying = false;
    }
  };

  stopMusic = () => {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isMusicPlaying = false;
  };

  @computed
  get media() {
    return this.props.media;
  }

  audioEnded = () => {
    this.audio.currentTime = 0;
    this.isMusicPlaying = false;
  };

  componentWillUnmount() {
    this.stopMusic();
  }
}
