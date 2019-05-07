import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './user-role-structure.reducer';
import { IUserRoleStructure } from 'app/shared/model/user-role-structure.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserRoleStructureProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class UserRoleStructure extends React.Component<IUserRoleStructureProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { userRoleStructureList, match } = this.props;
    return (
      <div>
        <h2 id="user-role-structure-heading">
          <Translate contentKey="vibeApp.userRoleStructure.home.title">User Role Structures</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="vibeApp.userRoleStructure.home.createLabel">Create new User Role Structure</Translate>
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
                  <Translate contentKey="vibeApp.userRoleStructure.user">User</Translate>
                </th>
                <th>
                  <Translate contentKey="vibeApp.userRoleStructure.role">Role</Translate>
                </th>
                <th>
                  <Translate contentKey="vibeApp.userRoleStructure.structure">Structure</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {userRoleStructureList.map((userRoleStructure, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${userRoleStructure.id}`} color="link" size="sm">
                      {userRoleStructure.id}
                    </Button>
                  </td>
                  <td>{userRoleStructure.user ? userRoleStructure.user.id : ''}</td>
                  <td>{userRoleStructure.role ? <Link to={`role/${userRoleStructure.role.id}`}>{userRoleStructure.role.id}</Link> : ''}</td>
                  <td>
                    {userRoleStructure.structure ? (
                      <Link to={`structure/${userRoleStructure.structure.id}`}>{userRoleStructure.structure.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${userRoleStructure.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${userRoleStructure.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${userRoleStructure.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ userRoleStructure }: IRootState) => ({
  userRoleStructureList: userRoleStructure.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserRoleStructure);
