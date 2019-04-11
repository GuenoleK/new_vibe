import { ArticleView } from 'app/views/artcile/article';
import { ArticleListView } from 'app/views/article-list/article-list';
import { VibeHome } from 'app/views/home/home';
import React from 'react';
import { Route } from 'react-router-dom';
import { CustomRoute } from 'app/components/custom-route/custom-route';

// const store = initStore();

// tslint:enable
export const AppRoutes = () => (
  <div className="view-routes">
    <CustomRoute path="/article-list" component={ArticleListView} />
    <CustomRoute path="/home" component={ArticleListView} />
    <CustomRoute path="/article/:id" component={ArticleView} />
    <Route exact path="/" component={VibeHome} />
    {/* <Provider store={store}>
      <div>
        <AppComponent />
      </div>
    </Provider> */}
  </div>
);
