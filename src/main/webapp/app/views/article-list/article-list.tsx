import React from 'react';
import { CardContainer } from 'app/components/layout-components/card-container/card-container';
import { articleApi } from 'app/api/article-api';
import { articleStore } from 'app/stores/article-store';
import { observer } from 'mobx-react';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import './style.scss';
import { observable, computed } from 'mobx';
import { CreateArticleDialog } from './create-article-dialog';
import { userStore } from 'app/stores/user-store';
import { headerStore } from 'app/stores/header-store';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

@observer
export class ArticleListView extends React.Component {
  @observable
  isPopinOpen = false;

  @observable
  isButtonClicked = false;

  @observable
  showArrow = false;

  render() {
    return (
      <div data-component="article-list" data-has-list={articleStore.articleList.length > 0}>
        {this.ArticleList}
        {articleStore.articleList.length === 0 && this.ArrowIcon}
        <div id="create-article-button" className="hide" data-is-clicked={this.isButtonClicked}>
          {this.CreateArticleButton}
          <CreateArticleDialog isPopinOpen={this.isPopinOpen} closePopin={this.closePopin} />
        </div>
      </div>
    );
  }

  get ArrowIcon() {
    if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
      return <ArrowForwardIcon className="arrow-forward-icon" data-show-arrow={this.showArrow} />;
    }
    return <ArrowDownwardIcon className="down-arrow" data-show-arrow={this.showArrow} />;
  }

  @computed
  get ArticleList() {
    if (articleStore.searchableArticleList.length > 0) {
      return <CardContainer />;
    }
    return this.EmptyState;
  }

  get EmptyState() {
    return (
      <div data-component="empty-state">
        <AssignmentIcon className="file-icon" />
        <div className="title">Aucun contenu</div>
        <div className="description">
          <div className="text">
            <div>Vous pouvez créer un nouvel article grâce au bouton situé au bas de la page.</div>
          </div>
        </div>
      </div>
    );
  }

  get CreateArticleButton() {
    if (!navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
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
    if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
      this.isButtonClicked = true;
      setTimeout(() => {
        this.isPopinOpen = true;
      }, 100);

      setTimeout(() => {
        this.isButtonClicked = false;
      }, 610);
    } else {
      this.isPopinOpen = true;
    }
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
    }, 250);

    setTimeout(() => {
      if (articleStore.articleList.length === 0) {
        this.showArrow = true;
      }
    }, 650);
  }

  componentWillUnmount() {
    articleStore.articleList = [];
    articleStore.searchableArticleList = [];
  }
}
