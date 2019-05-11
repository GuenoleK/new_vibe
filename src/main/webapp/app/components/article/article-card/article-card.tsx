import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './article-card.scss';
import { VibePdfDocument } from 'app/components/article/article-card/vibe-pdf/vibe-pdf';
import { computed } from 'mobx';
import { articleStore } from 'app/stores/article-store';
import { observer } from 'mobx-react';
import Dropzone from 'react-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { articleMediaStore } from 'app/stores/article-media-store';
import { ArticleMediaTypeCodeEnum } from 'app/enums/ArticleMediaTypeCodeEnum';
import { articleMediaApi } from 'app/api/article-media-api';
import { articleApi } from 'app/api/article-api';

@observer
export class ArticleCard extends React.Component {
  render() {
    return (
      <Card data-component="article-card">
        <VibePdfDocument />
        {this.article && (
          <CardContent className="content">
            <Typography gutterBottom variant="h5" component="h2">
              {this.article.title}
            </Typography>
            <Typography component="p">{this.article.description}</Typography>
          </CardContent>
        )}
        {!this.pdfMedia && (
          <div className="lyrics-upload-dropzone">
            <Dropzone multiple={false} accept="application/pdf" onDrop={this.onDrop}>
              {({ getRootProps, getInputProps, isDragActive }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <CloudUploadIcon className="upload-icon" />
                  <div>Cliquer ou déposer pour charger le fichier PDF</div>
                  {/* {isDragActive ? "Drop it like it's hot!" : 'Click me or drag a file to upload!'} */}
                </div>
              )}
            </Dropzone>
          </div>
        )}
      </Card>
    );
  }

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
