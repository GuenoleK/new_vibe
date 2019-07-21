import React from 'react';
import * as ArticleMediaInterface from 'app/shared/model/article-media.model';
import { observer } from 'mobx-react';
import { AudioCard } from 'app/components/article/audio-card/audio-card';
import './article-audio-list.scss';
import { orderBy } from 'lodash';
import { articleMediaStore } from 'app/stores/article-media-store';

type IArticleMedia = ArticleMediaInterface.IArticleMedia;

@observer
export class AudioCardList extends React.Component<{ audioList: IArticleMedia[] }> {
  render() {
    return <div data-component="audio-list">{this.renderAudioList()}</div>;
  }

  renderAudioList = () => {
    const audioCardList = [];
    if (this.audioList && this.audioList.length > 0) {
      this.audioList.forEach(audio =>
        audioCardList.push(<AudioCard isAMediaLoading={articleMediaStore.isAMediaLoading} key={`audio-card-${audio.id}`} media={audio} />)
      );
    }
    for (let i = 0; i < 4 - this.audioList.length; i++) {
      audioCardList.push(<AudioCard isAMediaLoading={articleMediaStore.isAMediaLoading} key={`empty-audio-card-${i}`} media={undefined} />);
    }
    return <div className="list">{orderBy(audioCardList, ['id'], ['asc'])}</div>;
  };

  get audioList() {
    return this.props.audioList;
  }
}
