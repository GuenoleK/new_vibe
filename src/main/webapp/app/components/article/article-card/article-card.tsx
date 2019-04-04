import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './article-card.scss';
import { Document, Page } from 'react-pdf';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

@observer
export class ArticleCard extends React.Component {
  @observable
  pageNumber: number;

  @observable
  pageList = [];

  render() {
    return (
      <Card data-component="article-card">
        <Document file="../content/pdf/wtr10-2b_f.pdf" onLoadSuccess={this.onDocumentLoadSuccess}>
          <Page pageNumber={1} />
        </Document>
        <CardContent className="content">
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </Card>
    );
  }

  @action
  onDocumentLoadSuccess = props => {
    this.pageNumber = props._pdfInfo.numPages;
  };
}
