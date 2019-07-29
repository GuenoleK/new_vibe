import React from 'react';
import { VibeDialog } from 'app/components/vibe-dialog/vibe-dialog';
import { articleApi } from 'app/api/article-api';
import { observable, toJS, action } from 'mobx';
import Dropzone from 'react-dropzone';
import * as ArticleInterface from 'app/shared/model/article.model';
import { TextField, Button, Fab } from '@material-ui/core';
import { observer } from 'mobx-react';
import { articleStore } from 'app/stores/article-store';
import { userStore } from 'app/stores/user-store';
import { articleMediaApi } from 'app/api/article-media-api';
import { translationUtil } from 'app/translation/translation-util';

type IArticle = ArticleInterface.IArticle;

interface ICreateArticleDialogProps {
  isPopinOpen: boolean;
  closePopin: () => void;
}

@observer
export class CreateArticleDialog extends React.Component<ICreateArticleDialogProps> {
  defaultValue: IArticle = {
    title: '',
    description: ''
  };

  @observable
  articleMediaFileList = [];

  @observable
  article: IArticle = this.defaultValue;

  render() {
    return (
      <VibeDialog
        className="create-article-dialog"
        Buttons={this.CreateArticleButtons}
        title={translationUtil.translate('createArticlePopin.header.title')}
        close={this.closePopin}
        isOpen={this.isPopinOpen}
      >
        <div className="create-article-content">
          <TextField
            className="article-name"
            label={translationUtil.translate('createArticlePopin.fields.songName')}
            margin="normal"
            variant="outlined"
            style={{ marginTop: 'unset' }}
            onChange={this.onChange('title')}
            value={this.article.title}
            required
          />

          <TextField
            className="article-description"
            label={translationUtil.translate('createArticlePopin.fields.description')}
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
            onChange={this.onChange('description')}
            value={this.article.description}
          />

          <div className="file-upload-zone">
            {/* PDF DROPZONE */}
            <div className="upload-dropzone">
              <div className="label">{translationUtil.translate('createArticlePopin.uploadZone.lyrics.label')}</div>
              <Dropzone multiple={false} accept="application/pdf" onDrop={this.onDrop}>
                {({ getRootProps, getInputProps, isDragActive }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Fab size="small" variant="extended" color="primary">
                      {translationUtil.translate('createArticlePopin.buttons.upload')}
                    </Fab>
                    {/* {isDragActive ? "Drop it like it's hot!" : 'Click me or drag a file to upload!'} */}
                  </div>
                )}
              </Dropzone>
            </div>

            {/* Voix */}
            <div className="upload-dropzone">
              <div className="label">{translationUtil.translate('createArticlePopin.uploadZone.audio.label')}</div>
              <Dropzone accept="audio/*" onDrop={this.onDrop}>
                {({ getRootProps, getInputProps, isDragActive }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Fab size="small" variant="extended" color="primary">
                      {translationUtil.translate('createArticlePopin.buttons.upload')}
                    </Fab>
                    {/* {isDragActive ? "Drop it like it's hot!" : 'Click me or drag a file to upload!'} */}
                  </div>
                )}
              </Dropzone>
            </div>
          </div>
        </div>
      </VibeDialog>
    );
  }

  get isPopinOpen() {
    return this.props.isPopinOpen;
  }

  get closePopin() {
    return this.props.closePopin;
  }

  @action
  onChange = (name: 'title' | 'description') => event => {
    this.article[name] = event.target.value;
  };

  onDrop = (acceptedFiles: any, rejectedFiles: any) => {
    this.articleMediaFileList = [...this.articleMediaFileList, ...acceptedFiles];
  };

  get CreateArticleButtons() {
    return (
      <div>
        <Button onClick={this.closePopin} color="primary">
          {translationUtil.translate('createArticlePopin.buttons.cancel')}
        </Button>
        <Button onClick={this.saveArticle} color="primary">
          {translationUtil.translate('createArticlePopin.buttons.create')}
        </Button>
      </div>
    );
  }

  saveArticle = () => {
    articleApi.saveArticle(this.article).then(article => {
      articleMediaApi.saveArticleMediaMultiple(this.articleMediaFileList, article.id, false);
      this.articleMediaFileList = [];
      this.article = this.defaultValue;
      this.closePopin();

      setTimeout(() => {
        articleApi.getArticleListByStructureId(userStore.extendedUser.currentStructure.id).then(articleList => {
          articleStore.articleList = articleList;
          articleStore.searchableArticleList = articleList;
        });
      }, 100);
    });
  };
}
