import React from 'react';
import { Card, Typography, CardContent, IconButton, Fab, LinearProgress, Menu, MenuItem } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
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
import { observable, computed, autorun, action } from 'mobx';
import * as ArticleMediaInterface from 'app/shared/model/article-media.model';
import { audioStore } from 'app/stores/audio-store';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Spinner } from 'app/components/spinner/spinner';

type IArticleMedia = ArticleMediaInterface.IArticleMedia;

interface IAudioCardProps {
  media: IArticleMedia | undefined;
  isAMediaLoading: boolean;
}

@observer
export class AudioCard extends React.Component<IAudioCardProps> {
  @observable
  audio: HTMLAudioElement;

  @observable
  completed = 0;

  @observable
  isMenuOpen = false;

  @observable
  menuAnchorElement: any;

  @observable
  isLoading = false;

  reaction = autorun(async () => {
    if (this.media) {
      this.audio = new Audio(await articleMediaApi.getArticleMediaSrcFile(this.media.id));
      this.audio.addEventListener('ended', audioStore.audioEnded);
      this.audio.ontimeupdate = () => (this.completed = this.setCompleted());
    }
  });

  render() {
    return (
      <div data-component="audio-card">
        <Card className="audio-card">
          <div className="content">
            <CardContent>
              <div className="card-header">
                <div className="information-zone">
                  <Typography className="audio-name" component="h5" variant="h5">
                    {this.audioName}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {this.articleName}
                  </Typography>
                </div>
                {this.media && (
                  <div className="audio-menu">
                    <input
                      id="upload-updated-audio"
                      multiple={false}
                      type="file"
                      accept="audio/wav, audio/mpeg, audio/aac, audio/midi, audio/x-midi, audio/mp3"
                      onChange={this.onAudioChange}
                    />
                    <IconButton
                      disabled={this.isLoading || this.props.isAMediaLoading}
                      className="article-more-button"
                      onClick={this.openMenu}
                    >
                      <MoreVertIcon className="article-more-icon" />
                      <Menu
                        open={this.isMenuOpen}
                        anchorEl={this.menuAnchorElement}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right'
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right'
                        }}
                      >
                        <MenuItem onClick={this.onChangeAudioSelected}>Modifier l'audio</MenuItem>
                        <MenuItem onClick={this.deleteFile}>Supprimer l'audio</MenuItem>
                      </Menu>
                    </IconButton>
                  </div>
                )}
              </div>
            </CardContent>
            <div className="media-button-zone">
              <div className="audio-buttons">
                {this.PlayPauseIcon}
                <IconButton disabled={this.isLoading || this.isMediaButtonDisabled} onClick={audioStore.stopMusic} aria-label="Stop">
                  <StopIcon />
                </IconButton>
              </div>
              {this.isLoading && <Spinner hasDescription={false} />}
              {!this.isLoading &&
                this.audio && (
                  <div className="audio-slider">
                    <Slider className="slider" value={this.completed} onChange={this.handleChange} aria-labelledby="continuous-slider" />
                  </div>
                )}
            </div>
            {/* <LinearProgress variant="determinate" value={this.completed} /> */}
          </div>
          {/* <CardMedia className="media" image="../static/images/Music-icon.png" /> */}
        </Card>
        {!this.media && (
          <div className="audio-upload-dropzone">
            <Dropzone
              disabled={this.props.isAMediaLoading}
              multiple={false}
              accept="audio/wav, audio/mpeg, audio/aac, audio/midi, audio/x-midi, audio/mp3"
              onDrop={this.onDrop}
            >
              {({ getRootProps, getInputProps, isDragActive }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Fab disabled={this.props.isAMediaLoading} color="secondary" className="add-audio-button">
                    <AddIcon />
                  </Fab>
                </div>
              )}
            </Dropzone>
          </div>
        )}
      </div>
    );
  }

  handleChange = (event, newValue) => {
    this.audio.currentTime = Math.floor((this.audio.duration * newValue) / 100);
  };

  setCompleted = () => {
    if (this.audio) {
      return (this.audio.currentTime * 100) / this.audio.duration;
    }
    return 0;
  };

  get isMediaButtonDisabled() {
    return !this.media || !this.audio || this.isLoading;
  }

  get PlayPauseIcon() {
    if (audioStore.isMusicPlaying && audioStore.currentPlayingAudio === this.audio) {
      return (
        <IconButton disabled={this.isMediaButtonDisabled} onClick={audioStore.pauseMusic} aria-label="Pause">
          <PauseIcon />
        </IconButton>
      );
    }
    return (
      <IconButton disabled={this.isMediaButtonDisabled} onClick={this.playMusic} aria-label="Play">
        <PlayArrowIcon />
      </IconButton>
    );
  }

  playMusic = () => {
    audioStore.playMusic(this.audio);
  };

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

  @action
  onDrop = async acceptedFiles => {
    this.isLoading = true;
    articleMediaStore.isAMediaLoading = this.isLoading;
    if (this.media) {
      await articleMediaApi.updateArticleMedia(acceptedFiles[0], this.media.id);
    } else {
      await articleMediaApi.saveArticleMedia(acceptedFiles[0], this.article.id);
    }

    articleStore.article = await articleApi.getArticle(this.article.id);
    articleMediaStore.articleMediaList = await articleMediaApi.getArticleMediaListByArticleId(this.article.id);
    this.isLoading = false;
    articleMediaStore.isAMediaLoading = this.isLoading;
  };

  get filePath() {
    return articleMediaUtils.buildMediaPath(this.props.media);
  }

  @computed
  get media() {
    return this.props.media;
  }

  openMenu = event => {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuAnchorElement = event.currentTarget;
  };

  onAudioChange = e => {
    if (e.target.files.length > 0) {
      this.onDrop(e.target.files);
    }
  };

  onChangeAudioSelected = () => {
    const input = document.querySelector('#upload-updated-audio') as HTMLElement;
    if (input) {
      input.click();
    }
  };

  deleteFile = async () => {
    this.isLoading = true;
    articleMediaStore.isAMediaLoading = this.isLoading;
    if (this.media) {
      await articleMediaApi.deleteArticleMedia(this.media.id);
    }
    articleStore.article = await articleApi.getArticle(this.article.id);
    articleMediaStore.articleMediaList = await articleMediaApi.getArticleMediaListByArticleId(this.article.id);
    this.isLoading = false;
    articleMediaStore.isAMediaLoading = this.isLoading;
  };
}
