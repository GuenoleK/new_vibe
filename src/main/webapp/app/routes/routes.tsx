import React from 'react';
import { Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import { ArticleView } from 'app/views/artcile/article';
import { ArticleListView } from 'app/views/article-list/article-list';

import initStore from '../config/store';
import { Provider } from 'react-redux';
import AppComponent from '../app';
const store = initStore();

// tslint:enable
export const AppRoutes = () => (
  <div className="view-routes">
    <Switch>
      <ErrorBoundaryRoute path="/article-list" component={ArticleListView} />
      <ErrorBoundaryRoute path="/home" component={ArticleListView} />
      <ErrorBoundaryRoute path="/article/:id" component={ArticleView} />
      <ErrorBoundaryRoute path="/" component={ArticleListView} />
    </Switch>
    <Provider store={store}>
      <div>
        <AppComponent />
      </div>
    </Provider>
  </div>
);
