// PDF icon from https://icons8.com/icon/set/pdf/material
import React from 'react';
import { Card, CardContent, Typography, CircularProgress, Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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
import { Spinner } from 'app/components/spinner/spinner';
import { translationUtil } from 'app/translation/translation-util';

interface IArticleCardProps {
  isLoadingData: boolean;
}

@observer
export class ArticleCard extends React.Component<IArticleCardProps> {
  @observable
  pdfFileSrc: any;

  @observable
  isMenuOpen = false;

  @observable
  menuAnchorElement: any;

  @observable
  isLoading = false;

  reaction = autorun(async () => {
    if (!this.isLoadingData && this.pdfMedia) {
      this.isLoading = true;
      // Mettre une sécurité de connexion ici et mettre un sécurité d'appartenance (fichier) dans le back
      const response = await articleMediaApi.getArticleMediaSrcFile(this.pdfMedia.id);
      this.pdfFileSrc = encodeURI(response);
      this.isLoading = false;
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
            <Typography className="card-title" gutterBottom variant="h5" component="h2">
              {translationUtil.translate('article.detail.pdfCard.header.title')}
            </Typography>
            <Typography component="p">{this.article.description}</Typography>
            {this.pdfMedia && (
              <div className="card-menu">
                <input id="upload-updated-pdf" multiple={false} type="file" accept="application/pdf" onChange={this.onChangeLyrics} />
                <IconButton
                  disabled={this.isLoading || this.isLoadingData || articleMediaStore.isAMediaLoading}
                  className="article-more-button"
                  onClick={this.openMenu}
                >
                  <MoreVertIcon className="article-more-icon" />
                  <Menu
                    open={this.isMenuOpen}
                    anchorEl={this.menuAnchorElement}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                  >
                    <MenuItem onClick={this.onChangePdfSelected}>
                      {translationUtil.translate('article.detail.pdfCard.header.menu.modify')}
                    </MenuItem>
                    <MenuItem onClick={this.deletePdfFile}>
                      {translationUtil.translate('article.detail.pdfCard.header.menu.delete')}
                    </MenuItem>
                    <a className="menu-option-download download-pdf" href={this.pdfFileSrc} download={this.pdfMedia.name}>
                      <MenuItem>{translationUtil.translate('article.detail.pdfCard.header.menu.download')}</MenuItem>
                    </a>
                  </Menu>
                </IconButton>
              </div>
            )}
          </CardContent>
        )}
        <div className="title-divider" />
        <div className="pdf-zone">
          {this.isLoading && <Spinner hasDescription loadingText={translationUtil.translate('loader.description.isLoading')} />}
          {!this.isLoadingData && !this.isLoading && this.pdfMedia && <div className="responsive-iframe">{this.renderPdfZone()}</div>}
          {!this.isLoadingData && !this.isLoading && !this.pdfMedia && this.UploadComponent}
        </div>
      </Card>
    );
  }

  openMenu = event => {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuAnchorElement = event.currentTarget;
  };

  @computed
  get isLoadingData() {
    return this.props.isLoadingData;
  }

  get UploadComponent() {
    return (
      <div className="lyrics-upload-dropzone">
        <Dropzone
          disabled={this.isLoading || this.isLoadingData || articleMediaStore.isAMediaLoading}
          multiple={false}
          accept="application/pdf"
          onDrop={this.onDrop}
        >
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
      return translationUtil.translate('article.detail.pdfCard.uploadZone.description.mobile');
    }
    return translationUtil.translate('article.detail.pdfCard.uploadZone.description.common');
  }

  renderPdfZone() {
    return (
      <object data={this.pdfFileSrc} type="application/pdf">
        <div className="pdf-mobile-zone">
          <p className="zone-description-text">{translationUtil.translate('article.detail.pdfCard.mobile.descriptionText')}</p>
          <ArrowDownward className="down-arrow" />
          <img className="pdf-icon" src="https://img.icons8.com/material/96/000000/pdf-2.png" />
          <Button className="open-button" color="primary" onClick={this.openPdf}>
            {translationUtil.translate('article.detail.pdfCard.mobile.linkText')}
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
    this.isLoading = true;
    articleMediaStore.isAMediaLoading = this.isLoading;
    if (this.pdfMedia) {
      await articleMediaApi.updateArticleMedia(acceptedFiles[0], this.pdfMedia, this.article.id);
    } else {
      await articleMediaApi.saveArticleMedia(acceptedFiles[0], this.article.id, ArticleMediaTypeCodeEnum.PDF);
    }
    this.isLoading = false;
    articleMediaStore.isAMediaLoading = this.isLoading;
  };

  deletePdfFile = async () => {
    this.isLoading = true;
    articleMediaStore.isAMediaLoading = this.isLoading;
    if (this.pdfMedia) {
      await articleMediaApi.deleteArticleMedia(this.pdfMedia, this.article.id);
    }
    this.isLoading = false;
    articleMediaStore.isAMediaLoading = this.isLoading;
  };

  onChangeLyrics = e => {
    if (e.target.files.length > 0) {
      this.onDrop(e.target.files);
    }
  };

  onChangePdfSelected = () => {
    const input = document.querySelector('#upload-updated-pdf') as HTMLElement;
    if (input) {
      input.click();
    }
  };
}
