import { ArticleView } from 'app/views/artcile/article';
import { ArticleListView } from 'app/views/article-list/article-list';
import { VibeHome } from 'app/views/home/home';
import React from 'react';
import { Route } from 'react-router-dom';

// const store = initStore();

// tslint:enable
export const AppRoutes = () => (
  <div className="view-routes">
    <Route path="/article-list" component={ArticleListView} />
    <Route path="/home" component={ArticleListView} />
    <Route path="/article/:id" component={ArticleView} />
    <Route exact path="/" component={VibeHome} />
    {/* <Provider store={store}>
      <div>
        <AppComponent />
      </div>
    </Provider> */}
  </div>
);
