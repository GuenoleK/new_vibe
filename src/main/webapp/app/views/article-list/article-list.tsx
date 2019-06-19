import React from 'react';
import { CardContainer } from 'app/components/layout-components/card-container/card-container';
import { articleApi } from 'app/api/article-api';
import { articleStore } from 'app/stores/article-store';
import { observer } from 'mobx-react';
import { Button, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import './style.scss';
import { observable } from 'mobx';
import { CreateArticleDialog } from './create-article-dialog';
import { userStore } from 'app/stores/user-store';
import { headerStore } from 'app/stores/header-store';

@observer
export class ArticleListView extends React.Component {
  @observable
  isPopinOpen = false;

  @observable
  isButtonClicked = false;

  render() {
    return (
      <div data-component="article-list">
        <CardContainer />
        <div id="create-article-button" className="hide" data-is-clicked={this.isButtonClicked}>
          {this.CreateArticleButton}
          <CreateArticleDialog isPopinOpen={this.isPopinOpen} closePopin={this.closePopin} />
        </div>
      </div>
    );
  }

  get CreateArticleButton() {
    if (window.innerWidth > 999) {
      return (
        <Fab onClick={this.openPopin} className="create-button" color="primary" variant="extended">
          <AddIcon className="add-icon" />
          <div className="button-text">Créer un article</div>
        </Fab>
      );
    }

    return (
      <Fab onClick={this.openPopin} color="primary">
        <AddIcon className="add-icon" />
      </Fab>
    );
  }

  openPopin = () => {
    this.isButtonClicked = true;

    setTimeout(() => {
      this.isPopinOpen = true;
      this.isButtonClicked = false;
    }, 260);
  };

  closePopin = () => {
    this.isPopinOpen = false;
  };

  async componentDidMount() {
    if (userStore.isConnected) {
      headerStore.canShowSearchBar = true;
    }

    window.scroll(0, 0);
    articleStore.articleList = await articleApi.getArticleListByStructureId(userStore.extendedUser.currentStructure.id);
    articleStore.searchableArticleList = articleStore.articleList;

    setTimeout(() => {
      const t = document.getElementById('create-article-button');
      t.className = 'show';
    }, 801);
  }

  componentWillUnmount() {
    articleStore.articleList = [];
    articleStore.searchableArticleList = [];
  }
}
