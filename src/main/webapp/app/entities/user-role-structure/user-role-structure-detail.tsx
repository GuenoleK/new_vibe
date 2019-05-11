import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './user-role-structure.reducer';
import { IUserRoleStructure } from 'app/shared/model/user-role-structure.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserRoleStructureDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UserRoleStructureDetail extends React.Component<IUserRoleStructureDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { userRoleStructureEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="vibeApp.userRoleStructure.detail.title">UserRoleStructure</Translate> [
            <b>{userRoleStructureEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <Translate contentKey="vibeApp.userRoleStructure.user">User</Translate>
            </dt>
            <dd>
              {userRoleStructureEntity.users
                ? userRoleStructureEntity.users.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === userRoleStructureEntity.users.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}{' '}
            </dd>
            <dt>
              <Translate contentKey="vibeApp.userRoleStructure.role">Role</Translate>
            </dt>
            <dd>
              {userRoleStructureEntity.roles
                ? userRoleStructureEntity.roles.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === userRoleStructureEntity.roles.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="vibeApp.userRoleStructure.structure">Structure</Translate>
            </dt>
            <dd>
              {userRoleStructureEntity.structures
                ? userRoleStructureEntity.structures.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === userRoleStructureEntity.structures.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/user-role-structure" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/user-role-structure/${userRoleStructureEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ userRoleStructure }: IRootState) => ({
  userRoleStructureEntity: userRoleStructure.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserRoleStructureDetail);
