import React from 'react';
import * as ArticleMediaInterface from 'app/shared/model/article-media.model';
import { observer } from 'mobx-react';
import { AudioCard } from 'app/components/article/audio-card/audio-card';
import { articleMediaUtils } from 'app/utils/ArticleMediaUtils';
import './article-audio-list.scss';

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
        audioCardList.push(<AudioCard key={`audio-card-${audio.id}`} name={articleMediaUtils.processArticleMediaName(audio)} />)
      );
    }
    for (let i = 0; i < 4 - this.audioList.length; i++) {
      audioCardList.push(<AudioCard key={`empty-audio-card-${i}`} name="Audio à uploader" />);
    }
    return <div className="list">{audioCardList}</div>;
  };

  get audioList() {
    return this.props.audioList;
  }
}
