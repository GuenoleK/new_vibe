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
import { IActivateProps } from 'app/modules/account/activate/activate';

type IArticle = ArticleInterface.IArticle;

interface ICreateArticleDialogProps {
  isPopinOpen: boolean;
  closePopin: () => void;
  routerProps: IActivateProps;
}

@observer
export class CreateArticleDialog extends React.Component<ICreateArticleDialogProps> {
  defaultValue: IArticle = {
    title: '',
    description: ''
  };

  @observable
  article: IArticle = this.defaultValue;

  @observable
  isLoading = false;

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

  get CreateArticleButtons() {
    return (
      <div>
        <Button disabled={this.isLoading} onClick={this.closePopin} color="primary">
          {translationUtil.translate('createArticlePopin.buttons.cancel')}
        </Button>
        <Button disabled={this.isLoading} onClick={this.saveArticle} color="primary">
          {translationUtil.translate('createArticlePopin.buttons.create')}
        </Button>
      </div>
    );
  }

  saveArticle = () => {
    this.isLoading = true;
    articleApi.saveArticle(this.article).then(article => {
      setTimeout(() => {
        articleApi.getArticleListByStructureId(userStore.extendedUser.currentStructure.id).then(articleList => {
          articleStore.articleList = articleList;
          articleStore.searchableArticleList = articleList;

          this.props.routerProps.history.push(`/article/${article.id}`);
          this.closePopin();
          this.isLoading = false;
        });
      }, 100);
    });
  };
}
