import React from 'react';
import { CardContainer } from 'app/components/layout-components/card-container/card-container';
import { articleApi } from 'app/api/article-api';
import { articleStore } from 'app/stores/article-store';
import { observer } from 'mobx-react';
import { Button, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import './style.scss';
import { observable } from 'mobx';
import { VibeDialog } from 'app/components/vibe-dialog/vibe-dialog';
import Dropzone from 'react-dropzone';

@observer
export class ArticleListView extends React.Component {
  @observable
  isPopinOpen = false;

  render() {
    return (
      <div data-component="article-list">
        <CardContainer />
        <div id="create-article-button" className="hide">
          <Button onClick={this.openPopin} className="create-button" color="primary" variant="extendedFab">
            <AddIcon className="add-icon" />
            <div className="button-text">Créer un article</div>
          </Button>
        </div>
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
              label="Nom de l'article"
              margin="normal"
              variant="outlined"
              style={{ marginTop: 'unset' }}
              required
            />
            <TextField className="article-description" label="Description" margin="normal" variant="outlined" multiline rows={4} required />
            <div className="file-upload-zone">
              {/* PDF DROPZONE */}
              <div className="upload-dropzone">
                <Dropzone accept="application/pdf" onDrop={this.onDrop}>
                  {({ getRootProps, getInputProps, isDragActive }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="label">Paroles du chant (PDF)</div>
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
                <Dropzone accept="audio/wav, audio/mpeg, audio/aac, audio/midi, audio/x-midi, audio/mp3" onDrop={this.onDrop}>
                  {({ getRootProps, getInputProps, isDragActive }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="label">Audio du chant (TOUS)</div>
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
      </div>
    );
  }

  onDrop = (acceptedFiles: any, rejectedFiles: any) => {
    console.log(acceptedFiles, rejectedFiles);
  };

  get CreateArticleButtons() {
    return (
      <div>
        <Button onClick={this.closePopin} color="primary">
          Annuler
        </Button>
        <Button onClick={this.closePopin} color="primary">
          Créer
        </Button>
      </div>
    );
  }

  openPopin = () => {
    this.isPopinOpen = true;
  };

  closePopin = () => {
    this.isPopinOpen = false;
  };

  componentWillMount() {
    articleApi.getArticleListByStructureId(0);
  }

  componentDidMount() {
    setTimeout(() => {
      const t = document.getElementById('create-article-button');
      t.className = 'show';
    }, 500);
  }

  componentWillUnmount() {
    articleStore.articleList = [];
  }
}
