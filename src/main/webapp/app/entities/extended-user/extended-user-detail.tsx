import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './extended-user.reducer';
import { IExtendedUser } from 'app/shared/model/extended-user.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IExtendedUserDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ExtendedUserDetail extends React.Component<IExtendedUserDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { extendedUserEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="vibeApp.extendedUser.detail.title">ExtendedUser</Translate> [<b>{extendedUserEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <Translate contentKey="vibeApp.extendedUser.user">User</Translate>
            </dt>
            <dd>{extendedUserEntity.user ? extendedUserEntity.user.id : ''}</dd>
            <dt>
              <Translate contentKey="vibeApp.extendedUser.currentStructure">Current Structure</Translate>
            </dt>
            <dd>{extendedUserEntity.currentStructure ? extendedUserEntity.currentStructure.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/extended-user" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/extended-user/${extendedUserEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ extendedUser }: IRootState) => ({
  extendedUserEntity: extendedUser.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExtendedUserDetail);
