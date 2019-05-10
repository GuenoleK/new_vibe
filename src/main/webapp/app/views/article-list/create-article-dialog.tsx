import React from 'react';
import { VibeDialog } from 'app/components/vibe-dialog/vibe-dialog';
import { articleApi } from 'app/api/article-api';
import { observable, toJS, action } from 'mobx';
import Dropzone from 'react-dropzone';
import * as ArticleInterface from 'app/shared/model/article.model';
import { TextField, Button } from '@material-ui/core';
import { observer } from 'mobx-react';
import { articleStore } from 'app/stores/article-store';
import { userStore } from 'app/stores/user-store';
import { articleMediaApi } from 'app/api/article-media-api';

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
        title="Créer un article"
        close={this.closePopin}
        isOpen={this.isPopinOpen}
      >
        <div className="create-article-content">
          <TextField
            className="article-name"
            label="Nom de la chanson"
            margin="normal"
            variant="outlined"
            style={{ marginTop: 'unset' }}
            onChange={this.onChange('title')}
            value={this.article.title}
            required
          />

          <TextField
            className="article-description"
            label="Description"
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
              <div className="label">Paroles du chant (PDF)</div>
              <Dropzone accept="application/pdf" onDrop={this.onDrop}>
                {({ getRootProps, getInputProps, isDragActive }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Button size="small" variant="extendedFab" color="primary">
                      Charger
                    </Button>
                    {/* {isDragActive ? "Drop it like it's hot!" : 'Click me or drag a file to upload!'} */}
                  </div>
                )}
              </Dropzone>
            </div>

            {/* Voix */}
            <div className="upload-dropzone">
              <div className="label">Audio du chant (TOUS)</div>
              <Dropzone accept="audio/wav, audio/mpeg, audio/aac, audio/midi, audio/x-midi, audio/mp3" onDrop={this.onDrop}>
                {({ getRootProps, getInputProps, isDragActive }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Button size="small" variant="extendedFab" color="primary">
                      Charger
                    </Button>
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
          Annuler
        </Button>
        <Button onClick={this.saveArticle} color="primary">
          Créer
        </Button>
      </div>
    );
  }

  saveArticle = () => {
    articleApi.saveArticle(this.article).then(article => {
      this.articleMediaFileList.forEach(articleMediaFile => {
        articleMediaApi.saveArticleMedia(articleMediaFile, article.id);
      });
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
