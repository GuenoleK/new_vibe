// PDF icon from https://icons8.com/icon/set/pdf/material
import React from 'react';
import { Card, CardContent, Typography, CircularProgress, Button } from '@material-ui/core';
import './article-card.scss';
import { computed, autorun, observable } from 'mobx';
import { articleStore } from 'app/stores/article-store';
import { observer } from 'mobx-react';
import Dropzone from 'react-dropzone';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import OpenInNew from '@material-ui/icons/OpenInNew';
import { articleMediaStore } from 'app/stores/article-media-store';
import { ArticleMediaTypeCodeEnum } from 'app/enums/ArticleMediaTypeCodeEnum';
import { articleMediaApi } from 'app/api/article-media-api';
import { articleApi } from 'app/api/article-api';

interface IArticleCardProps {
  isLoadingData: boolean;
}

@observer
export class ArticleCard extends React.Component<IArticleCardProps> {
  @observable
  pdfFileSrc: any;

  @observable
  isLoadingSrcFile = false;

  reaction = autorun(async () => {
    if (!this.isLoadingData && this.pdfMedia) {
      this.isLoadingSrcFile = true;
      // Mettre une sécurité de connexion ici et mettre un sécurité d'appartenance (fichier) dans le back
      const response = await articleMediaApi.getArticleMediaSrcFile(this.pdfMedia.id);
      this.pdfFileSrc = encodeURI(response);
      this.isLoadingSrcFile = false;
    }
  });

  componentDidMount() {
    window.scroll(0, 0);
  }

  render() {
    return (
      <Card data-component="article-card">
        {this.article && (
          <CardContent className="content">
            <Typography gutterBottom variant="h5" component="h2">
              Paroles
            </Typography>
            <Typography component="p">{this.article.description}</Typography>
          </CardContent>
        )}
        <div className="title-divider" />
        <div className="pdf-zone">
          {this.isLoadingSrcFile && this.LoadingComponent}
          {!this.isLoadingData &&
            !this.isLoadingSrcFile &&
            this.pdfMedia && <div className="responsive-iframe">{this.renderPdfZone()}</div>}
          {!this.isLoadingData && !this.pdfMedia && this.UploadComponent}
        </div>
      </Card>
    );
  }

  @computed
  get isLoadingData() {
    return this.props.isLoadingData;
  }

  get UploadComponent() {
    return (
      <div className="lyrics-upload-dropzone">
        <Dropzone multiple={false} accept="application/pdf" onDrop={this.onDrop}>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <CloudUploadIcon className="upload-icon" />
              <div className="upload-description-text">{this.uploadDescriptionText}</div>
              {/* {isDragActive ? "Drop it like it's hot!" : 'Click me or drag a file to upload!'} */}
            </div>
          )}
        </Dropzone>
      </div>
    );
  }

  get uploadDescriptionText() {
    if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
      return 'Appuyer pour charger le fichier de paroles (PDF)';
    }
    return 'Cliquer ou déposer pour charger le fichier de paroles (PDF)';
  }

  get LoadingComponent() {
    return (
      <div className="loading-component">
        <CircularProgress className="circular-progress" />
        <div className="loading-text">Chargement...</div>
      </div>
    );
  }

  renderPdfZone() {
    return (
      <object data={this.pdfFileSrc} type="application/pdf">
        <div className="pdf-mobile-zone">
          <p className="zone-description-text">Ouvrir le fichier des paroles</p>
          <ArrowDownward className="down-arrow" />
          <img className="pdf-icon" src="https://img.icons8.com/material/96/000000/pdf-2.png" />
          <Button className="open-button" color="primary" onClick={this.openPdf}>
            VOIR LES PAROLES
            <OpenInNew className="open-in-new-icon" />
          </Button>
        </div>
      </object>
    );
  }

  openPdf = () => {
    window.open(
      encodeURI(`https://docs.google.com/gview?url=${this.pdfFileSrc}`),
      '_blank',
      'fullscreen=yes,location=yes,EnableViewPortScale=yes'
    );
  };

  @computed
  get article() {
    return articleStore.article;
  }

  @computed
  get pdfMedia() {
    return articleMediaStore.articleMediaList.find(media => media.articleMediaType.code === ArticleMediaTypeCodeEnum.PDF);
  }

  onDrop = async acceptedFiles => {
    await articleMediaApi.saveArticleMedia(acceptedFiles[0], this.article.id);
    articleStore.article = await articleApi.getArticle(this.article.id);
    articleMediaStore.articleMediaList = await articleMediaApi.getArticleMediaListByArticleId(this.article.id);
  };
}
