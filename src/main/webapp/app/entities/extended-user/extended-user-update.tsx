import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IStructure } from 'app/shared/model/structure.model';
import { getEntities as getStructures } from 'app/entities/structure/structure.reducer';
import { getEntity, updateEntity, createEntity, reset } from './extended-user.reducer';
import { IExtendedUser } from 'app/shared/model/extended-user.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IExtendedUserUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IExtendedUserUpdateState {
  isNew: boolean;
  userId: string;
  currentStructureId: string;
}

export class ExtendedUserUpdate extends React.Component<IExtendedUserUpdateProps, IExtendedUserUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
      currentStructureId: '0',
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
    this.props.getStructures();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { extendedUserEntity } = this.props;
      const entity = {
        ...extendedUserEntity,
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
    this.props.history.push('/entity/extended-user');
  };

  render() {
    const { extendedUserEntity, users, structures, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="vibeApp.extendedUser.home.createOrEditLabel">
              <Translate contentKey="vibeApp.extendedUser.home.createOrEditLabel">Create or edit a ExtendedUser</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : extendedUserEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="extended-user-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label for="user.id">
                    <Translate contentKey="vibeApp.extendedUser.user">User</Translate>
                  </Label>
                  <AvInput id="extended-user-user" type="select" className="form-control" name="user.id">
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
                  <Label for="currentStructure.id">
                    <Translate contentKey="vibeApp.extendedUser.currentStructure">Current Structure</Translate>
                  </Label>
                  <AvInput id="extended-user-currentStructure" type="select" className="form-control" name="currentStructure.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/extended-user" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
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
  structures: storeState.structure.entities,
  extendedUserEntity: storeState.extendedUser.entity,
  loading: storeState.extendedUser.loading,
  updating: storeState.extendedUser.updating,
  updateSuccess: storeState.extendedUser.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
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
)(ExtendedUserUpdate);
