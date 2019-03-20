import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './article-media.reducer';
import { IArticleMedia } from 'app/shared/model/article-media.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IArticleMediaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ArticleMedia extends React.Component<IArticleMediaProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { articleMediaList, match } = this.props;
    return (
      <div>
        <h2 id="article-media-heading">
          <Translate contentKey="vibeApp.articleMedia.home.title">Article Medias</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="vibeApp.articleMedia.home.createLabel">Create new Article Media</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="vibeApp.articleMedia.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="vibeApp.articleMedia.articleMediaType">Article Media Type</Translate>
                </th>
                <th>
                  <Translate contentKey="vibeApp.articleMedia.article">Article</Translate>
                </th>
                <th>
                  <Translate contentKey="vibeApp.articleMedia.vibeUser">Vibe User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {articleMediaList.map((articleMedia, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${articleMedia.id}`} color="link" size="sm">
                      {articleMedia.id}
                    </Button>
                  </td>
                  <td>{articleMedia.name}</td>
                  <td>
                    <Translate contentKey={`vibeApp.ArticleMediaType.${articleMedia.articleMediaType}`} />
                  </td>
                  <td>{articleMedia.article ? <Link to={`article/${articleMedia.article.id}`}>{articleMedia.article.id}</Link> : ''}</td>
                  <td>
                    {articleMedia.vibeUser ? (
                      <Link to={`vibe-user/${articleMedia.vibeUser.id}`}>{articleMedia.vibeUser.username}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${articleMedia.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${articleMedia.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${articleMedia.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ articleMedia }: IRootState) => ({
  articleMediaList: articleMedia.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleMedia);
