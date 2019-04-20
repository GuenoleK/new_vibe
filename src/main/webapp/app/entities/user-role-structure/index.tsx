import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserRoleStructure from './user-role-structure';
import UserRoleStructureDetail from './user-role-structure-detail';
import UserRoleStructureUpdate from './user-role-structure-update';
import UserRoleStructureDeleteDialog from './user-role-structure-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserRoleStructureUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UserRoleStructureUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UserRoleStructureDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserRoleStructure} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={UserRoleStructureDeleteDialog} />
  </>
);

export default Routes;
