import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ArticleMediaType from './article-media-type';
import ArticleMediaTypeDetail from './article-media-type-detail';
import ArticleMediaTypeUpdate from './article-media-type-update';
import ArticleMediaTypeDeleteDialog from './article-media-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ArticleMediaTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ArticleMediaTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ArticleMediaTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={ArticleMediaType} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ArticleMediaTypeDeleteDialog} />
  </>
);

export default Routes;
