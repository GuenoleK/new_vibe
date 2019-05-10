import { ArticleView } from 'app/views/artcile/article';
import { ArticleListView } from 'app/views/article-list/article-list';
import { VibeHome } from 'app/views/home/home';
import React from 'react';
import { Switch } from 'react-router-dom';
import { CustomRoute } from 'app/components/custom-route/custom-route';
import { RegisterView } from 'app/views/home/register';

// const store = initStore();

// tslint:enable
export const AppRoutes = () => (
  <div className="view-routes">
    <Switch>
      <CustomRoute path="/article-list" component={ArticleListView} />
      <CustomRoute path="/home" component={ArticleListView} />
      <CustomRoute path="/article/:id" component={ArticleView} />
      <CustomRoute path="/register" component={RegisterView} />
      <CustomRoute path="/" component={VibeHome} />
    </Switch>
    {/* <Provider store={store}>
      <div>
        <AppComponent />
      </div>
    </Provider> */}
  </div>
);
