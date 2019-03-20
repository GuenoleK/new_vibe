import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ArticleMedia from './article-media';
import ArticleMediaDetail from './article-media-detail';
import ArticleMediaUpdate from './article-media-update';
import ArticleMediaDeleteDialog from './article-media-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ArticleMediaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ArticleMediaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ArticleMediaDetail} />
      <ErrorBoundaryRoute path={match.url} component={ArticleMedia} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ArticleMediaDeleteDialog} />
  </>
);

export default Routes;
