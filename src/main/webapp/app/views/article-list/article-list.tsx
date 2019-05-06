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
        <VibeDialog Buttons={this.CreateArticleButtons} title="Créer un article" close={this.closePopin} isOpen={this.isPopinOpen}>
          <div style={{ display: 'flex' }} className="create-article-content">
            <div
              className="left-block"
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginRight: '20px'
              }}
            >
              <TextField label="Nom de l'article" margin="normal" variant="outlined" style={{ marginTop: 'unset' }} required />

              <TextField label="Description" margin="normal" variant="outlined" multiline rows={2} required />
            </div>
            <div className="right-block">
              <Dropzone accept="application/pdf, audio/wav, audio/mpeg, audio/aac, audio/midi, audio/x-midi" onDrop={this.onDrop}>
                {({ getRootProps, getInputProps, isDragActive }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragActive ? "Drop it like it's hot!" : 'Click me or drag a file to upload!'}
                  </div>
                )}
              </Dropzone>
            </div>
          </div>
        </VibeDialog>
      </div>
    );
  }

  onDrop = (acceptedFiles: any) => {
    console.log(acceptedFiles);
  };

  get CreateArticleButtons() {
    return (
      <div>
        <Button onClick={this.closePopin} color="primary">
          Disagree
        </Button>
        <Button onClick={this.closePopin} color="primary">
          Agree
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
