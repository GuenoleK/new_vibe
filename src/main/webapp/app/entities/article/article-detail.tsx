import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './article.reducer';
import { IArticle } from 'app/shared/model/article.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IArticleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ArticleDetail extends React.Component<IArticleDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { articleEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="vibeApp.article.detail.title">Article</Translate> [<b>{articleEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">
                <Translate contentKey="vibeApp.article.title">Title</Translate>
              </span>
            </dt>
            <dd>{articleEntity.title}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="vibeApp.article.description">Description</Translate>
              </span>
            </dt>
            <dd>{articleEntity.description}</dd>
            <dt>
              <span id="content">
                <Translate contentKey="vibeApp.article.content">Content</Translate>
              </span>
            </dt>
            <dd>{articleEntity.content}</dd>
            <dt>
              <span id="creationDate">
                <Translate contentKey="vibeApp.article.creationDate">Creation Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={articleEntity.creationDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="editionDate">
                <Translate contentKey="vibeApp.article.editionDate">Edition Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={articleEntity.editionDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="vibeApp.article.user">User</Translate>
            </dt>
            <dd>{articleEntity.user ? articleEntity.user.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/article" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/article/${articleEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ article }: IRootState) => ({
  articleEntity: article.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleDetail);
