import React from 'react';
import { CardContainer } from 'app/components/layout-components/card-container/card-container';
import { articleApi } from 'app/api/article-api';
import { articleStore } from 'app/stores/article-store';
import { observer } from 'mobx-react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Zoom, Divider, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import './style.scss';
import { observable } from 'mobx';
import { SpoccDialog } from './spocc-dialog';

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
            Créer un article
          </Button>
        </div>
        <SpoccDialog close={this.closePopin} isOpen={this.isPopinOpen} />
      </div>
    );
  }

  openPopin = () => {
    this.isPopinOpen = true;
    console.log('GO', this.isPopinOpen);
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
