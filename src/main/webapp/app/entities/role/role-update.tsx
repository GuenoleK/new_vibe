import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IStructure } from 'app/shared/model/structure.model';
import { getEntities as getStructures } from 'app/entities/structure/structure.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './role.reducer';
import { IRole } from 'app/shared/model/role.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRoleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IRoleUpdateState {
  isNew: boolean;
  structureId: string;
  userId: string;
}

export class RoleUpdate extends React.Component<IRoleUpdateProps, IRoleUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      structureId: '0',
      userId: '0',
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

    this.props.getStructures();
    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { roleEntity } = this.props;
      const entity = {
        ...roleEntity,
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
    this.props.history.push('/entity/role');
  };

  render() {
    const { roleEntity, structures, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="vibeApp.role.home.createOrEditLabel">
              <Translate contentKey="vibeApp.role.home.createOrEditLabel">Create or edit a Role</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : roleEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="role-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="roleTypeLabel">
                    <Translate contentKey="vibeApp.role.roleType">Role Type</Translate>
                  </Label>
                  <AvInput
                    id="role-roleType"
                    type="select"
                    className="form-control"
                    name="roleType"
                    value={(!isNew && roleEntity.roleType) || 'ADMIN'}
                  >
                    <option value="ADMIN">
                      <Translate contentKey="vibeApp.RoleType.ADMIN" />
                    </option>
                    <option value="VIEWER">
                      <Translate contentKey="vibeApp.RoleType.VIEWER" />
                    </option>
                    <option value="EDITOR">
                      <Translate contentKey="vibeApp.RoleType.EDITOR" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="structure.id">
                    <Translate contentKey="vibeApp.role.structure">Structure</Translate>
                  </Label>
                  <AvInput id="role-structure" type="select" className="form-control" name="structure.id">
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
                <AvGroup>
                  <Label for="user.id">
                    <Translate contentKey="vibeApp.role.user">User</Translate>
                  </Label>
                  <AvInput id="role-user" type="select" className="form-control" name="user.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/role" replace color="info">
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
  structures: storeState.structure.entities,
  users: storeState.userManagement.users,
  roleEntity: storeState.role.entity,
  loading: storeState.role.loading,
  updating: storeState.role.updating,
  updateSuccess: storeState.role.updateSuccess
});

const mapDispatchToProps = {
  getStructures,
  getUsers,
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
)(RoleUpdate);
