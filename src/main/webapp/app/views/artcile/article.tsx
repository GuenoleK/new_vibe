import React from 'react';
import { ArticleCard } from 'app/components/article/article-card/article-card';
import './article.scss';
import { observer } from 'mobx-react';
import { articleMediaApi } from 'app/api/article-media-api';
import { RouteComponentProps } from 'react-router';
import { articleApi } from 'app/api/article-api';
import { articleStore } from 'app/stores/article-store';
import { articleMediaStore } from 'app/stores/article-media-store';
import { computed, observable } from 'mobx';
import { ArticleMediaTypeCodeEnum } from 'app/enums/ArticleMediaTypeCodeEnum';
import { AudioCardList } from './article-audio-list';
import { headerStore } from 'app/stores/header-store';
import { audioStore } from 'app/stores/audio-store';
import { EmptyState } from 'app/components/empty-state/empty-state';
import { translationUtil } from 'app/translation/translation-util';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { roleUtils } from 'app/utils/RoleUtils';
import { Spinner } from 'app/components/spinner/spinner';

@observer
export class ArticleView extends React.Component<RouteComponentProps<any>> {
  @observable
  isLoading = false;

  componentWillMount() {
    headerStore.headerTitle = '';

    // Here clear articleMediaList in the store
    articleStore.article = undefined;
    articleMediaStore.articleMediaList = [];
  }

  async componentDidMount() {
    headerStore.canShowSearchBar = false;
    // Here call the web service that will give the file names
    if (this.articleId) {
      this.isLoading = true;
      articleStore.article = await articleApi.getArticle(this.articleId);
      articleMediaStore.articleMediaList = await articleMediaApi.getArticleMediaListByArticleId(this.articleId);
      this.isLoading = false;
      headerStore.headerTitle = articleStore.article.title;
    }
  }

  // Not called, maybe the router is the cause.
  // TODO: see the problem
  componentWillUnMount() {
    headerStore.headerTitle = '';

    // Here clear articleMediaList in the store
    articleStore.article = undefined;
    articleMediaStore.articleMediaList = [];

    // We stop any music if we change the page
    // And unset the audio element in the store
    if (audioStore.isMusicPlaying) {
      audioStore.stopMusic();
    }
    audioStore.currentPlayingAudio = undefined;
  }

  render() {
    return (
      <div data-component="vibe-article">
        {this.isLoading && <Spinner hasDescription loadingText={translationUtil.translate('loader.description.isLoading')} />}
        {!this.isLoading && this.MediaContent}
      </div>
    );
  }

  get MediaContent() {
    if (articleMediaStore.articleMediaList.length === 0 && !roleUtils.hasRole(roleUtils.rolesForEdition)) {
      return this.ContentEmptyState;
    }
    return (
      <div>
        <ArticleCard isLoadingData={this.isLoading} />
        <div className="audio-list">
          <AudioCardList audioList={this.audioList} />
        </div>
      </div>
    );
  }

  get ContentEmptyState() {
    return (
      <div className="article-content-empty-state">
        <EmptyState
          title={translationUtil.translate('article.detail.content.emptyState.title')}
          description={translationUtil.translate('article.detail.content.emptyState.description')}
          icon={<AssignmentIcon className="file-icon" />}
        />
      </div>
    );
  }

  @computed
  get audioList() {
    return articleMediaStore.articleMediaList.filter(media => media.articleMediaType.code === ArticleMediaTypeCodeEnum.AUDIO);
  }

  get articleId() {
    return this.props.match.params.id;
  }
}
