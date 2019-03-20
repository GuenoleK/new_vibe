import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vibe-user.reducer';
import { IVibeUser } from 'app/shared/model/vibe-user.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVibeUserDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class VibeUserDetail extends React.Component<IVibeUserDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { vibeUserEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="vibeApp.vibeUser.detail.title">VibeUser</Translate> [<b>{vibeUserEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="username">
                <Translate contentKey="vibeApp.vibeUser.username">Username</Translate>
              </span>
            </dt>
            <dd>{vibeUserEntity.username}</dd>
            <dt>
              <Translate contentKey="vibeApp.vibeUser.user">User</Translate>
            </dt>
            <dd>{vibeUserEntity.user ? vibeUserEntity.user.login : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/vibe-user" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/vibe-user/${vibeUserEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ vibeUser }: IRootState) => ({
  vibeUserEntity: vibeUser.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VibeUserDetail);
