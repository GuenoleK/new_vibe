import { ArticleView } from 'app/views/artcile/article';
import { ArticleListView } from 'app/views/article-list/article-list';
import { HomeView } from 'app/views/home/home';
import React from 'react';
import { Switch } from 'react-router-dom';
import { CustomRoute } from 'app/components/custom-route/custom-route';
import { RegisterView } from 'app/views/home/register';
import './routes.scss';
import { ActivationView } from 'app/views/activation/ActivationView';
import { ResetPasswordRequestView } from 'app/views/reset-password/request/ResetPasswordRequestView';
import { ResetPasswordView } from 'app/views/reset-password/reset/ResetPasswordView';

// const store = initStore();

// tslint:enable
export const AppRoutes = () => (
  <div className="view-routes">
    <div className="routes">
      <Switch>
        <CustomRoute path="/article-list" component={ArticleListView} />
        <CustomRoute path="/home" component={ArticleListView} />
        <CustomRoute path="/article" component={ArticleView} />
        <CustomRoute path="/activate" component={ActivationView} />
        <CustomRoute path="/reset-password-request" component={ResetPasswordRequestView} />
        <CustomRoute path="/reset-password" component={ResetPasswordView} />
        <CustomRoute path="/register" component={RegisterView} />
        <CustomRoute path="/" component={HomeView} />
      </Switch>
    </div>
    {/* <Provider store={store}>
      <div>
        <AppComponent />
      </div>
    </Provider> */}
  </div>
);
