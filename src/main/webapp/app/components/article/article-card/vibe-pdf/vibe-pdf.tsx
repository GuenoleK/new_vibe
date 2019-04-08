import React from 'react';
import { Document, Page } from 'react-pdf';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

@observer
export class VibePdfDocument extends React.Component {
  @observable
  currentPage = 1;

  @observable
  pageNumber: boolean;
  render() {
    return (
      <Document file={require('D:/zz_perso/vibe-files/pdf/wtr10-2b_f.pdf')} onLoadSuccess={this.onDocumentLoadSuccess}>
        <Page pageNumber={this.currentPage} />
      </Document>
    );
  }

  @action
  onDocumentLoadSuccess = props => {
    this.pageNumber = props._pdfInfo.numPages;
  };
}
