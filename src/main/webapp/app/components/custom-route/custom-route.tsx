import React from 'react';
import { userStore } from 'app/stores/user-store';
import { Route, Redirect } from 'react-router';

interface ICustomRouteProps {
  component: any;
  path: string;
}

export class CustomRoute extends React.Component<ICustomRouteProps> {
  render() {
    return <div>{this.InternalRoute}</div>;
  }

  get InternalRoute() {
    const { path, component } = this.props;
    if (userStore.isConnected) {
      if (path !== '/') {
        // tslint:disable-next-line: jsx-no-lambda
        return <Route exact path={path} component={props => this.renderComponent(component, props)} />;
      }
      return (
        <Route exact path={path}>
          <Redirect to="/article-list" />
        </Route>
      );
    }

    if (path === '/' || path === '/register') {
      // tslint:disable-next-line: jsx-no-lambda
      return <Route exact path={path} component={props => this.renderComponent(component, props)} />;
    }
    return (
      <Route exact path={path}>
        <Redirect to="/" />
      </Route>
    );
  }

  renderComponent(Component: any, props: any) {
    return <Component {...props} />;
  }
}
