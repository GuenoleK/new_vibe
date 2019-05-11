import React from 'react';
import { Document, Page } from 'react-pdf';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import { articleMediaStore } from 'app/stores/article-media-store';
import { ArticleMediaTypeCodeEnum } from 'app/enums/ArticleMediaTypeCodeEnum';
import { articleMediaUtils } from 'app/utils/ArticleMediaUtils';
import './vibe-pdf.scss';

@observer
export class VibePdfDocument extends React.Component {
  @observable
  currentPage = 1;

  @observable
  pageNumber: boolean;

  render() {
    return (
      <div className="vibe-pdf">
        {this.media && (
          <Document file={require(`D:/zz_perso/vibe-files/${this.filePath}`)} onLoadSuccess={this.onDocumentLoadSuccess}>
            <Page pageNumber={this.currentPage} />
          </Document>
        )}
      </div>
    );
  }

  @action
  onDocumentLoadSuccess = props => {
    this.pageNumber = props._pdfInfo.numPages;
  };

  @computed
  get media() {
    return articleMediaStore.articleMediaList.find(media => media.articleMediaType.code === ArticleMediaTypeCodeEnum.PDF);
  }

  @computed
  get filePath() {
    return articleMediaUtils.buildMediaPath(this.media);
  }
}
