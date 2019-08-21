import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import { ButtonLink } from 'app/components/button-link/button-link';
import React from 'react';
import { Link } from 'react-router-dom';
import * as ArticleInterface from 'app/shared/model/article.model';
import './vibe-card.scss';
import { computed } from 'mobx';
import { translationUtil } from 'app/translation/translation-util';
import { Tooltip } from 'react-tippy';

type IArticle = ArticleInterface.IArticle;

interface IVibeCardProps {
  article: IArticle;
}

export class VibeCard extends React.Component<IVibeCardProps> {
  render() {
    return (
      <Card data-component="vibe-card">
        <Link to={`/article/${this.article.id}`}>
          <CardActionArea>
            <CardMedia
              className="media"
              image="https://image.freepik.com/free-photo/creative-design-made-with-blue-orange-paper_23-2147981636.jpg"
            />
          </CardActionArea>
        </Link>
        <CardContent className="content">
          <Tooltip
            className="card-title-tooltip"
            position="top"
            trigger="mouseenter"
            duration={200}
            interactive
            distance={17}
            html={
              <div className="card-title-tooltip-text">
                <div>{this.article.title}</div>
              </div>
            }
          >
            <Typography className="title" gutterBottom variant="h5" component="h2">
              {this.article.title}
            </Typography>
          </Tooltip>
          <Typography className="description" component="p">
            {this.article.description}
          </Typography>
        </CardContent>
        <CardActions className="actions">
          <div className="button-actions">
            <ButtonLink
              color="primary"
              buttonClassName="card-consult-button"
              label={translationUtil.translate('articleList.card.see')}
              link={`/article/${this.article.id}`}
            />
          </div>
        </CardActions>
      </Card>
    );
  }

  @computed
  get article() {
    return this.props.article;
  }
}
