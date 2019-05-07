import React from 'react';
import { CardContainer } from 'app/components/layout-components/card-container/card-container';
import { articleApi } from 'app/api/article-api';
import { articleStore } from 'app/stores/article-store';
import { observer } from 'mobx-react';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import './style.scss';
import { observable } from 'mobx';
import { CreateArticleDialog } from './create-article-dialog';

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
          <CreateArticleDialog isPopinOpen={this.isPopinOpen} closePopin={this.closePopin} />
        </div>
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
