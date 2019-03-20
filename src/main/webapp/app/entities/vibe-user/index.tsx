import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VibeUser from './vibe-user';
import VibeUserDetail from './vibe-user-detail';
import VibeUserUpdate from './vibe-user-update';
import VibeUserDeleteDialog from './vibe-user-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VibeUserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VibeUserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VibeUserDetail} />
      <ErrorBoundaryRoute path={match.url} component={VibeUser} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={VibeUserDeleteDialog} />
  </>
);

export default Routes;
