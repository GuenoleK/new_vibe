import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './structure.reducer';
import { IStructure } from 'app/shared/model/structure.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStructureProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Structure extends React.Component<IStructureProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { structureList, match } = this.props;
    return (
      <div>
        <h2 id="structure-heading">
          <Translate contentKey="vibeApp.structure.home.title">Structures</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="vibeApp.structure.home.createLabel">Create new Structure</Translate>
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
                  <Translate contentKey="vibeApp.structure.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="vibeApp.structure.owner">Owner</Translate>
                </th>
                <th>
                  <Translate contentKey="vibeApp.structure.user">User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {structureList.map((structure, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${structure.id}`} color="link" size="sm">
                      {structure.id}
                    </Button>
                  </td>
                  <td>{structure.name}</td>
                  <td>{structure.owner ? structure.owner.id : ''}</td>
                  <td>
                    {structure.users
                      ? structure.users.map((val, j) => (
                          <span key={j}>
                            {val.id}
                            {j === structure.users.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${structure.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${structure.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${structure.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ structure }: IRootState) => ({
  structureList: structure.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Structure);
