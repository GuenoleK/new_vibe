import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Structure from './structure';
import Role from './role';
import Article from './article';
import ArticleMedia from './article-media';
import ArticleMediaType from './article-media-type';
import ExtendedUser from './extended-user';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/structure`} component={Structure} />
      <ErrorBoundaryRoute path={`${match.url}/role`} component={Role} />
      <ErrorBoundaryRoute path={`${match.url}/article`} component={Article} />
      <ErrorBoundaryRoute path={`${match.url}/article-media`} component={ArticleMedia} />
      <ErrorBoundaryRoute path={`${match.url}/article-media-type`} component={ArticleMediaType} />
      <ErrorBoundaryRoute path={`${match.url}/extended-user`} component={ExtendedUser} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
