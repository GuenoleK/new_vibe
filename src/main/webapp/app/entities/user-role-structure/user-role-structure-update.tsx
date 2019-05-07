import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IRole } from 'app/shared/model/role.model';
import { getEntities as getRoles } from 'app/entities/role/role.reducer';
import { IStructure } from 'app/shared/model/structure.model';
import { getEntities as getStructures } from 'app/entities/structure/structure.reducer';
import { getEntity, updateEntity, createEntity, reset } from './user-role-structure.reducer';
import { IUserRoleStructure } from 'app/shared/model/user-role-structure.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUserRoleStructureUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IUserRoleStructureUpdateState {
  isNew: boolean;
  userId: string;
  roleId: string;
  structureId: string;
}

export class UserRoleStructureUpdate extends React.Component<IUserRoleStructureUpdateProps, IUserRoleStructureUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
      roleId: '0',
      structureId: '0',
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

    this.props.getUsers();
    this.props.getRoles();
    this.props.getStructures();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { userRoleStructureEntity } = this.props;
      const entity = {
        ...userRoleStructureEntity,
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
    this.props.history.push('/entity/user-role-structure');
  };

  render() {
    const { userRoleStructureEntity, users, roles, structures, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="vibeApp.userRoleStructure.home.createOrEditLabel">
              <Translate contentKey="vibeApp.userRoleStructure.home.createOrEditLabel">Create or edit a UserRoleStructure</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : userRoleStructureEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="user-role-structure-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="user-role-structure-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label for="user-role-structure-user">
                    <Translate contentKey="vibeApp.userRoleStructure.user">User</Translate>
                  </Label>
                  <AvInput id="user-role-structure-user" type="select" className="form-control" name="user.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="user-role-structure-role">
                    <Translate contentKey="vibeApp.userRoleStructure.role">Role</Translate>
                  </Label>
                  <AvInput id="user-role-structure-role" type="select" className="form-control" name="role.id">
                    <option value="" key="0" />
                    {roles
                      ? roles.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="user-role-structure-structure">
                    <Translate contentKey="vibeApp.userRoleStructure.structure">Structure</Translate>
                  </Label>
                  <AvInput id="user-role-structure-structure" type="select" className="form-control" name="structure.id">
                    <option value="" key="0" />
                    {structures
                      ? structures.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/user-role-structure" replace color="info">
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
  users: storeState.userManagement.users,
  roles: storeState.role.entities,
  structures: storeState.structure.entities,
  userRoleStructureEntity: storeState.userRoleStructure.entity,
  loading: storeState.userRoleStructure.loading,
  updating: storeState.userRoleStructure.updating,
  updateSuccess: storeState.userRoleStructure.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getRoles,
  getStructures,
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
)(UserRoleStructureUpdate);
