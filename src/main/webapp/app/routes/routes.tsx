import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import { ArticleView } from 'app/views/artcile/article';
import { ArticleListView } from 'app/views/article-list/article-list';
// tslint:enable

export const AppRoutes = () => (
  <div className="view-routes">
    <Switch>
      <ErrorBoundaryRoute path="/article-list" component={ArticleListView} />
      <ErrorBoundaryRoute path="/article/:id" component={ArticleView} />
      <ErrorBoundaryRoute path="/" component={ArticleListView} />
    </Switch>
  </div>
);
