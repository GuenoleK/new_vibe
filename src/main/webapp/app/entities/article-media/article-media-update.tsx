import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IArticle } from 'app/shared/model/article.model';
import { getEntities as getArticles } from 'app/entities/article/article.reducer';
import { IVibeUser } from 'app/shared/model/vibe-user.model';
import { getEntities as getVibeUsers } from 'app/entities/vibe-user/vibe-user.reducer';
import { getEntity, updateEntity, createEntity, reset } from './article-media.reducer';
import { IArticleMedia } from 'app/shared/model/article-media.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IArticleMediaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IArticleMediaUpdateState {
  isNew: boolean;
  articleId: string;
  vibeUserId: string;
}

export class ArticleMediaUpdate extends React.Component<IArticleMediaUpdateProps, IArticleMediaUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      articleId: '0',
      vibeUserId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getArticles();
    this.props.getVibeUsers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { articleMediaEntity } = this.props;
      const entity = {
        ...articleMediaEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/article-media');
  };

  render() {
    const { articleMediaEntity, articles, vibeUsers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="vibeApp.articleMedia.home.createOrEditLabel">
              <Translate contentKey="vibeApp.articleMedia.home.createOrEditLabel">Create or edit a ArticleMedia</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : articleMediaEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="article-media-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="vibeApp.articleMedia.name">Name</Translate>
                  </Label>
                  <AvField
                    id="article-media-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="articleMediaTypeLabel">
                    <Translate contentKey="vibeApp.articleMedia.articleMediaType">Article Media Type</Translate>
                  </Label>
                  <AvInput
                    id="article-media-articleMediaType"
                    type="select"
                    className="form-control"
                    name="articleMediaType"
                    value={(!isNew && articleMediaEntity.articleMediaType) || 'IMAGE'}
                  >
                    <option value="IMAGE">
                      <Translate contentKey="vibeApp.ArticleMediaType.IMAGE" />
                    </option>
                    <option value="PDF">
                      <Translate contentKey="vibeApp.ArticleMediaType.PDF" />
                    </option>
                    <option value="AUDIO">
                      <Translate contentKey="vibeApp.ArticleMediaType.AUDIO" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="article.id">
                    <Translate contentKey="vibeApp.articleMedia.article">Article</Translate>
                  </Label>
                  <AvInput id="article-media-article" type="select" className="form-control" name="article.id">
                    <option value="" key="0" />
                    {articles
                      ? articles.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="vibeUser.username">
                    <Translate contentKey="vibeApp.articleMedia.vibeUser">Vibe User</Translate>
                  </Label>
                  <AvInput id="article-media-vibeUser" type="select" className="form-control" name="vibeUser.id">
                    <option value="" key="0" />
                    {vibeUsers
                      ? vibeUsers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.username}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/article-media" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  articles: storeState.article.entities,
  vibeUsers: storeState.vibeUser.entities,
  articleMediaEntity: storeState.articleMedia.entity,
  loading: storeState.articleMedia.loading,
  updating: storeState.articleMedia.updating,
  updateSuccess: storeState.articleMedia.updateSuccess
});

const mapDispatchToProps = {
  getArticles,
  getVibeUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleMediaUpdate);